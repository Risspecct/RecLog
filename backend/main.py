from fastapi import FastAPI
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title="RecLog API",
    version="1.0.0"
)


@app.get("/health")
def health_check():
    logger.info("Health check endpoint called")

    return {
        "status": "UP",
        "service": "RecLog API"
    }
