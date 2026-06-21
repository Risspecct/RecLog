from pydantic import BaseModel, Field


class SimulationDashboardRequest(BaseModel):
    hotspot_name: str

    days: int = Field(
        default=7,
        ge=1,
        le=30
    )
