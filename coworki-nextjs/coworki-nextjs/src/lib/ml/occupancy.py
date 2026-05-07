"""
Occupancy Prediction and Flash Deal Algorithm for CoWorki
Prédit les taux d'occupation et déclenche automatiquement des offres flash.

Dépendances:
- fastapi
- uvicorn
- scikit-learn
- pandas
- numpy
- prophet (optionnel pour les prédictions temporelles)
- psycopg2-binary
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from datetime import datetime, timedelta
import psycopg2
import os
import logging
import json

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
class OccupancyData(BaseModel):
    spaceId: str
    date: str
    hour: int
    occupancyRate: float
    dayOfWeek: int
    isHoliday: bool
    weatherCondition: Optional[str] = None
    temperature: Optional[float] = None

class PredictionRequest(BaseModel):
    spaceId: str
    predictionDate: str
    hours: List[int] = [9, 10, 11, 12, 13, 14, 15, 16, 17]

class PredictionResponse(BaseModel):
    spaceId: str
    predictions: List[Dict[str, Any]]
    confidence: float

class FlashDealSuggestion(BaseModel):
    spaceId: str
    shouldTrigger: bool
    recommendedDiscount: float
    predictedOccupancy: float
    reason: str
    optimalTime: str

# Classe principale de prédiction d'occupation
class OccupancyPredictor:
    def __init__(self):
        self.models = {}  # Cache des modèles par espace
        self.scalers = {}  # Cache des scalers par espace
        self.db_conn = None

    def get_db_connection(self):
        """Établit une connexion à PostgreSQL"""
        if not self.db_conn or self.db_conn.closed:
            self.db_conn = psycopg2.connect(**DB_CONFIG)
        return self.db_conn

    def extract_features(self, data: List[OccupancyData]) -> tuple:
        """Extrait les features et targets des données d'occupation"""
        df = pd.DataFrame([d.dict() for d in data])

        # Features temporelles
        df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
        df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
        df['day_sin'] = np.sin(2 * np.pi * df['dayOfWeek'] / 7)
        df['day_cos'] = np.cos(2 * np.pi * df['dayOfWeek'] / 7)

        # Features météo (si disponibles)
        df['weather_encoded'] = df['weatherCondition'].map({
            'sunny': 1, 'cloudy': 0.5, 'rainy': 0, 'snowy': -0.5
        }).fillna(0.5)

        df['temperature_normalized'] = (df['temperature'] - 20) / 20  # Normalisation autour de 20°C

        # Features finales
        features = [
            'hour_sin', 'hour_cos', 'day_sin', 'day_cos',
            'isHoliday', 'weather_encoded', 'temperature_normalized'
        ]

        X = df[features].fillna(0)
        y = df['occupancyRate']

        return X, y

    def train_model(self, space_id: str, data: List[OccupancyData]) -> bool:
        """Entraîne un modèle de prédiction pour un espace"""
        try:
            if len(data) < 50:  # Minimum de données requis
                logger.warning(f"Données insuffisantes pour l'espace {space_id}")
                return False

            X, y = self.extract_features(data)

            # Normalisation
            scaler = StandardScaler()
            X_scaled = scaler.fit_transform(X)

            # Entraînement du modèle
            model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42,
                n_jobs=-1
            )

            # Split train/test
            X_train, X_test, y_train, y_test = train_test_split(
                X_scaled, y, test_size=0.2, random_state=42
            )

            model.fit(X_train, y_train)

            # Évaluation
            score = model.score(X_test, y_test)
            logger.info(f"Modèle entraîné pour {space_id} - Score R²: {score:.3f}")

            # Cache du modèle et scaler
            self.models[space_id] = model
            self.scalers[space_id] = scaler

            return True

        except Exception as e:
            logger.error(f"Erreur entraînement modèle pour {space_id}: {e}")
            return False

    def predict_occupancy(self, space_id: str, prediction_date: str, hours: List[int]) -> List[Dict[str, Any]]:
        """Prédit l'occupation pour une date donnée"""
        if space_id not in self.models:
            raise ValueError(f"Aucun modèle entraîné pour l'espace {space_id}")

        model = self.models[space_id]
        scaler = self.scalers[space_id]

        predictions = []
        pred_date = datetime.fromisoformat(prediction_date.replace('Z', '+00:00'))

        for hour in hours:
            # Création des features pour cette heure
            day_of_week = pred_date.weekday()

            features = {
                'hour_sin': np.sin(2 * np.pi * hour / 24),
                'hour_cos': np.cos(2 * np.pi * hour / 24),
                'day_sin': np.sin(2 * np.pi * day_of_week / 7),
                'day_cos': np.cos(2 * np.pi * day_of_week / 7),
                'isHoliday': self.is_holiday(pred_date),
                'weather_encoded': 0.5,  # Valeur par défaut
                'temperature_normalized': 0.0  # Valeur par défaut
            }

            # Prédiction
            X_pred = np.array([list(features.values())])
            X_pred_scaled = scaler.transform(X_pred)
            predicted_rate = model.predict(X_pred_scaled)[0]

            # Calcul de l'intervalle de confiance (approximation)
            confidence = min(0.95, 0.7 + (len(self.models) * 0.05))  # Améliore avec plus de données

            predictions.append({
                'hour': hour,
                'predictedOccupancy': max(0, min(1, predicted_rate)),  # Clamp entre 0 et 1
                'confidence': confidence,
                'timestamp': f"{prediction_date}T{hour:02d}:00:00Z"
            })

        return predictions

    def is_holiday(self, date: datetime) -> bool:
        """Détermine si une date est un jour férié (simplifié)"""
        # Liste basique des jours fériés tunisiens
        holidays = [
            (1, 1),   # Jour de l'an
            (1, 14),  # Révolution
            (3, 20),  # Indépendance
            (4, 9),   # Martyrs
            (5, 1),   # Fête du travail
            (7, 25),  # Fête de la République
            (8, 13),  # Fête de la Femme
            (10, 15), # Évacuation
        ]

        return (date.month, date.day) in holidays

    def suggest_flash_deal(self, space_id: str, current_occupancy: float, max_capacity: int) -> Dict[str, Any]:
        """Suggère si une offre flash devrait être déclenchée"""
        try:
            # Seuils configurables
            critical_threshold = 0.4  # 40% d'occupation
            moderate_threshold = 0.6  # 60% d'occupation

            occupancy_rate = current_occupancy / max_capacity

            if occupancy_rate > moderate_threshold:
                return {
                    'shouldTrigger': False,
                    'recommendedDiscount': 0,
                    'reason': ".1f"
                }

            # Prédiction pour les prochaines heures
            now = datetime.now()
            predictions = self.predict_occupancy(space_id, now.isoformat(), [now.hour + i for i in range(1, 4)])

            # Analyse des prédictions
            avg_predicted = np.mean([p['predictedOccupancy'] for p in predictions])
            min_predicted = min([p['predictedOccupancy'] for p in predictions])

            # Logique de décision
            should_trigger = occupancy_rate <= critical_threshold or min_predicted <= critical_threshold

            discount = 0.0
            reason = ""
            optimal_time = ""

            if should_trigger:
                # Calcul du discount basé sur l'écart à l'objectif
                target_rate = 0.7  # Objectif de 70%
                discount_factor = (target_rate - occupancy_rate) / target_rate
                discount = min(50.0, 15.0 + (discount_factor * 35.0))  # 15% à 50%

                # Heure optimale (celle avec la plus faible prédiction)
                optimal_hour = min(predictions, key=lambda x: x['predictedOccupancy'])['hour']
                optimal_time = f"{now.strftime('%Y-%m-%d')}T{optimal_hour:02d}:00:00Z"

                reason = ".1f"

            return {
                'shouldTrigger': should_trigger,
                'recommendedDiscount': discount,
                'predictedOccupancy': avg_predicted,
                'reason': reason,
                'optimalTime': optimal_time
            }

        except Exception as e:
            logger.error(f"Erreur suggestion offre flash pour {space_id}: {e}")
            return {
                'shouldTrigger': False,
                'recommendedDiscount': 0,
                'predictedOccupancy': 0,
                'reason': "Erreur de calcul",
                'optimalTime': ""
            }

    def get_historical_data(self, space_id: str, days_back: int = 30) -> List[OccupancyData]:
        """Récupère les données historiques d'occupation depuis la BDD"""
        conn = self.get_db_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT
                        r."spaceId",
                        DATE(r."startDate") as date,
                        EXTRACT(hour from r."startDate") as hour,
                        COUNT(*)::float / s.capacity as occupancy_rate,
                        EXTRACT(dow from r."startDate") as day_of_week,
                        false as is_holiday,  -- TODO: implémenter la logique des jours fériés
                        null as weather_condition,
                        null as temperature
                    FROM "Reservation" r
                    JOIN "Seat" s ON r."seatId" = s.id
                    WHERE r."spaceId" = %s
                    AND r.status = 'CONFIRMED'
                    AND r."startDate" >= NOW() - INTERVAL '%s days'
                    GROUP BY r."spaceId", DATE(r."startDate"), EXTRACT(hour from r."startDate"), s.capacity, EXTRACT(dow from r."startDate")
                    ORDER BY date, hour
                """, (space_id, days_back))

                rows = cursor.fetchall()

                data = []
                for row in rows:
                    data.append(OccupancyData(
                        spaceId=row[0],
                        date=row[1].isoformat(),
                        hour=int(row[2]),
                        occupancyRate=float(row[3]),
                        dayOfWeek=int(row[4]),
                        isHoliday=row[5],
                        weatherCondition=row[6],
                        temperature=row[7]
                    ))

                return data

        except Exception as e:
            logger.error(f"Erreur récupération données historiques pour {space_id}: {e}")
            return []

# Instance globale du prédicteur
occupancy_predictor = OccupancyPredictor()

# API FastAPI
app = FastAPI(
    title="CoWorki Occupancy Prediction API",
    description="API pour la prédiction d'occupation et les offres flash de CoWorki",
    version="1.0.0"
)

@app.post("/api/ml/train/{space_id}")
async def train_model(space_id: str):
    """Entraîne le modèle pour un espace spécifique"""
    try:
        # Récupération des données historiques
        historical_data = occupancy_predictor.get_historical_data(space_id)

        if not historical_data:
            raise HTTPException(status_code=400, detail="Aucune donnée historique disponible")

        # Entraînement
        success = occupancy_predictor.train_model(space_id, historical_data)

        if success:
            return {"message": f"Modèle entraîné avec succès pour l'espace {space_id}"}
        else:
            raise HTTPException(status_code=400, detail="Échec de l'entraînement du modèle")

    except Exception as e:
        logger.error(f"Erreur entraînement modèle: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.post("/api/ml/predict", response_model=PredictionResponse)
async def predict_occupancy(request: PredictionRequest):
    """Prédit l'occupation pour une date donnée"""
    try:
        predictions = occupancy_predictor.predict_occupancy(
            request.spaceId,
            request.predictionDate,
            request.hours
        )

        # Calcul de la confiance moyenne
        avg_confidence = np.mean([p['confidence'] for p in predictions])

        return PredictionResponse(
            spaceId=request.spaceId,
            predictions=predictions,
            confidence=avg_confidence
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Erreur prédiction: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.post("/api/ml/flash-deal", response_model=FlashDealSuggestion)
async def suggest_flash_deal(space_id: str, current_occupancy: int, max_capacity: int):
    """Suggère une offre flash basée sur l'occupation actuelle"""
    try:
        suggestion = occupancy_predictor.suggest_flash_deal(space_id, current_occupancy, max_capacity)

        return FlashDealSuggestion(**suggestion)

    except Exception as e:
        logger.error(f"Erreur suggestion offre flash: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.get("/health")
async def health_check():
    """Endpoint de vérification de santé"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Gestion du cycle de vie
@app.on_event("startup")
async def startup_event():
    """Initialisation au démarrage"""
    logger.info("Démarrage du service de prédiction d'occupation CoWorki")
    # Préchargement des modèles si nécessaire
    pass

@app.on_event("shutdown")
async def shutdown_event():
    """Nettoyage à l'arrêt"""
    logger.info("Arrêt du service de prédiction d'occupation CoWorki")
    if occupancy_predictor.db_conn:
        occupancy_predictor.db_conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "occupancy:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8001)),
        reload=True
    )