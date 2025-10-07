# api/model_utils.py

from sentence_transformers import SentenceTransformer, util
import numpy as np
import torch
from typing import Dict, List
import pandas as pd

from . import config

_model = None

def get_model() -> SentenceTransformer:
    """Loads the SBERT model if it's not already loaded."""
    global _model
    if _model is None:
        print("Loading Sentence Transformer model into memory...")
        _model = SentenceTransformer(config.MODEL_NAME)
        print("Model loaded successfully.")
    return _model

def create_user_embedding(user_profile: dict, model: SentenceTransformer) -> torch.Tensor:
    """Creates an embedding for the user profile."""
    user_text = " ".join(user_profile.get('skills', [])) + " " + user_profile.get('qualification', '')
    return model.encode(user_text, convert_to_tensor=True)

def get_semantic_scores_on_demand(user_embedding: torch.Tensor, jobs_df: pd.DataFrame, model: SentenceTransformer) -> np.ndarray:
    """Calculates cosine similarity on-demand without pre-caching job embeddings."""
    print(f"Calculating semantic scores for {len(jobs_df)} jobs...")
    
    job_texts = (
        jobs_df.get('title', pd.Series(dtype=str)).astype(str) + " " +
        jobs_df.get('skills', pd.Series(dtype=str)).fillna('').astype(str)
    ).tolist()

    if not job_texts:
        return np.array([])
        
    job_embeddings = model.encode(job_texts, convert_to_tensor=True)
    
    if user_embedding.device != job_embeddings.device:
        job_embeddings = job_embeddings.to(user_embedding.device)
        
    cosine_scores = util.dot_score(user_embedding, job_embeddings)
    
    print("Semantic scores calculated.")
    return cosine_scores[0].cpu().numpy()