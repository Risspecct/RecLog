import pandas as pd

from app.services.data_service import (
    get_dataset
)
from app.simulation.generator import (
    simulate_hotspot
)
from app.simulation.pcri import (
    project_future_pcri,
    compute_simulated_pcri
)
from app.simulation.recommendation import (
    impact_label,
    simulation_confidence
)


def scenario_dashboard(
    hotspot_name,
    days
):

    df = get_dataset()

    hotspot = df[
        df["hotspot_name"] == hotspot_name
    ]

    if hotspot.empty:
        return None

    hotspot = hotspot.iloc[0]

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

        df_sim = simulate_hotspot(
            hotspot_name=hotspot_name,
            days=days,
            scenario=scenario,
            intervention=intervention
        )

        sim_result = (
            compute_simulated_pcri(
                df_sim
            )
        )

        projected_pcri = (
            project_future_pcri(
                current_pcri=current_pcri,
                historical_violations=
                    historical_violations,
                simulated_violations=
                    sim_result[
                        "simulated_violations"
                    ],
                days=days
            )
        )

        change_pct = (

            (
                projected_pcri
                -
                current_pcri
            )

            /

            current_pcri

        ) * 100

        results.append({
            "scenario": scenario,
            "intervention": intervention,
            "projected_pcri": round(projected_pcri, 2),
            "change_pct": round(change_pct, 2),
            "impact": impact_label(change_pct),
            "confidence": simulation_confidence(
                sim_result["simulated_violations"]
            ),
            "violations": sim_result["simulated_violations"]
        })

    return results
