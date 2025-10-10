# api/api.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import pandas as pd
from supabase import create_client, Client
import json

load_dotenv(dotenv_path='api/.env')

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Supabase URL and Key must be set in the .env file")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

from .recommender_logic import load_data_from_db, recommend_internships
from . import config

app = FastAPI()

# --- THE FIX: Updated list of allowed origins ---
origins = [
    "https://disha-universal.app",              # Your main production URL
    "https://ud-findmy-disha-71.vercel.app",  # Vercel's default project URL
    "http://localhost:8080",                  # Local development
    "http://127.0.0.1:8080",                  # Local development
    "http://localhost:5173",                  # Vite's default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

print("API starting up: Loading data from Supabase...")
dataframe = load_data_from_db(supabase)
print("API is ready to accept requests. Model will be loaded on the first request.")

@app.get("/")
def read_root():
    return {"message": "DISHA Recommender API is running."}

@app.post("/recommend")
def get_recommendations(profile: UserProfile):
    user_profile_dict = profile.dict()
    recommendations = recommend_internships(
        df=dataframe.copy(),
        user_profile=user_profile_dict,
        k=config.TOP_K,
        max_distance=None
    )
    return {"recommendations": recommendations}

@app.get("/internships")
def get_all_internships():
    all_internships_json_string = dataframe.to_json(orient='records')
    return {"internships": json.loads(all_internships_json_string)}

@app.get("/internships/{internship_id}")
def get_internship_detail(internship_id: str):
    internship_detail_df = dataframe[dataframe['id'] == internship_id]
    if internship_detail_df.empty:
        return {"error": "Internship not found"}
    result_json_string = internship_detail_df.to_json(orient='records')
    return {"internship": json.loads(result_json_string)[0]}