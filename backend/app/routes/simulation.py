from fastapi import APIRouter
from fastapi import HTTPException

from app.models.simulation import SimulationDashboardRequest, ScenarioResultResponse, BestStrategyResponse, ResourcePlanResponse
from app.simulation.dashboard import scenario_dashboard
from app.simulation.recommendation import best_intervention, recommend_resources
from app.services.data_service import get_dataset

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


@router.post(
    "/resources",
    response_model=ResourcePlanResponse
)
def get_resource_plan(
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

    best = best_intervention(
        dashboard
    )

    return recommend_resources(
        best["projected_pcri"]
    )


@router.get("/hotspots")
def get_hotspots():

    df = get_dataset()

    hotspots = (
        df["hotspot_name"]
        .dropna()
        .astype(str)
        .unique()
        .tolist()
    )

    hotspots.sort()

    return hotspots