import { useState } from "react";
import Sidebar from "../components/Sidebar";

function DeploymentPage() {

  const [officers, setOfficers] = useState(20);
  const [tow, setTow] = useState(5);

  const allocations = [

    {
      location: "KR Puram",
      officers: Math.floor(officers * 0.4),
      tow: Math.ceil(tow * 0.4),
      reduction: 18
    },

    {
      location: "Marathahalli",
      officers: Math.floor(officers * 0.3),
      tow: Math.ceil(tow * 0.3),
      reduction: 13
    },

    {
      location: "Gandhi Nagar",
      officers: Math.floor(officers * 0.3),
      tow: Math.ceil(tow * 0.3),
      reduction: 10
    }

  ];

  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Deployment Engine
        </h1>

        <p className="text-slate-500 mb-8">
          Smart allocation of resources across critical hotspots
        </p>

        <div className="bg-white p-8 rounded-3xl shadow-sm">

          <div className="flex gap-6">

            <div>

              <p className="text-sm text-slate-500 mb-2">
                Available Officers
              </p>

              <input
                type="number"
                value={officers}
                onChange={(e)=>setOfficers(Number(e.target.value))}
                className="border p-3 rounded-xl"
              />

            </div>

            <div>

              <p className="text-sm text-slate-500 mb-2">
                Tow Trucks
              </p>

              <input
                type="number"
                value={tow}
                onChange={(e)=>setTow(Number(e.target.value))}
                className="border p-3 rounded-xl"
              />

            </div>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-7 mt-10">

          {

            allocations.map((item)=>(

              <div
                key={item.location}
                className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg transition"
              >

                <h1 className="text-2xl font-bold text-slate-800">

                  {item.location}

                </h1>

                <div className="mt-8 space-y-4">

                  <div>

                    <p className="text-slate-500 text-sm">
                      Officers
                    </p>

                    <h2 className="text-2xl font-bold">
                      {item.officers}
                    </h2>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Tow Trucks
                    </p>

                    <h2 className="text-2xl font-bold">
                      {item.tow}
                    </h2>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Expected Reduction
                    </p>

                    <h2 className="text-green-600 text-xl font-bold">

                      -{item.reduction}%

                    </h2>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default DeploymentPage;