from pydantic import BaseModel


class HotspotSummaryResponse(BaseModel):
    h3_cell: str
    hotspot_name: str

    center_lat: float
    center_lon: float

    priority_score: float
    PCRI: float

    enforcement_tier: str

    confidence: float


class HotspotDetailResponse(BaseModel):
    h3_cell: str
    hotspot_name: str

    center_lat: float
    center_lon: float

    PCRI: float
    priority_score: float
    confidence: float

    enforcement_tier: str

    violations: int
    persistence_pct: float
    chronicity_score: float

    dominant_violation: str

    root_cause: str
    recommendation: str

    peak_hour: int

    insight: str