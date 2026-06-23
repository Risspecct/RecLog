import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import api from "../services/api";

function MapPage() {

    const [hotspots, setHotspots] = useState([]);

    useEffect(() => {

        api
            .get("/hotspots/top-priority?limit=20")
            .then((response) => {

                setHotspots(response.data);

            });

    }, []);

    return (

        <div className="bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="ml-64 p-10">

                <Navbar
                    title="Traffic Map"
                    subtitle="Visualize congestion and enforcement zones"
                />

                <div className="grid grid-cols-4 gap-8 mt-10">

                    {/* MAP */}

                    <div className="col-span-3 bg-white rounded-3xl shadow-md overflow-hidden">

                        <MapContainer
                            center={[12.9716, 77.5946]}
                            zoom={11}
                            style={{ height: "700px" }}
                        >

                            <TileLayer
                                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {

                                hotspots.map((spot) => (

                                    <CircleMarker
                                        key={spot.h3_cell}
                                        center={[spot.center_lat, spot.center_lon]}
                                        radius={10}
                                        color="red"
                                        fillOpacity={0.7}
                                    >

                                        <Popup>

                                            <div className="space-y-2">

                                                <h1 className="font-bold">

                                                    {spot.hotspot_name.split(",")[0]}

                                                </h1>

                                                <p>

                                                    PCRI :
                                                    {" "}
                                                    {spot.PCRI.toFixed(2)}

                                                </p>

                                                <p>

                                                    Confidence :
                                                    {" "}
                                                    {spot.confidence.toFixed(0)}%

                                                </p>

                                                <p>

                                                    Priority Score :
                                                    {" "}
                                                    {spot.priority_score.toFixed(1)}

                                                </p>

                                                <p>

                                                    Tier :
                                                    {" "}
                                                    {spot.enforcement_tier}

                                                </p>

                                                <p>

                                                    Recommended officers :
                                                    {" "}
                                                    {Math.ceil(spot.PCRI / 7)}

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

                        <div className="bg-white rounded-3xl p-8 shadow-md">

                            <h1 className="font-bold text-xl mb-6">

                                Live Summary

                            </h1>

                            <div className="space-y-5">

                                <div>

                                    <p className="text-gray-500">

                                        Active Hotspots

                                    </p>

                                    <h1 className="text-3xl font-bold">

                                        {hotspots.length}

                                    </h1>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        Critical Areas

                                    </p>

                                    <h1 className="text-3xl font-bold text-red-500">

                                        14

                                    </h1>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        Avg PCRI

                                    </p>

                                    <h1 className="text-3xl font-bold">

                                        48.5

                                    </h1>

                                </div>

                            </div>

                        </div>



                        <div className="bg-white rounded-3xl p-8 shadow-md">

                            <h1 className="font-bold text-xl mb-6">

                                Suggested Deployment

                            </h1>

                            <div className="space-y-5">

                                <div>

                                    <h2 className="font-semibold">

                                        KR Puram

                                    </h2>

                                    <p className="text-gray-500">

                                        Deploy 8 officers

                                    </p>

                                </div>

                                <div>

                                    <h2 className="font-semibold">

                                        Gandhi Nagar

                                    </h2>

                                    <p className="text-gray-500">

                                        Deploy 5 officers

                                    </p>

                                </div>

                                <div>

                                    <h2 className="font-semibold">

                                        Marathahalli

                                    </h2>

                                    <p className="text-gray-500">

                                        Deploy 6 officers

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default MapPage;