from pydantic import BaseModel
from app.models.enums import EnforcementTier


class RootCauseDistributionResponse(BaseModel):
    root_cause: str
    count: int


class EnforcementTierResponse(BaseModel):
    enforcement_tier: EnforcementTier
    count: int


class DashboardInsightsResponse(BaseModel):
    highest_priority_hotspot: str
    highest_priority_score: float

    critical_hotspots: int

    most_common_root_cause: str

    most_common_violation: str

    avg_pcri: float
