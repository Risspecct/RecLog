from app.simulation.generator import (
    simulate_hotspot
)

df = simulate_hotspot(
    hotspot_name="<one hotspot name>",
    days=7,
    scenario="festival",
    intervention="none"
)

print(len(df))
print(df.head())
