import { useEffect, useState } from "react";
import api from "../services/api";

function TopHotspotsTable() {

  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {

    api.get("/hotspots/top-priority?limit=5")
      .then((response) => {
        setHotspots(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-5 text-gray-800">
        Top Priority Hotspots
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-gray-500 text-sm">

              <th className="text-left pb-3">
                Hotspot
              </th>

              <th className="text-left pb-3">
                PCRI
              </th>

              <th className="text-left pb-3">
                Tier
              </th>

            </tr>
          </thead>

          <tbody>

            {hotspots.map((hotspot) => (

              <tr
                key={hotspot.h3_cell}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 pr-4">

                  <div className="font-medium text-gray-700">

                    {hotspot.hotspot_name.split(",")[0]}

                  </div>

                </td>

                <td className="text-gray-600">

                  {hotspot.PCRI.toFixed(2)}

                </td>

                <td>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                    {hotspot.enforcement_tier}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TopHotspotsTable;