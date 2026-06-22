from fastapi import APIRouter

from app.models.copilot import CopilotRequest, ChatRequest, CopilotResponse
from app.services.copilot_service import generate_copilot_response, generate_chat_response

router = APIRouter(
    prefix="/copilot",
    tags=["Copilot"]
)


@router.post(    "", response_model=CopilotResponse)
def copilot(request: CopilotRequest):
    answer = generate_copilot_response(request.hotspot_name)
    return CopilotResponse(answer=answer)


@router.post("/chat", response_model=CopilotResponse)
def chat(
    request: ChatRequest
):

    answer = generate_chat_response(
        request.message
    )

    return CopilotResponse(
        answer=answer
    )
