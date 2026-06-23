import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import { useEffect, useState } from "react";

function ZoomHandler({ setZoom }) {
  useMapEvents({
    zoomend(e) {
      setZoom(e.target.getZoom());
    },
  });

  return null;
}

function MapPage() {

  const [hotspots, setHotspots] = useState([]);
  const [filteredHotspots, setFilteredHotspots] = useState([]);
  const [selectedTier, setSelectedTier] = useState("All");
  const [zoom, setZoom] = useState(11);

  useEffect(() => {

    api
      .get("/hotspots?limit=500")
      .then((response) => {

        setHotspots(response.data);
        setFilteredHotspots(response.data);

      })
      .catch(console.log);

  }, []);

  useEffect(() => {

    if (selectedTier === "All") {

      setFilteredHotspots(hotspots);

    }

    else {

      setFilteredHotspots(

        hotspots.filter(
          (spot) =>
            spot.enforcement_tier === selectedTier
        )

      );

    }

  }, [selectedTier, hotspots]);



  function getColor(tier) {

    switch (tier) {

      case "Critical":
        return "#ef4444";

      case "High":
        return "#f97316";

      case "Medium":
        return "#eab308";

      case "Low":
        return "#22c55e";

      default:
        return "#64748b";

    }

  }



  function getRadius(tier) {

    let baseRadius = 4;

    if (zoom >= 13)
      baseRadius = 6;

    if (zoom >= 15)
      baseRadius = 7;

    if (tier === "Critical")
      return baseRadius + 1;

    return baseRadius;

  }



  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-72 p-10">

        <Navbar
          title="Traffic Map"
          subtitle="Visualize Bengaluru traffic hotspots"
        />



        {/* FILTER */}

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8 flex justify-between items-center">

          <div>

            <h2 className="text-xl font-bold">

              Hotspot Filters

            </h2>

            <p className="text-slate-500 mt-1">

              Select which tier to visualize

            </p>

          </div>

          <select

            value={selectedTier}

            onChange={(e) =>
              setSelectedTier(e.target.value)
            }

            className="
            px-5
            py-3
            rounded-2xl
            border
            outline-none
            "

          >

            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>

          </select>

        </div>



        {/* MAP + LEGEND */}

        <div className="grid grid-cols-4 gap-8 mt-8">

          {/* MAP */}

          <div className="col-span-3 bg-white rounded-3xl shadow-sm overflow-hidden">

            <MapContainer

              center={[12.9716, 77.5946]}
              zoom={11}
              style={{ height: "750px" }}

            >

              <ZoomHandler setZoom={setZoom} />

              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {

                filteredHotspots.map((spot) => (

                  <CircleMarker

                    key={spot.h3_cell}

                    center={[
                      spot.center_lat,
                      spot.center_lon
                    ]}

                    radius={getRadius(
                      spot.enforcement_tier
                    )}

                    color={getColor(
                      spot.enforcement_tier
                    )}

                    fillColor={getColor(
                      spot.enforcement_tier
                    )}

                    fillOpacity={0.75}

                    weight={2}

                  >

                    <Popup>

                      <div className="space-y-2 w-64">

                        <h1 className="font-bold text-lg">

                          {
                            spot.hotspot_name
                              .split(",")[0]
                          }

                        </h1>

                        <p>

                          PCRI :
                          {" "}
                          {spot.PCRI.toFixed(2)}

                        </p>

                        <p>

                          Priority Score :
                          {" "}
                          {spot.priority_score.toFixed(2)}

                        </p>

                        <p>

                          Confidence :
                          {" "}
                          {spot.confidence.toFixed(0)}%

                        </p>

                        <p>

                          Tier :
                          {" "}
                          {spot.enforcement_tier}

                        </p>

                      </div>

                    </Popup>

                  </CircleMarker>

                ))

              }

            </MapContainer>

          </div>



          {/* SIDE PANEL */}

          <div className="space-y-6">

            {/* LEGEND */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <h1 className="font-bold text-xl mb-7">

                Map Legend

              </h1>

              <div className="space-y-6">

                <div className="flex items-center gap-4">

                  <div className="w-5 h-5 rounded-full bg-red-500"></div>

                  <span>Critical Hotspots</span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-5 h-5 rounded-full bg-orange-500"></div>

                  <span>High Priority</span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-5 h-5 rounded-full bg-yellow-400"></div>

                  <span>Medium Risk</span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-5 h-5 rounded-full bg-green-500"></div>

                  <span>Low Risk</span>

                </div>

              </div>

            </div>



            {/* COUNT CARD */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <h1 className="font-bold text-xl mb-5">

                Visible Hotspots

              </h1>

              <h1 className="text-5xl font-bold text-indigo-600">

                {filteredHotspots.length}

              </h1>

              <p className="text-slate-500 mt-3">

                Displayed on map

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MapPage;