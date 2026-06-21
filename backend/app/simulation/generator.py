import numpy as np
import pandas as pd

from datetime import datetime, timedelta

from app.services.data_service import get_dataset

from app.simulation.constants import (
    VEHICLE_DIST,
    VIOLATION_LIBRARY,
    SCENARIOS,
    INTERVENTIONS
)


def generate_vehicle_number():

    return (
        "KA"
        + str(np.random.randint(1, 99)).zfill(2)
        + "".join(
            np.random.choice(
                list("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
                2
            )
        )
        + str(
            np.random.randint(
                1000,
                9999
            )
        )
    )


def build_violation_mix(
    dominant_violation
):

    mix = {
        dominant_violation: 0.70
    }

    others = [
        violation
        for violation in VIOLATION_LIBRARY
        if violation != dominant_violation
    ]

    chosen = np.random.choice(
        others,
        size=2,
        replace=False
    )

    mix[chosen[0]] = 0.20
    mix[chosen[1]] = 0.10

    return mix


def simulate_hotspot(
    hotspot_name,
    days,
    scenario,
    intervention
):

    df = get_dataset()

    hotspot = df[
        df["hotspot_name"] == hotspot_name
    ]

    if hotspot.empty:
        return None

    hotspot = hotspot.iloc[0]

    center_lat = hotspot["center_lat"]
    center_lon = hotspot["center_lon"]

    violations = hotspot["violations"]

    peak_hour = int(
        hotspot["peak_hour"]
    )

    dominant_violation = (
        hotspot["dominant_violation"]
    )

    violation_mix = (
        build_violation_mix(
            dominant_violation
        )
    )

    daily_avg = (
        violations / 150
    )

    daily_avg *= SCENARIOS[
        scenario
    ]

    daily_avg *= INTERVENTIONS[
        intervention
    ]

    rows = []

    vehicle_pool = []

    start_date = datetime.now()

    for day in range(days):

        date = (
            start_date
            + timedelta(days=day)
        )

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
                min(
                    23,
                    hour
                )
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

            latitude = (
                center_lat
                + np.random.normal(
                    0,
                    0.0005
                )
            )

            longitude = (
                center_lon
                + np.random.normal(
                    0,
                    0.0005
                )
            )

            violation_type = (
                np.random.choice(
                    list(
                        violation_mix.keys()
                    ),
                    p=list(
                        violation_mix.values()
                    )
                )
            )

            vehicle_type = (
                np.random.choice(
                    list(
                        VEHICLE_DIST.keys()
                    ),
                    p=list(
                        VEHICLE_DIST.values()
                    )
                )
            )

            if (
                vehicle_pool
                and np.random.rand() < 0.20
            ):

                vehicle_number = (
                    np.random.choice(
                        vehicle_pool
                    )
                )

            else:

                vehicle_number = (
                    generate_vehicle_number()
                )

                vehicle_pool.append(
                    vehicle_number
                )

            rows.append({

                "timestamp":
                    timestamp,

                "latitude":
                    latitude,

                "longitude":
                    longitude,

                "violation_type":
                    violation_type,

                "vehicle_type":
                    vehicle_type,

                "vehicle_number":
                    vehicle_number,

                "hotspot_name":
                    hotspot_name
            })

    return pd.DataFrame(rows)
