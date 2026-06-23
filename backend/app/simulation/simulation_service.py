from app.services.data_service import get_dataset


def get_hotspot_for_simulation(
    hotspot_name: str
):

    df = get_dataset()

    query = hotspot_name.lower()

    hotspot = df[
        df["hotspot_name"]
        .astype(str)
        .str.lower()
        .apply(
            lambda x:
            query in x or x in query
        )
    ]

    if hotspot.empty:
        return None

    return hotspot.iloc[0].to_dict()