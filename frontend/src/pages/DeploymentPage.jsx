import { useState } from "react";
import Sidebar from "../components/Sidebar";

function DeploymentPage() {

  const [officers, setOfficers] = useState(20);
  const [tow, setTow] = useState(5);

  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Deployment Engine
        </h1>

        <div className="bg-white p-10 rounded-3xl shadow-sm">

          <input
            type="number"
            value={officers}
            onChange={(e)=>setOfficers(Number(e.target.value))}
            className="border p-3 mr-5 rounded-xl"
          />

          <input
            type="number"
            value={tow}
            onChange={(e)=>setTow(Number(e.target.value))}
            className="border p-3 rounded-xl"
          />

          <div className="mt-10">

            <table className="w-full">

              <thead>

                <tr>

                  <th>Hotspot</th>
                  <th>Officers</th>
                  <th>Tow Trucks</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>KR Puram</td>
                  <td>{Math.floor(officers*0.4)}</td>
                  <td>{Math.ceil(tow*0.4)}</td>

                </tr>

                <tr>

                  <td>Marathahalli</td>
                  <td>{Math.floor(officers*0.3)}</td>
                  <td>{Math.ceil(tow*0.3)}</td>

                </tr>

                <tr>

                  <td>Gandhi Nagar</td>
                  <td>{Math.floor(officers*0.3)}</td>
                  <td>{Math.ceil(tow*0.3)}</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DeploymentPage;