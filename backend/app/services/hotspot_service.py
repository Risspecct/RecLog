from app.services.data_service import get_dataset


def get_all_hotspots():
    df = get_dataset()
    return df.to_dict(orient="records")
