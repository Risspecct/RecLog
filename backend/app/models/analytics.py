from pydantic import BaseModel
from app.models.enums import EnforcementTier


class RootCauseDistributionResponse(BaseModel):
    root_cause: str
    count: int


class EnforcementTierResponse(BaseModel):
    enforcement_tier: EnforcementTier
    count: int
