import logging
import pandas as pd

from sklearn.preprocessing import MinMaxScaler
from app.config import (FINAL_DATASET_PATH, CLUSTER_DATASET_PATH,)

logger = logging.getLogger(__name__)

dataset = None
cluster_summary = None
historical_scaler = None


def load_datasets():
    global dataset
    global cluster_summary
    global historical_scaler

    logger.info("Loading hotspot dataset...")

    dataset = pd.read_csv(FINAL_DATASET_PATH)

    logger.info(f"Loaded {len(dataset)} hotspot records")

    logger.info("Loading cluster summary...")

    cluster_summary = pd.read_csv(CLUSTER_DATASET_PATH)

    logger.info(f"Loaded {len(cluster_summary)} cluster records")

    cols = [
        "density",
        "avg_vehicle_weight",
        "avg_severity",
        "avg_repeat",
        "avg_criticality"
    ]

    historical_scaler = MinMaxScaler()

    historical_scaler.fit(cluster_summary[cols])

    logger.info("Historical scaler initialized")

    verify_datasets_loaded()


def get_dataset():
    return dataset


def get_cluster_dataset():
    return cluster_summary


def get_historical_scaler():
    return historical_scaler


def verify_datasets_loaded():
    if dataset is None:
        raise Exception("Dataset not loaded")

    if cluster_summary is None:
        raise Exception("Cluster summary not loaded")

    if historical_scaler is None:
        raise Exception("Historical scaler not initialized")
