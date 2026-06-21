from pydantic import BaseModel, Field


class SimulationDashboardRequest(BaseModel):
    hotspot_name: str

    days: int = Field(
        default=7,
        ge=1,
        le=30
    )


class SimulationDashboardResponse(BaseModel):
    hotspot: str
    days: int

    current_pcri: float
    current_priority_score: float
    current_confidence: float

    historical_violations: int
