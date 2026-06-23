# 🚦 RecLog — AI-Powered Traffic Intelligence & Resource Optimization Platform

> Transforming traffic violations into actionable intelligence.

RecLog is an AI-driven traffic intelligence platform built to help city administrators identify congestion hotspots, forecast future traffic risks, optimize resource deployment, and generate operational strategies using natural language.

Built for **Flipkart Gridlock 2.0**, RecLog addresses one of Bengaluru's most persistent challenges: **parking-induced traffic congestion**.

---

## 🌟 Problem Statement

Bengaluru is among the world's most congested cities, with commuters losing significant hours annually due to traffic delays.

A major contributor is **illegal and unregulated parking**, which:

* Reduces effective road capacity
* Creates bottlenecks near junctions
* Blocks transit hubs and metro stations
* Delays emergency response vehicles
* Increases congestion ripple effects across the network

Current enforcement systems are largely reactive and depend heavily on manual monitoring.

---

# 💡 Our Solution

RecLog converts raw traffic violation data into intelligent operational recommendations.

The platform enables authorities to:

✅ Identify high-risk congestion hotspots

✅ Prioritize interventions using a custom risk index

✅ Simulate future traffic conditions

✅ Optimize deployment of officers and tow trucks

✅ Generate AI-powered action plans

## 📸 Platform Showcase

### Traffic Intelligence Dashboard

![Dashboard](images/dashboard.png)

*Real-time city-wide traffic monitoring with KPI cards, congestion analytics, root-cause analysis, and live incident feeds.*

---

### Geospatial Hotspot Intelligence

![Hotspot Map](images/hotspot-map.png)

*Interactive H3-powered hotspot visualization with PCRI risk scoring and congestion prioritization.*

---

### AI Traffic Copilot

![AI Copilot](images/copilot.png)

*Natural-language decision support for resource allocation and operational planning.*

---

### What-If Impact Simulator

![Simulator](images/simulator.png)

*Evaluate traffic interventions and forecast congestion reduction before deployment.*

# 🏗️ RecLog Architecture

```mermaid
flowchart LR

A[Traffic Violations Data] --> B[Data Processing]

B --> C[PCRI Engine]

C --> D[Hotspot Detection]
C --> E[Dashboard Analytics]
C --> F[Simulation Engine]

F --> G[Scenario Modelling]

D --> H[Resource Allocation]

G --> I[Explainability Layer]
H --> I

I --> J[AI Traffic Copilot]

J --> K[Deployment Recommendations]

K --> L[Traffic Authorities]
```

# 🧠 Priority Congestion Risk Index (PCRI)

At the heart of RecLog lies the **Priority Congestion Risk Index (PCRI)**.

Unlike traditional approaches that only count violations, PCRI evaluates multiple dimensions of traffic risk.

### PCRI Factors

| Component          | Weight |
| ------------------ | ------ |
| Spatial Density    | 35%    |
| Violation Severity | 20%    |
| Vehicle Impact     | 15%    |
| Repeat Offenders   | 15%    |
| Road Criticality   | 15%    |

### Output

PCRI generates a score between **0 and 100**.

Higher PCRI indicates:

* Greater congestion risk
* Higher enforcement priority
* Increased resource requirements

---

# 📊 Features

## 1️⃣ Real-Time Traffic Intelligence Dashboard

Provides a city-wide operational overview including:

* Total Hotspots
* Critical Hotspots
* Traffic Violations
* Average PCRI
* Weekly Violation Trends
* Root Cause Analysis
* Live Incident Feed

---

## 2️⃣ Geospatial Hotspot Mapping

Powered by H3 indexing and interactive GIS visualization.

Features:

* Interactive hotspot map
* Severity-based risk coloring
* Location-specific telemetry
* Critical area identification

---

## 3️⃣ Semantic Hotspot Search

Instantly search and filter hundreds of hotspots.

Capabilities:

* Fuzzy matching
* Real-time filtering
* Fast pagination
* Risk-based sorting

---

## 4️⃣ AI Traffic Copilot

Interact with traffic intelligence using natural language.

### Example Query

"I have 20 officers and 3 tow trucks. Where should I deploy them on a rainy Friday?"

### AI Output

* Priority hotspot ranking
* Officer allocation plans
* Tow truck deployment schedules
* Predicted congestion reduction

---

## 5️⃣ Resource Allocation Engine

Automatically converts PCRI scores into deployment recommendations.

| Risk Tier | Officers | Tow Trucks | Patrol Frequency |
| --------- | -------- | ---------- | ---------------- |
| Critical  | 6        | 3          | Every 15 min     |
| High      | 4        | 2          | Every 30 min     |
| Medium    | 2        | 1          | Every 1 hour     |
| Low       | 1        | 0          | Every 4 hours    |

---

## 6️⃣ What-If Impact Simulator

Evaluate interventions before deploying resources.

Supported Scenarios:

* Normal Conditions
* Rain
* Festival Traffic
* Extra Enforcement
* Traffic Diversion

Outputs:

* Predicted violations
* Projected PCRI
* Reduction efficiency
* Confidence score

---

# 🤖 AI Components

### AI Traffic Copilot

* Llama 3.1
* Groq API

### Predictive Simulation

* Poisson Distribution-Based Forecasting
* Scenario Modeling
* Risk Projection

### Decision Intelligence

* Rule-Based Tactical Recommendations
* Explainable Resource Allocation

---

# ⚙️ Tech Stack

### Frontend

* React
* Vite
* TailwindCSS
* React Leaflet
* Recharts

### Backend

* FastAPI
* Pydantic
* Pandas
* NumPy
* Scikit-Learn

### AI

* Groq
* Llama 3.1

### Geospatial

* OpenStreetMap
* H3 Spatial Indexing

---

# 📈 Impact

RecLog enables:

* Faster hotspot identification

* Smarter resource utilization

* Reduced traffic congestion

* Data-driven enforcement

* Predictive traffic planning

* Improved incident response

---

# 🔮 Future Roadmap

* Live CCTV Integration
* IoT Traffic Sensors
* Computer Vision-Based Violation Detection
* Reinforcement Learning Optimization
* Congestion Forecasting Models
* Smart City Integration

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone <repo-url>
cd RecLog
```

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 👥 Team
Zion
* Rishik Garg
* Disha Kaushal
* Trisha Soni
* Shresth Agarwal

Built for Flipkart Gridlock 2.0

RecLog — From Traffic Data to Smarter Decisions.
