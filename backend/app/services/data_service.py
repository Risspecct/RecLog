import logging
import pandas as pd

from app.config import (FINAL_DATASET_PATH, CLUSTER_DATASET_PATH)

logger = logging.getLogger(__name__)
dataset = None
cluster_dataset = None


def load_datasets():
    global dataset, cluster_dataset
    logger.info("Loading hotspot dataset...")

    dataset = pd.read_csv(FINAL_DATASET_PATH)
    cluster_dataset = pd.read_csv(CLUSTER_DATASET_PATH)

    logger.info(f"Loaded {len(dataset)} hotspot records")
    logger.info(f"Loaded {len(cluster_dataset)} cluster records")


def get_dataset():
    return dataset


def get_cluster_dataset():
    return cluster_dataset
