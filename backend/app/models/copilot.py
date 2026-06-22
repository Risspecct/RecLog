from pydantic import BaseModel


class CopilotRequest(BaseModel):
    hotspot_name: str


class CopilotResponse(BaseModel):
    answer: str
