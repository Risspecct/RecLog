from pydantic import BaseModel


class DashboardSummaryResponse(BaseModel):
    total_hotspots: int
    critical_hotspots: int
    high_hotspots: int
    total_violations: int
    avg_pcri: float
    top_hotspot: str
    top_hotspot_pcri: float
