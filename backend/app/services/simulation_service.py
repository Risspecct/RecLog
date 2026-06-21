from app.services.data_service import (get_dataset, get_cluster_dataset, get_historical_scaler)
from app.models.simulation import SimulationDashboardResponse, ScenarioResultResponse, BestStrategyResponse


SCENARIOS = {
    "normal": 1.0,
    "rain": 1.3,
    "festival": 1.8,
    "enforcement": 0.6
}

INTERVENTIONS = {
    "none": 1.00,
    "extra_enforcement": 0.70,
    "temporary_parking_zone": 0.55,
    "traffic_diversion": 0.65
}


def get_hotspot_for_simulation(hotspot_name: str):

    df = get_dataset()

    hotspot = df[
        df["hotspot_name"]
        .astype(str)
        .str.lower()
        .str.contains(
            hotspot_name.lower(),
            na=False
        )
    ]

    if hotspot.empty:
        return None

    return hotspot.iloc[0].to_dict()

def generate_dashboard(hotspot_name: str, days: int):
    hotspot = get_hotspot_for_simulation(hotspot_name)

    if hotspot is None:
        return None

    return SimulationDashboardResponse(
        hotspot=hotspot_name,
        days=days,
        current_pcri=float(
            hotspot["PCRI"]
        ),
        current_priority_score=float(
            hotspot["priority_score"]
        ),
        current_confidence=float(
            hotspot["confidence"]
        ),
        historical_violations=int(
            hotspot["violations"]
        )
    )


def impact_label(change_pct):

    if change_pct >= 50:
        return "SEVERE"

    elif change_pct >= 25:
        return "HIGH"

    elif change_pct >= 10:
        return "MODERATE"

    return "LOW"


def simulation_confidence(simulated_violations: int):
    confidence = min(95, 50 + simulated_violations / 10)
    return round(confidence, 1)


def project_future_pcri(
    current_pcri,
    historical_violations,
    simulated_violations,
    days
):

    expected_baseline = (
        historical_violations / 150
    ) * days

    factor = (
        simulated_violations /
        expected_baseline
    )

    factor = max(
        0.5,
        min(
            factor,
            2.0
        )
    )

    return round(current_pcri * factor, 2)


def scenario_dashboard(
    hotspot_name: str,
    days: int
):

    hotspot = get_hotspot_for_simulation(
        hotspot_name
    )

    if hotspot is None:
        return None

    current_pcri = float(
        hotspot["PCRI"]
    )

    historical_violations = int(
        hotspot["violations"]
    )

    scenarios = [

        ("normal", "none"),

        ("rain", "none"),

        ("festival", "none"),

        ("festival", "extra_enforcement"),

        ("festival", "temporary_parking_zone"),

        ("festival", "traffic_diversion")
    ]

    results = []

    for scenario, intervention in scenarios:

        simulated_violations = int(
            (
                historical_violations / 150
            ) * days
            * SCENARIOS[scenario]
            * INTERVENTIONS[intervention]
        )

        projected_pcri = (
            project_future_pcri(
                current_pcri=current_pcri,
                historical_violations=historical_violations,
                simulated_violations=simulated_violations,
                days=days
            )
        )

        change_pct = (
            (
                projected_pcri -
                current_pcri
            )
            /
            current_pcri
        ) * 100

        results.append(

            ScenarioResultResponse(

                scenario=scenario,

                intervention=intervention,

                projected_pcri=projected_pcri,

                change_pct=round(
                    change_pct,
                    2
                ),

                impact=impact_label(
                    change_pct
                ),

                confidence=simulation_confidence(
                    simulated_violations
                ),

                violations=simulated_violations
            )

        )

    return results


def best_intervention(
    dashboard
):
    interventions = [

        item
        for item in dashboard
        if item.intervention != "none"
    ]

    if not interventions:
        return None

    best = min(
        interventions,
        key=lambda x: x.projected_pcri
    )

    baseline = next(
        (
            item
            for item in dashboard
            if (
                item.scenario == "festival"
                and
                item.intervention == "none"
            )
        ),
        None
    )

    prevented = 0

    if baseline:
        prevented = (
            baseline.violations
            - best.violations
        )

    return BestStrategyResponse(
        best_strategy=best.intervention,

        projected_pcri=float(
            best.projected_pcri
        ),

        impact=best.impact,

        confidence=float(
            best.confidence
        ),

        violations=int(
            best.violations
        ),

        violations_prevented=int(
            prevented
        )
    )


def recommend_resources(
    projected_pcri: float
):

    if projected_pcri >= 90:

        return {
            "risk_tier": "CRITICAL",
            "officers": 6,
            "tow_trucks": 3,
            "patrol_interval": "15 mins"
        }

    elif projected_pcri >= 70:

        return {
            "risk_tier": "HIGH",
            "officers": 4,
            "tow_trucks": 2,
            "patrol_interval": "30 mins"
        }

    elif projected_pcri >= 50:

        return {
            "risk_tier": "MEDIUM",
            "officers": 2,
            "tow_trucks": 1,
            "patrol_interval": "1 hour"
        }

    else:

        return {
            "risk_tier": "LOW",
            "officers": 1,
            "tow_trucks": 0,
            "patrol_interval": "4 hours"
        }
