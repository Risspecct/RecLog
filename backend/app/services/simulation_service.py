import numpy as np
import pandas as pd
from datetime import datetime, timedelta
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

VEHICLE_DIST = {
    "SCOOTER": 0.35,
    "MOTOR CYCLE": 0.25,
    "CAR": 0.25,
    "PASSENGER AUTO": 0.10,
    "GOODS AUTO": 0.05
}

vehicle_weights = {
    "SCOOTER": 1,
    "MOTOR CYCLE": 1,
    "MOPED": 1,

    "CAR": 2,
    "JEEP": 2,
    "PASSENGER AUTO": 2,

    "MAXI-CAB": 3,
    "VAN": 3,

    "GOODS AUTO": 4,

    "LGV": 5,
    "TEMPO": 5,

    "PRIVATE BUS": 8,
    "BUS (BMTC/KSRTC)": 8,
    "SCHOOL VEHICLE": 8,
    "TOURIST BUS": 8,
    "FACTORY BUS": 8,

    "MINI LORRY": 7,

    "LORRY/GOODS VEHICLE": 10,
    "HGV": 10,
    "TANKER": 10,

    "TRACTOR": 6
}

severity_map = {
    "PARKING IN A MAIN ROAD": 5,
    "DOUBLE PARKING": 5,

    "PARKING ON FOOTPATH": 4,
    "PARKING NEAR ROAD CROSSING": 4,
    "PARKING NEAR TRAFFIC LIGHT OR ZEBRA CROSS": 4,
    "PARKING NEAR BUSTOP/SCHOOL/HOSPITAL ETC": 4,

    "NO PARKING": 3,

    "WRONG PARKING": 2
}

VIOLATION_LIBRARY = [
    "NO PARKING",
    "PARKING IN A MAIN ROAD",
    "DOUBLE PARKING",
    "PARKING ON FOOTPATH",
    "WRONG PARKING"
]

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

        df_sim = simulate_hotspot(
            hotspot_name=hotspot_name,
            days=days,
            scenario=scenario,
            intervention=intervention
        )

        sim_result = compute_simulated_pcri(
            df_sim,
            get_historical_scaler()
        )

        projected_pcri = sim_result["PCRI"]

        simulated_violations = (
            sim_result["simulated_violations"]
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

def generate_vehicle_number():

    return (
        "KA"
        + str(np.random.randint(1, 99)).zfill(2)
        + "".join(np.random.choice(list("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 2))
        + str(np.random.randint(1000, 9999))
    )
    
def build_violation_mix(dominant):

    mix = {
        dominant: 0.70
    }

    others = [
        v
        for v in VIOLATION_LIBRARY
        if v != dominant
    ]

    chosen = np.random.choice(
        others,
        size=2,
        replace=False
    )

    mix[chosen[0]] = 0.20
    mix[chosen[1]] = 0.10

    return mix

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

def simulate_hotspot(
    hotspot_name,
    days,
    scenario,
    intervention,
):
    df = get_dataset()
    matches = df[
        df["hotspot_name"] == hotspot_name
    ]

    if matches.empty:
        raise ValueError(
            f"Hotspot not found: {hotspot_name}"
        )

    hotspot = matches.iloc[0]
    print("Requested hotspot:")
    print(hotspot_name)

    print("\nDataset sample:")
    print(
        df["hotspot_name"]
        .head()
        .tolist()
    )
    matches = df[
        df["hotspot_name"] == hotspot_name
    ]

    print("Matches:", len(matches))
    
    center_lat = hotspot["center_lat"]
    center_lon = hotspot["center_lon"]

    violations = hotspot["violations"]

    peak_hour = int(hotspot["peak_hour"])

    dominant_violation = hotspot["dominant_violation"]

    violation_mix = build_violation_mix(
        dominant_violation
    )

    daily_avg = violations / 150

    daily_avg *= SCENARIOS[scenario]
    daily_avg *= INTERVENTIONS[intervention]

    rows = []

    vehicle_pool = []

    start_date = datetime.now()

    for day in range(days):

        date = start_date + timedelta(days=day)

        daily_count = np.random.poisson(
            daily_avg
        )

        for _ in range(daily_count):

            hour = int(
                np.random.normal(
                    peak_hour,
                    1
                )
            )

            hour = max(
                0,
                min(23, hour)
            )

            minute = np.random.randint(
                0,
                60
            )

            timestamp = date.replace(
                hour=hour,
                minute=minute,
                second=0,
                microsecond=0
            )

            lat = (
                center_lat
                + np.random.normal(
                    0,
                    0.0005
                )
            )

            lon = (
                center_lon
                + np.random.normal(
                    0,
                    0.0005
                )
            )

            violation_type = np.random.choice(
                list(violation_mix.keys()),
                p=list(violation_mix.values())
            )

            vehicle_type = np.random.choice(
                list(VEHICLE_DIST.keys()),
                p=list(VEHICLE_DIST.values())
            )

            if (
                len(vehicle_pool) > 0
                and np.random.rand() < 0.20
            ):
                vehicle_number = np.random.choice(
                    vehicle_pool
                )
            else:
                vehicle_number = generate_vehicle_number()
                vehicle_pool.append(
                    vehicle_number
                )

            rows.append({
                "timestamp": timestamp,
                "latitude": lat,
                "longitude": lon,
                "violation_type": violation_type,
                "vehicle_type": vehicle_type,
                "vehicle_number": vehicle_number,
                "hotspot_name": hotspot_name
            })

    return pd.DataFrame(rows)

def test_generator(
    hotspot_name,
    days
):

    df_sim = simulate_hotspot(
        hotspot_name=hotspot_name,
        days=days,
        scenario="festival",
        intervention="none"
    )

    return {
        "generated_rows": len(df_sim)
    }   
    

def compute_simulated_pcri(
    df_sim,
    historical_scaler
):

    # -------------------------
    # Vehicle Weight
    # -------------------------

    df_sim["vehicle_weight"] = (
        df_sim["vehicle_type"]
        .map(vehicle_weights)
        .fillna(2)
    )

    # -------------------------
    # Severity
    # -------------------------

    df_sim["severity_score"] = (
        df_sim["violation_type"]
        .map(severity_map)
        .fillna(1)
    )

    # -------------------------
    # Repeat Offenders
    # -------------------------

    repeat_counts = (
        df_sim.groupby("vehicle_number")
        .size()
        .rename("vehicle_repeat_count")
    )

    df_sim = df_sim.merge(
        repeat_counts,
        left_on="vehicle_number",
        right_index=True,
        how="left"
    )

    # -------------------------
    # Road Criticality
    # -------------------------

    df_sim["road_criticality"] = (
        df_sim["hotspot_name"]
        .apply(criticality)
    )

    # -------------------------
    # Compactness
    # -------------------------

    lat_std = df_sim["latitude"].std()
    lon_std = df_sim["longitude"].std()

    compactness = np.sqrt(
        lat_std**2 +
        lon_std**2
    )

    # avoid divide-by-zero
    compactness = max(compactness, 1e-6)

    # -------------------------
    # IMPORTANT UPDATE
    # Convert simulated violations
    # back to equivalent 150-day horizon
    # -------------------------

    simulation_days = (
        (
            df_sim["timestamp"].max()
            -
            df_sim["timestamp"].min()
        ).days
        + 1
    )

    equivalent_150_day_violations = (
        len(df_sim)
        / simulation_days
    ) * 150

    density = (
        equivalent_150_day_violations
        / compactness
    )

    # -------------------------
    # Simulated Feature Row
    # -------------------------

    sim_row = {
        "density": density,

        "avg_vehicle_weight":
            df_sim["vehicle_weight"].mean(),

        "avg_severity":
            df_sim["severity_score"].mean(),

        "avg_repeat":
            df_sim["vehicle_repeat_count"].mean(),

        "avg_criticality":
            df_sim["road_criticality"].mean()
    }

    cols = [
        "density",
        "avg_vehicle_weight",
        "avg_severity",
        "avg_repeat",
        "avg_criticality"
    ]

    # -------------------------
    # Append To Historical Data
    # -------------------------

    sim_norm = historical_scaler.transform(
    pd.DataFrame([sim_row])
    )[0]
    
    density_norm = np.clip(sim_norm[0], 0, 1)
    vehicle_weight_norm = np.clip(sim_norm[1], 0, 1)
    severity_norm = np.clip(sim_norm[2], 0, 1)
    repeat_norm = np.clip(sim_norm[3], 0, 1)
    criticality_norm = np.clip(sim_norm[4], 0, 1)

    # -------------------------
    # ORIGINAL PCRI FORMULA
    # -------------------------

    pcri = (
          0.35 * density_norm
        + 0.20 * severity_norm
        + 0.15 * vehicle_weight_norm
        + 0.15 * repeat_norm
        + 0.15 * criticality_norm
    ) * 100

    return {
        "PCRI": round(float(pcri), 2),

        "simulated_violations":len(df_sim),

        "density":
            round(float(density), 2),

        "avg_vehicle_weight":
            round(float(sim_row["avg_vehicle_weight"]), 2),

        "avg_severity":
            round(float(sim_row["avg_severity"]), 2),

        "avg_repeat":
            round(float(sim_row["avg_repeat"]), 2),

        "avg_criticality":
            round(float(sim_row["avg_criticality"]), 2),

        "density_norm":
            round(float(density_norm), 4),

        "vehicle_weight_norm":
            round(float(vehicle_weight_norm), 4),

        "severity_norm":
            round(float(severity_norm), 4),

        "repeat_norm":
            round(float(repeat_norm), 4),

        "criticality_norm":
            round(float(criticality_norm), 4)
    }

def test_pcri(
    hotspot_name,
    days
):

    df_sim = simulate_hotspot(
        hotspot_name=hotspot_name,
        days=days,
        scenario="festival",
        intervention="none"
    )

    result = compute_simulated_pcri(
        df_sim,
        get_historical_scaler()
    )

    return result