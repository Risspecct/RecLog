from fastapi import APIRouter
from fastapi import HTTPException

from app.simulation.generator import simulate_hotspot
from app.services.data_service import get_dataset
from app.models.simulation import SimulationDashboardRequest, ScenarioResultResponse, BestStrategyResponse, ResourcePlanResponse
from app.services.simulation_service import get_hotspot_for_simulation, scenario_dashboard, best_intervention, recommend_resources, test_generator, test_pcri
from app.simulation.pcri import compute_simulated_pcri
from app.simulation.dashboard import scenario_dashboard as dashboard_scenario

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
        best.projected_pcri
    )

@router.post("/test-generator")
def test_generator_endpoint(
    request: SimulationDashboardRequest
):

    return test_generator(
        hotspot_name=request.hotspot_name,
        days=request.days
    )

@router.post("/test-pcri")
def test_pcri_endpoint(
    request: SimulationDashboardRequest
):

    return test_pcri(
        hotspot_name=request.hotspot_name,
        days=request.days
    )


@router.get("/test")
def simulation_test(
    hotspot_name: str | None = None
):

    if hotspot_name is None:

        hotspot_name = (
            get_dataset()
            .iloc[0]["hotspot_name"]
        )

    dashboard = dashboard_scenario(
        hotspot_name=hotspot_name,
        days=7
    )

    if dashboard is None:

        return {
            "error": "Hotspot not found"
        }

    return {
        "hotspot": hotspot_name,
        "rows": len(dashboard),
        "results": dashboard.to_dict(
            orient="records"
        )
    }