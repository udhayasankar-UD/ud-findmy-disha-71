# api/api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
from dotenv import load_dotenv
import pandas as pd
from supabase import create_client, Client

# Load environment variables FIRST
load_dotenv(dotenv_path='api/.env')

# Centralize Supabase client creation
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Supabase URL and Key must be set in the .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Now import local modules
from .recommender_logic import load_data_from_db, recommend_internships
from .model_utils import get_model, create_job_embeddings, create_skill_embeddings
from . import config

app = FastAPI()

# --- THE FIX: A MORE PERMISSIVE CORS POLICY FOR DEVELOPMENT ---
# The wildcard "*" allows requests from ANY origin.
# This is safe for local development but should be changed to your
# specific frontend URL (e.g., "https://your-app-name.vercel.app") for production.
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Define API Data Models (stays the same) ---
class UserProfile(BaseModel):
    skills: List[str]
    qualification: str
    preferred_location: str
    pincode: Optional[str] = None
    min_stipend: int
    available_from: str
    remote_ok: bool = False
    lat: Optional[float] = None
    lon: Optional[float] = None

# --- Load Data and Models on Server Startup ---
print("API starting up: Loading data and creating embeddings...")
dataframe = load_data_from_db(supabase)
model = get_model()
job_embeddings = create_job_embeddings(dataframe, model, config.EMBEDDINGS_CACHE_PATH, recompute=True)
skill_embeddings = create_skill_embeddings(dataframe, model, config.SKILL_EMBEDDINGS_CACHE_PATH, recompute=True)
print("API is ready to accept requests.")

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"message": "DISHA Recommender API is running."}

@app.post("/recommend")
def get_recommendations(profile: UserProfile):
    user_profile_dict = profile.dict()
    recommendations = recommend_internships(
        df=dataframe.copy(),
        user_profile=user_profile_dict,
        model=model,
        job_embeddings=job_embeddings,
        skill_embeddings=skill_embeddings,
        k=config.TOP_K,
        max_distance=None
    )
    return {"recommendations": recommendations}

@app.get("/internships")
def get_all_internships():
    """Returns all internships from the database."""
    # Convert the entire dataframe to a JSON string and then parse it back.
    # This handles all special types (NaN, numpy arrays, etc.) automatically and safely.
    all_internships_json_string = dataframe.to_json(orient='records')
    return {"internships": json.loads(all_internships_json_string)}


@app.get("/internships/{internship_id}")
def get_internship_detail(internship_id: str):
    """Returns the details for a single internship by its ID."""
    internship_detail = dataframe[dataframe['id'] == internship_id]
    if internship_detail.empty:
        return {"error": "Internship not found"}
    
    # Use the same robust JSON conversion trick
    result_json_string = internship_detail.to_json(orient='records')
    # to_json returns a list, so we take the first element
    return {"internship": json.loads(result_json_string)[0]}