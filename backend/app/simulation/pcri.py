import numpy as np
import pandas as pd

from app.services.data_service import (get_historical_scaler)

from app.simulation.constants import (
    VEHICLE_WEIGHTS,
    SEVERITY_MAP
)


def criticality(location):

    if pd.isna(location):
        return 1.0

    location = str(location).lower()

    if "metro" in location:
        return 1.5

    if "market" in location:
        return 1.5

    if "hospital" in location:
        return 1.4

    if "bus stop" in location:
        return 1.4

    if "circle" in location:
        return 1.2

    if "junction" in location:
        return 1.2

    return 1.0


def compute_simulated_pcri(
    df_sim
):

    historical_scaler = (
        get_historical_scaler()
    )

    df_sim["vehicle_weight"] = (
        df_sim["vehicle_type"]
        .map(VEHICLE_WEIGHTS)
        .fillna(2)
    )

    df_sim["severity_score"] = (
        df_sim["violation_type"]
        .map(SEVERITY_MAP)
        .fillna(1)
    )

    repeat_counts = (
        df_sim.groupby(
            "vehicle_number"
        )
        .size()
        .rename(
            "vehicle_repeat_count"
        )
    )

    df_sim = df_sim.merge(
        repeat_counts,
        left_on="vehicle_number",
        right_index=True,
        how="left"
    )

    df_sim["road_criticality"] = (
        df_sim["hotspot_name"]
        .apply(criticality)
    )

    lat_std = (
        df_sim["latitude"]
        .std()
    )

    lon_std = (
        df_sim["longitude"]
        .std()
    )

    compactness = np.sqrt(
        lat_std**2 + lon_std**2
    )

    compactness = max(
        compactness,
        1e-6
    )

    density = (
        len(df_sim) / compactness
    )

    sim_row = {

        "density":
            density,

        "avg_vehicle_weight":
            df_sim[
                "vehicle_weight"
            ].mean(),

        "avg_severity":
            df_sim[
                "severity_score"
            ].mean(),

        "avg_repeat":
            df_sim[
                "vehicle_repeat_count"
            ].mean(),

        "avg_criticality":
            df_sim[
                "road_criticality"
            ].mean()
    }

    cols = [

        "density",

        "avg_vehicle_weight",

        "avg_severity",

        "avg_repeat",

        "avg_criticality"
    ]

    sim_norm = (
        historical_scaler
        .transform(
            pd.DataFrame(
                [sim_row]
            )[cols]
        )[0]
    )

    density_norm = np.clip(sim_norm[0], 0, 1)
    vehicle_weight_norm = np.clip(sim_norm[1], 0, 1)
    severity_norm = np.clip(sim_norm[2], 0, 1)
    repeat_norm = np.clip(sim_norm[3], 0, 1)
    criticality_norm = np.clip(sim_norm[4], 0, 1)

    pcri = (
        0.35 * density_norm + 0.20 * severity_norm + 0.15 * vehicle_weight_norm + 0.15 * repeat_norm + 0.15 * criticality_norm
    ) * 100

    return {
        "PCRI": round(float(pcri), 2),
        "simulated_violations": int(len(df_sim)),
        "density": round(float(density), 2),
        "density_norm": round(float(density_norm), 4),
        "vehicle_weight_norm": round(float(vehicle_weight_norm), 4),
        "severity_norm": round(float(severity_norm), 4),
        "repeat_norm": round(float(repeat_norm), 4),
        "criticality_norm": round(float(criticality_norm), 4)
    }


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
        simulated_violations / expected_baseline
    )

    factor = max(
        0.5,
        min(
            factor,
            2.0
        )
    )

    return round(
        current_pcri * factor,
        2
    )
