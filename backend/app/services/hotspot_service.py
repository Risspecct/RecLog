from app.services.data_service import get_dataset


def get_all_hotspots(limit: int = 50, offset: int = 0):
    df = get_dataset()

    return (
        df.iloc[offset: offset + limit]
        .to_dict(orient="records")
    )


def get_hotspot_by_id(h3_cell: str):

    df = get_dataset()

    hotspot = df[df["h3_cell"] == h3_cell]

    if hotspot.empty:
        return None

    return hotspot.iloc[0].to_dict()
