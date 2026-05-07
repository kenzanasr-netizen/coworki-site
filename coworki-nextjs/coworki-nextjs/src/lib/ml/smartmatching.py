"""
Smart Matching Algorithm for CoWorki
Trouve les coworkers avec les intérêts les plus similaires dans le même espace au même moment.

Dépendances:
- fastapi
- uvicorn
- scikit-learn
- sentence-transformers
- psycopg2-binary
- pgvector
- numpy
- pandas
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import psycopg2
from psycopg2.extras import execute_values
import os
import logging
from datetime import datetime

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration de la base de données
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": os.getenv("DB_PORT", "5432"),
    "database": os.getenv("DB_NAME", "coworki"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", "")
}

# Modèles Pydantic
class MatchRequest(BaseModel):
    userId: str
    spaceId: str
    currentUsers: List[str] = []

class Match(BaseModel):
    userId: str
    score: float
    commonInterests: List[str]

class MatchResponse(BaseModel):
    matches: List[Match]

class OccupancyRequest(BaseModel):
    spaceId: str
    currentOccupancy: int
    maxCapacity: int

class OccupancyResponse(BaseModel):
    shouldTriggerDeal: bool
    recommendedDiscount: float
    reason: str

# Classe principale du Smart Matching
class SmartMatchingEngine:
    def __init__(self):
        # Modèle d'embeddings pour les intérêts
        self.embedding_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

        # Vectoriseur TF-IDF pour les domaines professionnels
        self.tfidf_vectorizer = TfidfVectorizer(max_features=100)

        # Cache des embeddings
        self.embedding_cache = {}

        # Connexion à la base de données
        self.db_conn = None

    def get_db_connection(self):
        """Établit une connexion à PostgreSQL"""
        if not self.db_conn or self.db_conn.closed:
            self.db_conn = psycopg2.connect(**DB_CONFIG)
        return self.db_conn

    def vectorize_interests(self, interests: List[str]) -> np.ndarray:
        """Vectorise une liste d'intérêts en utilisant sentence-transformers"""
        if not interests:
            return np.zeros(384)  # Dimension du modèle paraphrase-MiniLM-L6-v2

        # Création d'une clé de cache
        cache_key = "|".join(sorted(interests))
        if cache_key in self.embedding_cache:
            return self.embedding_cache[cache_key]

        # Vectorisation
        text = " ".join(interests)
        embedding = self.embedding_model.encode([text])[0]

        # Mise en cache
        self.embedding_cache[cache_key] = embedding

        return embedding

    def calculate_similarity(self, user1_interests: List[str], user2_interests: List[str]) -> float:
        """
        Calcule le score de similarité entre deux utilisateurs
        Formule: 60% similarité sémantique + 25% domaine professionnel + 15% niveau
        """
        if not user1_interests or not user2_interests:
            return 0.0

        # 1. Similarité sémantique des intérêts (60%)
        emb1 = self.vectorize_interests(user1_interests)
        emb2 = self.vectorize_interests(user2_interests)
        semantic_similarity = cosine_similarity([emb1], [emb2])[0][0]

        # 2. Similarité des domaines professionnels (25%)
        # Extraction des domaines depuis les intérêts
        domains1 = [interest for interest in user1_interests if interest in PROFESSIONAL_DOMAINS]
        domains2 = [interest for interest in user2_interests if interest in PROFESSIONAL_DOMAINS]

        domain_similarity = 0.0
        if domains1 and domains2:
            domain_text1 = " ".join(domains1)
            domain_text2 = " ".join(domains2)
            domain_vectors = self.tfidf_vectorizer.fit_transform([domain_text1, domain_text2])
            domain_similarity = cosine_similarity(domain_vectors)[0][1]

        # 3. Similarité de niveau (15%)
        levels1 = [interest for interest in user1_interests if interest in EXPERIENCE_LEVELS]
        levels2 = [interest for interest in user2_interests if interest in EXPERIENCE_LEVELS]

        level_similarity = 0.0
        if levels1 and levels2:
            # Calcul basé sur la proximité des niveaux
            level_scores = {"débutant": 1, "junior": 2, "intermédiaire": 3, "senior": 4, "expert": 5}
            score1 = max([level_scores.get(level, 3) for level in levels1])
            score2 = max([level_scores.get(level, 3) for level in levels2])
            level_similarity = 1 - abs(score1 - score2) / 4  # Normalisation

        # Score composite
        final_score = (
            semantic_similarity * 0.6 +
            domain_similarity * 0.25 +
            level_similarity * 0.15
        )

        return float(final_score)

    def find_matches(self, user_id: str, space_id: str, current_users: List[str]) -> List[Dict[str, Any]]:
        """Trouve les meilleurs matches pour un utilisateur dans un espace"""
        conn = self.get_db_connection()

        try:
            # Récupération des intérêts de l'utilisateur cible
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT interests FROM "User" WHERE id = %s
                """, (user_id,))
                result = cursor.fetchone()

                if not result:
                    return []

                target_interests = result[0] or []

            # Récupération des autres utilisateurs dans l'espace
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT DISTINCT u.id, u.name, u.interests
                    FROM "User" u
                    JOIN "Reservation" r ON u.id = r."userId"
                    WHERE r."spaceId" = %s
                    AND r.status = 'CONFIRMED'
                    AND r."startDate" <= NOW()
                    AND r."endDate" >= NOW()
                    AND u.id != %s
                    AND u.id NOT IN %s
                """, (space_id, user_id, tuple(current_users) if current_users else ()))

                other_users = cursor.fetchall()

            # Calcul des similarités
            matches = []
            for user_data in other_users:
                other_user_id, other_user_name, other_interests = user_data
                other_interests = other_interests or []

                # Calcul du score
                similarity_score = self.calculate_similarity(target_interests, other_interests)

                # Intérêts communs
                common_interests = list(set(target_interests) & set(other_interests))

                # Seuil minimum de match
                if similarity_score >= 0.3:
                    matches.append({
                        "userId": other_user_id,
                        "score": similarity_score,
                        "commonInterests": common_interests
                    })

            # Tri par score décroissant et limitation à 5 matches
            matches.sort(key=lambda x: x["score"], reverse=True)
            return matches[:5]

        except Exception as e:
            logger.error(f"Erreur lors de la recherche de matches: {e}")
            return []

# Constantes
PROFESSIONAL_DOMAINS = {
    "développement", "design", "marketing", "business", "finance", "juridique",
    "santé", "éducation", "tech", "startup", "consulting", "freelance"
}

EXPERIENCE_LEVELS = {
    "débutant", "junior", "intermédiaire", "senior", "expert"
}

# Instance globale du moteur
matching_engine = SmartMatchingEngine()

# API FastAPI
app = FastAPI(
    title="CoWorki Smart Matching API",
    description="API pour le système de matching intelligent de CoWorki",
    version="1.0.0"
)

@app.post("/api/ml/match", response_model=MatchResponse)
async def find_matches(request: MatchRequest):
    """Endpoint principal pour trouver des matches"""
    try:
        matches = matching_engine.find_matches(
            request.userId,
            request.spaceId,
            request.currentUsers
        )

        return MatchResponse(matches=matches)

    except Exception as e:
        logger.error(f"Erreur API match: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.post("/api/ml/occupancy", response_model=OccupancyResponse)
async def analyze_occupancy(request: OccupancyRequest):
    """Analyse le taux d'occupation et suggère des offres flash"""
    try:
        occupancy_rate = request.currentOccupancy / request.maxCapacity

        # Seuils configurables
        critical_threshold = 0.4  # 40%
        should_trigger = occupancy_rate <= critical_threshold

        recommended_discount = 0.0
        reason = ""

        if should_trigger:
            # Calcul du discount basé sur le taux d'occupation
            # Plus le taux est bas, plus le discount est élevé
            discount_factor = (critical_threshold - occupancy_rate) / critical_threshold
            recommended_discount = min(50.0, 10.0 + (discount_factor * 40.0))  # 10% à 50%

            reason = ".1f"

        return OccupancyResponse(
            shouldTriggerDeal=should_trigger,
            recommendedDiscount=recommended_discount,
            reason=reason
        )

    except Exception as e:
        logger.error(f"Erreur API occupancy: {e}")
        raise HTTPException(status_code=500, detail="Erreur d'analyse d'occupation")

@app.get("/health")
async def health_check():
    """Endpoint de vérification de santé"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Gestion du cycle de vie
@app.on_event("startup")
async def startup_event():
    """Initialisation au démarrage"""
    logger.info("Démarrage du service Smart Matching CoWorki")
    # Préchargement des modèles si nécessaire
    pass

@app.on_event("shutdown")
async def shutdown_event():
    """Nettoyage à l'arrêt"""
    logger.info("Arrêt du service Smart Matching CoWorki")
    if matching_engine.db_conn:
        matching_engine.db_conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "smartmatching:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )