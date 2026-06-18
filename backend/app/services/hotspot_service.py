from app.services.data_service import get_dataset


def get_all_hotspots(
    limit: int = 50,
    offset: int = 0
):
    df = get_dataset()

    return (
        df.iloc[offset: offset + limit]
        .to_dict(orient="records")
    )