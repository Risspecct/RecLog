import { useState } from "react";
import Sidebar from "../components/Sidebar";

function CopilotPage() {

  const [answer, setAnswer] = useState("");

  function generate() {

    setAnswer(`
1. KR Puram

Deploy 8 officers

Reason:
Highest PCRI

Expected reduction:
18%

2. Gandhi Nagar

Deploy 5 officers

Expected reduction:
11%
`);

  }

  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-10">

        <h1 className="text-4xl font-bold mb-10">
          AI Copilot
        </h1>

        <div className="bg-white rounded-3xl p-10 shadow-sm">

          <textarea
            className="border w-full p-5 h-40 rounded-xl"
            placeholder="I have 20 officers and 5 tow trucks. Where should I deploy them?"
          />

          <button
            onClick={generate}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl mt-6"
          >
            Generate Plan
          </button>

          <pre className="mt-8 whitespace-pre-wrap">
            {answer}
          </pre>

        </div>

      </div>

    </div>

  );

}

export default CopilotPage;