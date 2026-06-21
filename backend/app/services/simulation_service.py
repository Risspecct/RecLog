from app.services.data_service import get_dataset
from app.models.simulation import (
    SimulationDashboardResponse
)


def get_hotspot_for_simulation(
    hotspot_name: str
):

    df = get_dataset()

    hotspot = df[
        df["hotspot_name"]
        .astype(str)
        .str.lower()
        .str.contains(
            hotspot_name.lower(),
            na=False
        )
    ]

    if hotspot.empty:
        return None

    return hotspot.iloc[0].to_dict()


def generate_dashboard(
    hotspot_name: str,
    days: int
):

    hotspot = (
        get_hotspot_for_simulation(
            hotspot_name
        )
    )

    if hotspot is None:
        return None

    return SimulationDashboardResponse(
        hotspot=hotspot_name,

        days=days,

        current_pcri=float(
            hotspot["PCRI"]
        ),

        current_priority_score=float(
            hotspot["priority_score"]
        ),

        current_confidence=float(
            hotspot["confidence"]
        ),

        historical_violations=int(
            hotspot["violations"]
        )
    )
