from fastapi import FastAPI
import logging

from app.services.data_service import load_datasets
from app.routes.hotspots import router as hotspot_router
from app.routes.dashboard import router as dashboard_router
from app.routes.analytics import router as analytics_router
from app.routes.simulation import router as simulation_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title="RecLog API",
    version="1.0.0"
)

app.include_router(hotspot_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(simulation_router)


@app.on_event("startup")
def startup():
    logger.info("Starting RecLog API")
    load_datasets()


@app.get("/health")
def health_check():
    logger.info("Health check endpoint called")

    return {
        "status": "UP",
        "service": "RecLog API"
    }
