from app.services.data_service import get_dataset


def get_hotspot_for_simulation(
    hotspot_name: str
):

    print("REQUEST:", repr(hotspot_name))

    df = get_dataset()

    hotspot = df[
        df["hotspot_name"]
        .astype(str)
        .str.lower()
        ==
        hotspot_name.lower()
    ]

    if hotspot.empty:
        return None

    return hotspot.iloc[0].to_dict()
