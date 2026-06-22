from pydantic import BaseModel


class CopilotRequest(BaseModel):
    hotspot_name: str


class ChatRequest(BaseModel):
    message: str


class CopilotResponse(BaseModel):
    answer: str
