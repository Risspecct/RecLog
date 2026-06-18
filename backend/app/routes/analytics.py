from fastapi import APIRouter

from app.models.analytics import RootCauseDistributionResponse
from app.services.analytics_service import get_root_cause_distribution

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/root-causes", response_model=list[RootCauseDistributionResponse])
def root_causes():
    return get_root_cause_distribution()
