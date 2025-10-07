# api/recommender_logic.py

import pandas as pd
import json
import ast
import os
from typing import List, Dict, Any, Optional
from supabase import Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='api/.env')

from .rules import parse_skills, parse_stipend, parse_date, hard_skill_filter, score_stipend, score_deadline, match_skills
from .geolocation import get_location_score
from .model_utils import get_model, create_user_embedding, get_semantic_scores_on_demand # <-- ENSURE THIS NAME IS CORRECT
from .explainers import generate_why_tags, generate_detailed_explanation
from . import config

# ... (rest of the file is the same, no need to change)
def parse_location_field(loc_field: Any) -> tuple[Optional[str], Optional[str]]:
    if pd.isna(loc_field): return None, None
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
        if col not in df.columns: df[col] = None
    df['parsed_skills'] = df['skills'].apply(parse_skills)
    df['stipend_numeric'] = df['stipend'].apply(parse_stipend)
    df['deadline'] = df['deadline'].apply(parse_date)
    df.reset_index(drop=True, inplace=True)
    print(f"Loaded and preprocessed {len(df)} internships from the database.")
    return df

def recommend_internships(df: pd.DataFrame, user_profile: Dict[str, Any], k: int, max_distance: Optional[float]) -> List[Dict[str, Any]]:
    model = get_model()
    df['skill_matches'] = df['parsed_skills'].apply(lambda job_skills: match_skills(user_profile['skills'], job_skills, model))
    if not user_profile.get('skills'): df['passes_skill_filter'] = True
    else: df['passes_skill_filter'] = df['skill_matches'].apply(hard_skill_filter)
    filtered_df = df[df['passes_skill_filter']].copy()
    if filtered_df.empty:
        print("No internships passed the hard skill filter.")
        return []
    user_embedding = create_user_embedding(user_profile, model)
    filtered_df['semantic_score'] = get_semantic_scores_on_demand(user_embedding, filtered_df, model) # <-- ENSURE THIS NAME IS CORRECT
    location_results = filtered_df.apply(lambda row: get_location_score(row, user_profile), axis=1, result_type='expand')
    filtered_df[['location_score', 'distance_km']] = location_results
    if max_distance is not None:
        filtered_df = filtered_df[(filtered_df['distance_km'].isna()) | (filtered_df['distance_km'] <= max_distance)]
    if filtered_df.empty: return []
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