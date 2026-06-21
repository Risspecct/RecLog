from fastapi import APIRouter
from fastapi import HTTPException

from app.models.simulation import SimulationDashboardRequest
from app.services.simulation_service import get_hotspot_for_simulation

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"]
)


@router.post("/dashboard")
def simulation_dashboard(request: SimulationDashboardRequest):
    hotspot = get_hotspot_for_simulation(request.hotspot_name)

    if hotspot is None:
        raise HTTPException(
            status_code=404,
            detail="Hotspot not found"
        )

    return {
        "hotspot": hotspot["hotspot_name"],
        "days": request.days
    }
