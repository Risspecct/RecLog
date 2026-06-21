def impact_label(change_pct):

    if change_pct >= 50:
        return "SEVERE"

    elif change_pct >= 25:
        return "HIGH"

    elif change_pct >= 10:
        return "MODERATE"

    else:
        return "LOW"


def simulation_confidence(
    simulated_violations
):

    confidence = min(
        95,
        50 + (
            simulated_violations / 10
        )
    )

    return round(
        confidence,
        1
    )


def recommend_resources(
    projected_pcri
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


def best_intervention(
    dashboard
):

    interventions = [

        row

        for row in dashboard

        if row["intervention"] != "none"
    ]

    if not interventions:
        return None

    best = min(
        interventions,
        key=lambda row:
            row["projected_pcri"]
    )

    baseline = next(

        row

        for row in dashboard

        if (
            row["scenario"] == "festival"
            and
            row["intervention"] == "none"
        )
    )

    violations_prevented = (

        baseline["violations"]

        -

        best["violations"]
    )

    return {

        "best_strategy":
            best["intervention"],

        "projected_pcri":
            float(
                best["projected_pcri"]
            ),

        "impact":
            best["impact"],

        "confidence":
            float(
                best["confidence"]
            ),

        "violations":
            int(
                best["violations"]
            ),

        "violations_prevented":
            int(
                violations_prevented
            )
    }
