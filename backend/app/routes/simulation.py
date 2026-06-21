from fastapi import APIRouter
from fastapi import HTTPException

from app.models.simulation import SimulationDashboardRequest, SimulationDashboardResponse, ScenarioResultResponse, BestStrategyResponse
from app.services.simulation_service import get_hotspot_for_simulation, scenario_dashboard, best_intervention

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"]
)


@router.post(
    "/dashboard",
    response_model=list[ScenarioResultResponse]
)
def simulation_dashboard(
    request: SimulationDashboardRequest
):

    hotspot = get_hotspot_for_simulation(
        request.hotspot_name
    )

    if hotspot is None:
        raise HTTPException(
            status_code=404,
            detail="Hotspot not found"
        )

    dashboard = scenario_dashboard(
        hotspot_name=request.hotspot_name,
        days=request.days
    )

    if dashboard is None:
        raise HTTPException(
            status_code=404,
            detail="Unable to generate dashboard"
        )

    return dashboard


@router.post(
    "/best-strategy",
    response_model=BestStrategyResponse
)
def get_best_strategy(
    request: SimulationDashboardRequest
):

    dashboard = scenario_dashboard(
        hotspot_name=request.hotspot_name,
        days=request.days
    )

    if dashboard is None:
        raise HTTPException(
            status_code=404,
            detail="Hotspot not found"
        )

    return best_intervention(
        dashboard
    )
