# config.py

# File and Directory Paths
# CORRECTED: Changed to a directory path to load all CSVs within it
DATASET_DIR = 'dataset/'
USER_PROFILE_PATH = 'user.json'
# CORRECTED: Moved pincodes to its own directory
PINCODE_DATA_PATH = 'resources/pincodes.csv'
EMBEDDINGS_CACHE_PATH = 'api/embeddings.joblib'
SKILL_EMBEDDINGS_CACHE_PATH = 'api/skill_embs.joblib'

# Model Configuration
MODEL_NAME = 'all-MiniLM-L6-v2'

# Scoring Weights
SCORING_WEIGHTS = {
    'semantic_score': 0.50,
    'skill_overlap_ratio': 0.20,
    'location_score': 0.15,
    'stipend_score': 0.08,
    'date_score': 0.07,
}

# Recommendation Parameters
TOP_K = 5  # Number of recommendations to return
MIN_SKILL_MATCHES = 1 # Minimum number of skills that must match for a job to be considered

# Explainer Thresholds
SEMANTIC_HIGH_THRESHOLD = 0.7
SEMANTIC_GOOD_THRESHOLD = 0.5

# Skill Matching Thresholds
FUZZY_CUTOFF = 85  # (0-100) for fuzzy matching
SBERT_CUTOFF = 0.75 # (0.0-1.0) for semantic matching

# Geolocation Parameters
LOCATION_RADIUS_KM = 50.0 # Linear decay for location score up to this radius