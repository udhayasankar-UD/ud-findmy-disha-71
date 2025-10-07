# api/rules.py

import pandas as pd
import re
from dateutil.parser import parse
import ast
from typing import List, Optional, Set, Dict, Any
from rapidfuzz import process, fuzz
from sentence_transformers import SentenceTransformer, util
import torch

from . import config

# --- (normalize_skill, parse_skills, hard_skill_filter, etc. remain the same) ---
SYNONYMS = {
    "natural language processing": "nlp", "js": "javascript", "reactjs": "react",
    "react.js": "react", "cpp": "c++", "c plus plus": "c++",
    "bleander": "blender", "unity": "unity3d"
}

def normalize_skill(skill: str) -> str:
    if not isinstance(skill, str): return ""
    s = skill.lower().strip()
    s = re.sub(r'[\s\-_]+', ' ', s)
    s = re.sub(r'[^\w\s+#.]', '', s)
    return SYNONYMS.get(s, s)

def parse_skills(skills_str: str) -> List[str]:
    if not skills_str or pd.isna(skills_str): return []
    try:
        skills_list = ast.literal_eval(skills_str)
        if isinstance(skills_list, list):
            return list(set(normalize_skill(s) for s in skills_list if s))
    except (ValueError, SyntaxError):
        return list(set(normalize_skill(s) for s in skills_str.split(',') if s))
    return []

# --- THE FIX: A single, on-demand match_skills function ---
def match_skills(user_skills: List[str], job_skills: List[str], model: SentenceTransformer) -> List[Dict[str, Any]]:
    """Matches user skills against job skills using an on-demand model."""
    if not user_skills or not job_skills:
        return []
    
    norm_user_skills = [normalize_skill(s) for s in user_skills]
    norm_job_skills = [normalize_skill(s) for s in job_skills]
    matched_skills: Dict[str, Dict[str, Any]] = {}

    # 1. Exact matches
    for js in norm_job_skills:
        if js in norm_user_skills and js not in matched_skills:
            matched_skills[js] = {'mode': 'exact', 'score': 1.0}

    # 2. Fuzzy matches
    remaining_job_skills = [js for js in norm_job_skills if js not in matched_skills]
    for js in remaining_job_skills:
        best_match = process.extractOne(js, norm_user_skills, scorer=fuzz.token_sort_ratio)
        if best_match and best_match[1] >= config.FUZZY_CUTOFF and best_match[0] not in matched_skills:
            matched_skills[best_match[0]] = {'mode': f'fuzzy({int(best_match[1])})', 'score': best_match[1] / 100.0}

    # 3. SBERT (semantic) matches
    remaining_job_skills = [js for js in norm_job_skills if js not in matched_skills]
    if not remaining_job_skills:
        return [{'skill': k, **v} for k, v in matched_skills.items()]

    user_skill_embs = model.encode(norm_user_skills, convert_to_tensor=True)
    job_skill_embs = model.encode(remaining_job_skills, convert_to_tensor=True)
    
    cos_scores = util.pytorch_cos_sim(job_skill_embs, user_skill_embs)

    for i, js in enumerate(remaining_job_skills):
        best_score_idx = torch.argmax(cos_scores[i]).item()
        best_score = cos_scores[i][best_score_idx].item()
        if best_score >= config.SBERT_CUTOFF:
            matched_skill = norm_user_skills[best_score_idx]
            if matched_skill not in matched_skills:
                matched_skills[matched_skill] = {'mode': f'sbert({best_score:.2f})', 'score': best_score}

    return [{'skill': k, **v} for k, v in matched_skills.items()]


def hard_skill_filter(matched_skills: List[Dict[str, Any]]) -> bool:
    return len(matched_skills) >= config.MIN_SKILL_MATCHES

# --- (All other functions: parse_stipend, parse_date, score_stipend, score_deadline remain the same) ---
def parse_stipend(stipend_str: str) -> Optional[float]:
    if not isinstance(stipend_str, str): return None
    stipend_str = str(stipend_str).lower().replace(',', '')
    if 'performance based' in stipend_str or 'unpaid' in stipend_str: return 0.0
    numbers = [int(s) for s in re.findall(r'\d+', stipend_str)]
    if not numbers: return None
    stipend = float(numbers[0])
    if '/week' in stipend_str: stipend *= 4.33
    return stipend

def parse_date(date_str: str) -> Optional[str]:
    try:
        return parse(date_str, dayfirst=True, yearfirst=False).strftime('%Y-%m-%d')
    except (ValueError, TypeError, AttributeError):
        return None

def score_stipend(job_stipend: Optional[float], min_stipend: Optional[float]) -> float:
    if job_stipend is None or min_stipend is None or min_stipend <= 0: return 50.0
    if job_stipend >= min_stipend: return 100.0
    return max(0.0, (job_stipend / min_stipend) * 100)

def score_deadline(apply_by_date: Optional[str], available_from: Optional[str]) -> float:
    if not apply_by_date or pd.isna(apply_by_date) or not available_from: return 50.0
    try:
        deadline = pd.to_datetime(apply_by_date)
        availability = pd.to_datetime(available_from)
        if deadline < availability: return 0.0
        days_until = (deadline - availability).days
        if days_until > 30: return 80.0
        elif days_until > 14: return 100.0
        elif days_until > 7: return 90.0
        else: return 70.0
    except (ValueError, TypeError):
        return 50.0