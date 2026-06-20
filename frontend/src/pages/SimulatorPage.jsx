import { useState } from "react";
import Sidebar from "../components/Sidebar";

function SimulatorPage() {

  const [strength, setStrength] = useState(50);

  const current = 56;

  const predicted = current * (1 - strength/150);

  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-10">

        <h1 className="text-4xl font-bold mb-10">

          Impact Simulator

        </h1>

        <div className="bg-white rounded-3xl p-10 shadow-sm">

          <input
            type="range"
            min="0"
            max="100"
            value={strength}
            onChange={(e)=>setStrength(Number(e.target.value))}
            className="w-full"
          />

          <h1 className="mt-10 text-xl">
            Current PCRI : 56
          </h1>

          <h1 className="text-xl mt-4">
            Predicted PCRI : {predicted.toFixed(2)}
          </h1>

          <h1 className="text-xl mt-4">
            Reduction :
            {((56-predicted)/56*100).toFixed(1)}%
          </h1>

        </div>

      </div>

    </div>

  );

}

export default SimulatorPage;