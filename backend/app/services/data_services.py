import logging
import pandas as pd

from app.config import DATASET_PATH

logger = logging.getLogger(__name__)
dataset = None


def load_dataset():
    global dataset
    logger.info("Loading hotspot dataset...")

    dataset = pd.read_csv(DATASET_PATH)

    logger.info(f"Loaded {len(dataset)} hotspot records")


def get_dataset():
    return dataset
