from app.services.data_service import (get_dataset, get_cluster_dataset, get_historical_scaler)


def get_hotspot_for_simulation(
    hotspot_name: str
):

    df = get_dataset()

    hotspot = df[
        df["hotspot_name"] == hotspot_name
    ]

    if hotspot.empty:
        return None

    return hotspot.iloc[0].to_dict()


def generate_dashboard(
    hotspot_name: str,
    days: int
):

    hotspot = get_hotspot_for_simulation(
        hotspot_name
    )

    if hotspot is None:
        return None

    return {
        "hotspot": hotspot["hotspot_name"],
        "days": days,
        "current_pcri": hotspot["PCRI"]
    }
