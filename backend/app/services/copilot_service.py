import os

from groq import Groq

from app.simulation.simulation_service import get_hotspot_for_simulation
from app.simulation.dashboard import scenario_dashboard
from app.simulation.recommendation import best_intervention, recommend_resources

MODEL = "llama-3.1-8b-instant"

SIMULATION_DAYS = 7

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """
You are an AI traffic operations assistant for Bengaluru traffic authorities.

Your responsibility is to explain the outputs produced by the simulation engine.

You MUST ONLY use the information provided in the simulation results.

Do NOT:
- Invent statistics
- Invent hotspot details
- Invent interventions
- Invent resource plans
- Add recommendations that are not present in the simulation results

Your response must follow this structure exactly:

CURRENT SITUATION
• Brief summary of hotspot risk level
• Mention current PCRI and priority level if available

SCENARIO INSIGHTS
• Identify the highest-risk scenario
• Identify the most effective intervention
• Briefly compare the alternatives

RECOMMENDED ACTION
• State the selected intervention
• Explain why it outperforms the alternatives

RESOURCE PLAN
• Risk tier
• Officers required
• Tow trucks required
• Patrol interval

EXPECTED IMPACT
• Projected PCRI
• Violations prevented
• Expected operational benefit

Rules:
- Use bullet points.
- Keep each section concise.
- Use only the supplied simulation data.
- Do not include markdown formatting.
- Do not repeat information unnecessarily.
- Keep the response operational and actionable.
"""

GENERAL_PROMPT = """
You are an intelligent traffic management assistant.

You answer questions about:

- Traffic congestion
- Illegal parking
- Parking violations
- Enforcement operations
- Resource allocation
- Urban mobility
- Smart city traffic systems

Provide practical and concise explanations.

If a user asks about hotspot simulations or intervention analysis,
inform them that simulation analysis is available through the
simulation endpoint.
"""


def generate_llm_response(system_prompt: str, user_prompt: str) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    return (
        response
        .choices[0]
        .message
        .content
    )


def build_simulation_context(
    hotspot_name,
    hotspot,
    dashboard,
    best,
    resources
):

    dashboard_summary = "\n".join(
        [
            (
                f"Scenario={row['scenario']}, "
                f"Intervention={row['intervention']}, "
                f"Projected_PCRI={row['projected_pcri']}, "
                f"Impact={row['impact']}, "
                f"Violations={row['violations']}"
            )
            for row in dashboard
        ]
    )

    return f"""
IMPORTANT

All information required for the analysis is contained below.

Do not use outside knowledge.
Do not generate additional assumptions.

HOTSPOT

Name:
{hotspot_name}

CURRENT METRICS

PCRI:
{round(float(hotspot["PCRI"]), 2)}

Priority Score:
{round(float(hotspot["priority_score"]), 2)}

Confidence:
{round(float(hotspot["confidence"]), 2)}

Historical Violations:
{int(hotspot["violations"])}

SCENARIO COMPARISON

{dashboard_summary}

RECOMMENDED STRATEGY

Strategy:
{best["best_strategy"]}

Projected PCRI:
{best["projected_pcri"]}

Impact:
{best["impact"]}

Confidence:
{best["confidence"]}

Expected Violations:
{best["violations"]}

Violations Prevented:
{best["violations_prevented"]}

RESOURCE PLAN

Risk Tier:
{resources["risk_tier"]}

Officers:
{resources["officers"]}

Tow Trucks:
{resources["tow_trucks"]}

Patrol Interval:
{resources["patrol_interval"]}
"""


def generate_copilot_response(
    hotspot_name: str
) -> str:

    hotspot = get_hotspot_for_simulation(
        hotspot_name
    )

    if hotspot is None:
        return "Hotspot not found."

    dashboard = scenario_dashboard(
        hotspot_name=hotspot_name,
        days=SIMULATION_DAYS
    )

    if dashboard is None:
        return "Unable to generate simulation dashboard."

    best = best_intervention(
        dashboard
    )

    if best is None:
        return "Unable to determine a recommended intervention."

    resources = recommend_resources(
        best["projected_pcri"]
    )

    context = build_simulation_context(
        hotspot_name=hotspot_name,
        hotspot=hotspot,
        dashboard=dashboard,
        best=best,
        resources=resources
    )

    return generate_llm_response(
        SYSTEM_PROMPT,
        context
    )


def generate_chat_response(
    message: str
) -> str:

    return generate_llm_response(
        GENERAL_PROMPT,
        message
    )
