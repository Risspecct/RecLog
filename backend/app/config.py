from pathlib import Path

BASE_DIR = Path(__file__).parent

FINAL_DATASET_PATH = (
    BASE_DIR
    / "data"
    / "gridlock_final_dataset.csv"
)

CLUSTER_DATASET_PATH = (
    BASE_DIR
    / "data"
    / "cluster_summary.csv"
)
