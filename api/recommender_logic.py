# api/recommender_logic.py

import pandas as pd
import json
import ast
import os
from typing import List, Dict, Any, Optional
from supabase import Client # <-- Note: We only import the 'Client' type, not the function
from dotenv import load_dotenv

# Load environment variables (this is good practice to keep)
load_dotenv(dotenv_path='api/.env')

# Relative imports from other files within the 'api' folder
from .rules import (
    parse_skills, parse_stipend, parse_date, hard_skill_filter,
    score_stipend, score_deadline, match_skills
)
from .geolocation import get_location_score
from .model_utils import (
    create_user_embedding, get_semantic_scores
)
from .explainers import generate_why_tags, generate_detailed_explanation
from . import config


def parse_location_field(loc_field: Any) -> tuple[Optional[str], Optional[str]]:
    """Safely parses the stringified list in the location column."""
    if pd.isna(loc_field):
        return None, None
    try:
        arr = ast.literal_eval(str(loc_field))
        if isinstance(arr, (list, tuple)) and len(arr) >= 1:
            city = str(arr[0]).strip()
            pincode = str(arr[1]).strip() if len(arr) > 1 else None
            return city, pincode
    except (ValueError, SyntaxError):
        return str(loc_field).strip(), None
    return None, None


def load_data_from_db(supabase: Client) -> pd.DataFrame:
    """Loads and preprocesses data from Supabase tables."""
    print("Fetching data from Supabase...")
    
    internships_response = supabase.table('internships').select("*").execute()
    df = pd.DataFrame(internships_response.data)

    pincodes_response = supabase.table('pincodes').select("*").execute()
    pincodes_df = pd.DataFrame(pincodes_response.data)

    if 'location' in df.columns:
        df[['city', 'pincode']] = df['location'].apply(lambda s: pd.Series(parse_location_field(s)))
        
        if not pincodes_df.empty:
            pincodes_df['pincode'] = pincodes_df['pincode'].astype(str)
            df['pincode'] = df['pincode'].astype(str).str.replace('.0', '', regex=False)
            df = df.merge(pincodes_df[['pincode', 'lat', 'lon']], on='pincode', how='left')

    for col in ['skills', 'stipend', 'deadline']:
        if col not in df.columns:
            df[col] = None

    df['parsed_skills'] = df['skills'].apply(parse_skills)
    df['stipend_numeric'] = df['stipend'].apply(parse_stipend)
    df['deadline'] = df['deadline'].apply(parse_date)
        
    df.reset_index(drop=True, inplace=True)
    print(f"Loaded and preprocessed {len(df)} internships from the database.")
    return df


def recommend_internships(df: pd.DataFrame, user_profile: Dict[str, Any], model, job_embeddings, skill_embeddings, k: int, max_distance: Optional[float]) -> List[Dict[str, Any]]:
    """Recommends internships to a user."""
    
    df['skill_matches'] = df['parsed_skills'].apply(
        lambda x: match_skills(user_profile['skills'], x, skill_embeddings)
    )
    
    if not user_profile.get('skills'):
        df['passes_skill_filter'] = True
    else:
        df['passes_skill_filter'] = df['skill_matches'].apply(hard_skill_filter)

    filtered_df = df[df['passes_skill_filter']].copy()
    
    if filtered_df.empty:
        print("No internships passed the hard skill filter.")
        return []

    user_embedding = create_user_embedding(user_profile, model)
    
    valid_indices = filtered_df.index[filtered_df.index < len(job_embeddings)]
    filtered_df = filtered_df.loc[valid_indices]
    
    if filtered_df.empty:
        print("No internships remaining after index validation.")
        return []

    filtered_job_embeddings = job_embeddings[filtered_df.index]
    
    filtered_df['semantic_score'] = get_semantic_scores(user_embedding, filtered_job_embeddings)
    
    location_results = filtered_df.apply(lambda row: get_location_score(row, user_profile), axis=1, result_type='expand')
    filtered_df[['location_score', 'distance_km']] = location_results

    if max_distance is not None:
        initial_count = len(filtered_df)
        filtered_df = filtered_df[(filtered_df['distance_km'].isna()) | (filtered_df['distance_km'] <= max_distance)]
        print(f"Filtered out {initial_count - len(filtered_df)} jobs based on max distance of {max_distance} km.")

    if filtered_df.empty:
        print("No internships remaining after distance filter.")
        return []

    if user_profile.get('skills') and len(user_profile['skills']) > 0:
        filtered_df['skill_overlap_ratio'] = filtered_df['skill_matches'].apply(lambda x: len(x) / len(user_profile['skills']))
    else:
        filtered_df['skill_overlap_ratio'] = 0.0

    filtered_df['stipend_score'] = filtered_df['stipend_numeric'].apply(lambda x: score_stipend(x, user_profile.get('min_stipend')))
    filtered_df['date_score'] = filtered_df['deadline'].apply(lambda x: score_deadline(x, user_profile.get('available_from')))

    weights = config.SCORING_WEIGHTS
    
    filtered_df['final_score'] = (
        weights['semantic_score'] * filtered_df['semantic_score'] +
        weights['skill_overlap_ratio'] * filtered_df['skill_overlap_ratio'] +
        weights['location_score'] * filtered_df['location_score'] +
        weights['stipend_score'] * (filtered_df['stipend_score'] / 100.0) +
        weights['date_score'] * (filtered_df['date_score'] / 100.0)
    )

    top_k = filtered_df.sort_values(by='final_score', ascending=False).head(k)
    
    recommendations = []
    for _, row in top_k.iterrows():
        row_dict = row.to_dict()
        row_dict['why_tags'] = generate_why_tags(row_dict, user_profile)
        row_dict['explanation'] = generate_detailed_explanation(row_dict, user_profile, weights)
        recommendations.append(row_dict)
        
    return json.loads(pd.Series(recommendations).to_json(orient='records'))