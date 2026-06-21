import { useState } from "react";
import Sidebar from "../components/Sidebar";

import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer

} from "recharts";

function SimulatorPage() {

  const [strength, setStrength] = useState(50);

  const current = 56;

  const predicted = current * (1 - strength / 150);

  const graphData = [

    {
      name: "PCRI",
      Current: current,
      Predicted: predicted
    }

  ];

  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Impact Simulator
        </h1>

        <p className="text-slate-500 mb-10">

          Simulate congestion reduction before deployment

        </p>

        <div className="bg-white rounded-3xl p-10 shadow-sm">

          <h2 className="text-xl font-semibold">

            Intervention Strength

          </h2>

          <input
            type="range"
            min="0"
            max="100"
            value={strength}
            onChange={(e)=>setStrength(Number(e.target.value))}
            className="w-full mt-6"
          />

          <div className="grid grid-cols-3 gap-8 mt-10">

            <div>

              <p className="text-slate-500">
                Current PCRI
              </p>

              <h1 className="text-4xl font-bold text-red-500">

                56

              </h1>

            </div>

            <div>

              <p className="text-slate-500">
                Predicted PCRI
              </p>

              <h1 className="text-4xl font-bold text-green-600">

                {predicted.toFixed(1)}

              </h1>

            </div>

            <div>

              <p className="text-slate-500">
                Reduction
              </p>

              <h1 className="text-4xl font-bold text-indigo-600">

                {((56-predicted)/56*100).toFixed(1)}%

              </h1>

            </div>

          </div>

          <div className="mt-14">

            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={graphData}>

                <XAxis dataKey="name"/>

                <YAxis/>

                <Tooltip/>

                <Bar
                  dataKey="Current"
                  fill="#EF4444"
                />

                <Bar
                  dataKey="Predicted"
                  fill="#10B981"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SimulatorPage;