import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Hotspots() {

    const [hotspots, setHotspots] = useState([]);
    const [filteredHotspots, setFilteredHotspots] = useState([]);

    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [loading, setLoading] = useState(false);

    const [selectedHotspot, setSelectedHotspot] = useState(null);

    useEffect(() => {

        fetchHotspots();

    }, [filter]);

    useEffect(() => {

        let temp = [...hotspots];

        if (filter !== "All") {

            temp = temp.filter(
                (spot) =>
                    spot.enforcement_tier === filter
            );

        }

        if (search.trim() !== "") {

            temp = temp.filter((spot) =>
                spot.hotspot_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        setFilteredHotspots(temp);

    }, [hotspots, filter, search]);



    async function fetchHotspots() {

        setLoading(true);

        try {

            let url = "/hotspots?limit=100";

            if (filter !== "All") {
                url += `&tier=${filter}`;
            }

            const response = await api.get(url);

            setHotspots(response.data);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    }



    function getCardColor(tier) {

        switch (tier) {

            case "Critical":
                return "bg-red-50";

            case "High":
                return "bg-orange-50";

            case "Medium":
                return "bg-yellow-50";

            case "Low":
                return "bg-green-50";

            default:
                return "bg-slate-50";

        }

    }



    function getTextColor(tier) {

        switch (tier) {

            case "Critical":
                return "text-red-600";

            case "High":
                return "text-orange-600";

            case "Medium":
                return "text-yellow-700";

            case "Low":
                return "text-green-600";

            default:
                return "text-slate-600";

        }

    }



    const suggestions = hotspots
        .filter((spot) =>
            spot.hotspot_name
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .slice(0, 6);



    return (

        <div className="bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="ml-64 p-10">

                <Navbar
                    title="Hotspots"
                    subtitle="Explore and analyze traffic hotspots"
                />



                <div className="bg-white rounded-3xl shadow-sm p-8 mt-10">

                    <div className="flex justify-between items-center mb-10">

                        <div className="relative w-[450px]">

                            <input
                                type="text"
                                placeholder="Search hotspot..."
                                value={search}
                                onChange={(e) => {

                                    setSearch(e.target.value);
                                    setShowSuggestions(true);

                                }}
                                className="
                w-full
                p-4
                rounded-2xl
                border
                outline-none
                "
                            />



                            {

                                showSuggestions &&
                                search.length > 0 &&
                                suggestions.length > 0 &&

                                <div
                                    className="
                  absolute
                  top-16
                  bg-white
                  shadow-lg
                  rounded-2xl
                  w-full
                  z-50
                  overflow-hidden
                  "
                                >

                                    {

                                        suggestions.map((spot) => (

                                            <div
                                                key={spot.h3_cell}
                                                onClick={() => {

                                                    setSearch(
                                                        spot.hotspot_name
                                                    );

                                                    setShowSuggestions(false);

                                                }}
                                                className="
                        p-4
                        cursor-pointer
                        hover:bg-slate-100
                        "
                                            >

                                                {

                                                    spot.hotspot_name
                                                        .split(",")[0]

                                                }

                                            </div>

                                        ))

                                    }

                                </div>

                            }

                        </div>



                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value)
                            }
                            className="
              px-5
              py-4
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



                    {

                        loading ?

                            <div className="text-center text-slate-500 py-20">

                                Loading hotspots...

                            </div>

                            :

                            <div className="grid grid-cols-2 gap-6">
                                {

                                    filteredHotspots.map((spot) => (

                                        <div
                                            key={spot.h3_cell}
                                            className={`
                      ${getCardColor(spot.enforcement_tier)}
                      rounded-3xl
                      p-7
                      shadow-sm
                      `}
                                        >

                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h2 className="font-bold text-xl mb-3">

                                                        {spot.hotspot_name.split(",")[0]}

                                                    </h2>

                                                    <p className="text-slate-500 text-sm">

                                                        {spot.hotspot_name}

                                                    </p>

                                                </div>

                                                <span
                                                    className={`
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          bg-white
                          ${getTextColor(spot.enforcement_tier)}
                          `}
                                                >

                                                    {spot.enforcement_tier}

                                                </span>

                                            </div>



                                            <div className="grid grid-cols-3 gap-4 mt-8">

                                                <div>

                                                    <p className="text-slate-500 text-sm">

                                                        PCRI

                                                    </p>

                                                    <h1 className="font-bold text-3xl">

                                                        {spot.PCRI.toFixed(1)}

                                                    </h1>

                                                </div>



                                                <div>

                                                    <p className="text-slate-500 text-sm">

                                                        Priority Score

                                                    </p>

                                                    <h1 className="font-bold text-3xl">

                                                        {spot.priority_score.toFixed(1)}

                                                    </h1>

                                                </div>



                                                <div>

                                                    <p className="text-slate-500 text-sm">

                                                        Confidence

                                                    </p>

                                                    <h1 className="font-bold text-3xl">

                                                        {spot.confidence.toFixed(0)}%

                                                    </h1>

                                                </div>

                                            </div>



                                            <button
                                                onClick={() =>
                                                    setSelectedHotspot(spot)
                                                }
                                                className="
                        mt-8
                        bg-white
                        px-6
                        py-3
                        rounded-2xl
                        shadow-sm
                        font-semibold
                        hover:bg-slate-100
                        transition
                        "
                                            >

                                                View Details

                                            </button>

                                        </div>

                                    ))

                                }

                            </div>

                    }

                </div>

            </div>



            {

                selectedHotspot &&

                <div
                    className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          "
                >

                    <div
                        className="
            bg-white
            rounded-3xl
            p-10
            w-[700px]
            shadow-xl
            "
                    >

                        <div className="flex justify-between items-center mb-8">

                            <h1 className="text-3xl font-bold">

                                Hotspot Details

                            </h1>

                            <button
                                onClick={() =>
                                    setSelectedHotspot(null)
                                }
                                className="
                bg-slate-100
                px-4
                py-2
                rounded-xl
                "
                            >

                                Close

                            </button>

                        </div>



                        <div className="space-y-6">

                            <div>

                                <p className="text-slate-500">

                                    Hotspot Name

                                </p>

                                <h2 className="font-semibold text-lg">

                                    {selectedHotspot.hotspot_name}

                                </h2>

                            </div>



                            <div className="grid grid-cols-2 gap-8">

                                <div>

                                    <p className="text-slate-500">

                                        PCRI

                                    </p>

                                    <h1 className="font-bold text-4xl">

                                        {selectedHotspot.PCRI.toFixed(2)}

                                    </h1>

                                </div>



                                <div>

                                    <p className="text-slate-500">

                                        Priority Score

                                    </p>

                                    <h1 className="font-bold text-4xl">

                                        {selectedHotspot.priority_score.toFixed(2)}

                                    </h1>

                                </div>



                                <div>

                                    <p className="text-slate-500">

                                        Confidence

                                    </p>

                                    <h1 className="font-bold text-4xl">

                                        {selectedHotspot.confidence.toFixed(1)}%

                                    </h1>

                                </div>



                                <div>

                                    <p className="text-slate-500">

                                        Tier

                                    </p>

                                    <h1
                                        className={`
                    font-bold
                    text-3xl
                    ${getTextColor(
                                            selectedHotspot.enforcement_tier
                                        )}
                    `}
                                    >

                                        {selectedHotspot.enforcement_tier}

                                    </h1>

                                </div>

                            </div>



                            <div>

                                <p className="text-slate-500">

                                    H3 Cell

                                </p>

                                <h2 className="font-semibold">

                                    {selectedHotspot.h3_cell}

                                </h2>

                            </div>



                            <div>

                                <p className="text-slate-500">

                                    Coordinates

                                </p>

                                <h2 className="font-semibold">

                                    {selectedHotspot.center_lat.toFixed(6)},
                                    {" "}
                                    {selectedHotspot.center_lon.toFixed(6)}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}

export default Hotspots;
