from app.services.data_service import get_dataset


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
