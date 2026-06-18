from pydantic import BaseModel


class RootCauseDistributionResponse(BaseModel):
    root_cause: str
    count: int
