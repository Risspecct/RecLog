from app.services.data_service import get_dataset
from app.models.enums import RootCause


def get_root_cause_distribution():

    df = get_dataset()

    distribution = (
        df.groupby("root_cause")
        .size()
        .reset_index(name="count")
        .sort_values("count", ascending=False)
    )

    return distribution.to_dict(orient="records")


def get_enforcement_tier_distribution():

    df = get_dataset()

    distribution = (
        df.groupby("enforcement_tier")
        .size()
        .reset_index(name="count")
        .sort_values("count", ascending=False)
    )

    return distribution.to_dict(orient="records")


def get_dashboard_insights():

    df = get_dataset()

    top_hotspot = df.loc[df["priority_score"].idxmax()]

    return {
        "highest_priority_hotspot": top_hotspot["hotspot_name"],
        "highest_priority_score": round(
            float(top_hotspot["priority_score"]), 2
        ),

        "critical_hotspots": int((df["enforcement_tier"] == "Critical").sum()),

        "most_common_root_cause": (df["root_cause"]
                                   .value_counts()
                                   .idxmax()
                                   ),

        "most_common_violation": (df["dominant_violation"]
                                  .value_counts()
                                  .idxmax()
                                  ),

        "avg_pcri": round(
            float(df["PCRI"].mean()),
            2
        )
    }


def get_hotspots_by_root_cause(root_cause: RootCause, limit: int = 50):
    df = get_dataset()

    filtered = df[df["root_cause"].str.lower() == root_cause.lower()]

    return (
        filtered
        .sort_values(
            "priority_score",
            ascending=False
        )
        .head(limit)
        .to_dict(orient="records")
    )


def get_recommendations():

    df = get_dataset()

    recommendations = (df[["root_cause", "recommendation"]]
                       .drop_duplicates()
                       .sort_values("root_cause")
                       )

    return recommendations.to_dict(orient="records")
