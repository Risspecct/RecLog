from fastapi import APIRouter

from app.models.analytics import RootCauseDistributionResponse
from app.services.analytics_service import get_root_cause_distribution
from app.models.analytics import EnforcementTierResponse
from app.services.analytics_service import get_enforcement_tier_distribution

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/root-causes", response_model=list[RootCauseDistributionResponse])
def root_causes():
    return get_root_cause_distribution()


@router.get("/enforcement-tiers", response_model=list[EnforcementTierResponse])
def enforcement_tiers():
    return get_enforcement_tier_distribution()
