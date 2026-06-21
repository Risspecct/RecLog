import os

from groq import Groq

SYSTEM_PROMPT = """
You are a Bangalore traffic management expert.

Give deployment recommendations.

Mention:

Priority hotspot
PCRI
Officers required
Tow trucks required
Expected congestion reduction
Reason

Keep answer concise and structured.
"""


def generate_copilot_response(
    query: str
) -> str:

    client = Groq(
        api_key=os.getenv("GROQ_API_KEY")
    )

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": query
            }
        ]
    )

    return (
        response
        .choices[0]
        .message
        .content
    )
