from fastapi import FastAPI
import logging

from app.services.data_services import load_dataset

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title="RecLog API",
    version="1.0.0"
)


@app.on_event("startup")
def startup():
    logger.info("Starting RecLog API")
    load_dataset()


@app.get("/health")
def health_check():
    logger.info("Health check endpoint called")

    return {
        "status": "UP",
        "service": "RecLog API"
    }
