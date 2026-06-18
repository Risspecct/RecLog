from fastapi import APIRouter
from app.services.dashboard_service import get_dashboard_summary
from app.models.dashboard import DashboardSummaryResponse

router = APIRouter()

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary", response_model=DashboardSummaryResponse)
def dashboard_summary():
    return get_dashboard_summary()
