import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function SimulatorPage() {

  const [hotspot, setHotspot] = useState("Marathahalli");

  const [days, setDays] = useState(7);

  const [scenarios, setScenarios] = useState([]);

  const [best, setBest] = useState(null);

  useEffect(() => {

    api.post("/simulation/dashboard", {
      hotspot_name: hotspot,
      days: days
    })
      .then((res) => setScenarios(res.data))
      .catch(console.log);

    api.post("/simulation/best-strategy", {
      hotspot_name: hotspot,
      days: days
    })
      .then((res) => setBest(res.data))
      .catch(console.log);

  }, [hotspot, days]);

  const graphData = scenarios.map((item) => ({
    name:
      item.scenario +
      "\n" +
      item.intervention,

    PCRI: item.projected_pcri
  }));

  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Impact Simulator
        </h1>

        <p className="text-slate-500 mb-10">
          Evaluate intervention strategies before deployment
        </p>

        <div className="bg-white rounded-3xl shadow-sm p-10">

          <div className="flex gap-8 mb-8">

            <div>

              <p className="text-slate-500 mb-2">
                Hotspot
              </p>

              <select
                value={hotspot}
                onChange={(e) => setHotspot(e.target.value)}
                className="border p-3 rounded-xl"
              >
                <option>Marathahalli</option>
                <option>KR Puram</option>
                <option>Gandhi Nagar</option>
              </select>

            </div>

            <div>

              <p className="text-slate-500 mb-2">
                Days
              </p>

              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />

              <p className="mt-2">{days} days</p>

            </div>

          </div>

          {best && (

            <div className="grid grid-cols-4 gap-8">

              <div>

                <p className="text-slate-500">
                  Best Strategy
                </p>

                <h1 className="font-bold text-xl text-indigo-600">
                  {best.best_strategy}
                </h1>

              </div>

              <div>

                <p className="text-slate-500">
                  Projected PCRI
                </p>

                <h1 className="font-bold text-green-600 text-2xl">
                  {best.projected_pcri}
                </h1>

              </div>

              <div>

                <p className="text-slate-500">
                  Confidence
                </p>

                <h1 className="font-bold text-2xl">
                  {best.confidence}%
                </h1>

              </div>

              <div>

                <p className="text-slate-500">
                  Violations Prevented
                </p>

                <h1 className="font-bold text-red-500 text-2xl">
                  {best.violations_prevented}
                </h1>

              </div>

            </div>

          )}

          <div className="mt-12">

            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={graphData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="PCRI"
                  fill="#4F46E5"
                />

              </BarChart>

            </ResponsiveContainer>
            <div className="mt-12">

              <h2 className="text-2xl font-bold mb-6">
                Scenario Analysis
              </h2>

              <div className="space-y-4">

                {

                  scenarios.map((item, index) => (

                    <div
                      key={index}
                      className="border rounded-2xl p-5 bg-slate-50"
                    >

                      <div className="flex justify-between">

                        <div>

                          <h2 className="font-bold text-lg">

                            {item.scenario}

                          </h2>

                          <p className="text-slate-500">

                            {item.intervention}

                          </p>

                        </div>

                        <div>

                          <p className="text-sm text-slate-500">
                            PCRI
                          </p>

                          <h2 className="text-xl font-bold">

                            {item.projected_pcri}

                          </h2>

                        </div>

                        <div>

                          <p className="text-sm text-slate-500">
                            Impact
                          </p>

                          <h2 className="font-bold text-red-500">

                            {item.impact}

                          </h2>

                        </div>

                        <div>

                          <p className="text-sm text-slate-500">
                            Confidence
                          </p>

                          <h2 className="font-bold">

                            {item.confidence}%

                          </h2>

                        </div>

                      </div>

                    </div>

                  ))

                }

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SimulatorPage;