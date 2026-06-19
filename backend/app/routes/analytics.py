from fastapi import APIRouter

from app.models.analytics import RootCauseDistributionResponse, EnforcementTierResponse, DashboardInsightsResponse
from app.services.analytics_service import get_root_cause_distribution, get_enforcement_tier_distribution, get_dashboard_insights, get_hotspots_by_root_cause
from app.models.hotspot import HotspotSummaryResponse
from app.models.enums import RootCause

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


@router.get("/dashboard-insights", response_model=DashboardInsightsResponse)
def dashboard_insights():
    return get_dashboard_insights()


@router.get("/root-causes/{root_cause}", response_model=list[HotspotSummaryResponse])
def hotspots_by_root_cause(root_cause: RootCause, limit: int = 50):
    return get_hotspots_by_root_cause(root_cause=root_cause, limit=limit)
