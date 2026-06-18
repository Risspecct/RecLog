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
