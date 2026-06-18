from app.services.data_service import get_dataset


def get_dashboard_summary():

    df = get_dataset()

    return {
        "total_hotspots": len(df),

        "critical_hotspots":
            int((df["enforcement_tier"] == "Critical").sum()),

        "high_hotspots":
            int((df["enforcement_tier"] == "High").sum()),

        "total_violations":
            int(df["violations"].sum()),

        "avg_pcri":
            round(df["PCRI"].mean(), 2),

        "top_hotspot":
            df.sort_values(
                "priority_score",
                ascending=False
            ).iloc[0]["hotspot_name"],

        "top_hotspot_pcri":
            float(
                df.sort_values(
                    "priority_score",
                    ascending=False
                ).iloc[0]["PCRI"]
            )
    }
