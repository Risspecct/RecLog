from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq  # type: ignore[import]
import os

router = APIRouter()



class Prompt(BaseModel):
    query:str


@router.post("/copilot")
def copilot(prompt:Prompt):
    client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

    system_prompt = """

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

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[

            {
                "role":"system",
                "content":system_prompt
            },

            {
                "role":"user",
                "content":prompt.query
            }

        ]

    )

    return {

        "answer":
        response.choices[0].message.content

    }