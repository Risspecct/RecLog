from fastapi import APIRouter

from app.models.copilot import (
    CopilotRequest,
    CopilotResponse
)

from app.services.copilot_service import (
    generate_copilot_response
)

router = APIRouter(
    prefix="/copilot",
    tags=["Copilot"]
)


@router.post(
    "",
    response_model=CopilotResponse
)
def copilot(
    request: CopilotRequest
):

    answer = generate_copilot_response(
        request.hotspot_name
    )

    return CopilotResponse(
        answer=answer
    )
