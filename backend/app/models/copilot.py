from pydantic import BaseModel


class CopilotRequest(BaseModel):
    query: str


class CopilotResponse(BaseModel):
    answer: str
