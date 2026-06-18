from app.services.data_service import get_dataset
from app.models.enums import EnforcementTier


def get_hotspot_summaries(limit: int = 50, offset: int = 0, tier: EnforcementTier | None = None):
    df = get_dataset()

    if tier:
        df = df[df["enforcement_tier"] == tier.value]

    summary_columns = [
        "h3_cell",
        "hotspot_name",
        "center_lat",
        "center_lon",
        "PCRI",
        "priority_score",
        "confidence",
        "enforcement_tier"
    ]

    return (
        df[summary_columns]
        .iloc[offset: offset + limit]
        .to_dict(orient="records")
    )


def get_hotspot_by_id(h3_cell: str):

    df = get_dataset()

    hotspot = df[df["h3_cell"] == h3_cell]

    if hotspot.empty:
        return None

    return hotspot.iloc[0].to_dict()
