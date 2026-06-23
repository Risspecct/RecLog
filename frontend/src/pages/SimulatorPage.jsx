import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import {
  Search,
  Shield,
  TrendingUp,
  BadgeAlert,
  Brain
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function SimulatorPage() {

  const [query, setQuery] = useState("");
  const [hotspot, setHotspot] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [days, setDays] = useState(7);

  const [hotspots, setHotspots] = useState([]);

  const [scenarios, setScenarios] = useState([]);
  const [best, setBest] = useState(null);

  const [copilot, setCopilot] = useState("");
  const [loadingCopilot, setLoadingCopilot] = useState(false);

  // fetch hotspot names
  useEffect(() => {

    api.get("/hotspots")
      .then((res) => {

        const names = res.data.map(
          (item) => item.hotspot_name
        );

        setHotspots(names);

      })
      .catch(console.log);

  }, []);

  // fetch simulation results
  useEffect(() => {

    if (!hotspot) return;

    api.post("/simulation/dashboard", {
      hotspot_name: hotspot,
      days
    })
      .then((res) => setScenarios(res.data))
      .catch(console.log);

    api.post("/simulation/best-strategy", {
      hotspot_name: hotspot,
      days
    })
      .then((res) => setBest(res.data))
      .catch(console.log);

    setLoadingCopilot(true);

    api.post("/copilot", {
      hotspot_name: hotspot
    })
      .then((res) => {

        setCopilot(res.data.answer);

      })
      .catch(console.log)
      .finally(() => {

        setLoadingCopilot(false);

      });

  }, [hotspot, days]);



  const filteredHotspots =
    hotspots
      .filter((name) =>
        name.toLowerCase().includes(
          query.toLowerCase()
        )
      )
      .slice(0, 8);



  const graphData = scenarios.map((item) => ({

    name:
      item.scenario +
      "-" +
      item.intervention,

    PCRI:
      item.projected_pcri

  }));



  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-72 p-10">

        <h1 className="text-5xl font-bold mb-3">

          Impact Simulator

        </h1>

        <p className="text-slate-500 mb-10 text-lg">

          Evaluate intervention strategies before deployment

        </p>



        <div className="bg-white rounded-3xl shadow-sm p-10">



          {/* SEARCH + DAYS */}

          <div className="flex gap-10 mb-12 items-start">

            <div className="w-[70%] relative">

              <p className="text-slate-500 font-semibold mb-3">

                Search Hotspot

              </p>

              <div className="relative">

                <Search
                  size={22}
                  className="absolute left-5 top-5 text-slate-400"
                />

                <input
                  type="text"
                  value={query}
                  placeholder="Search any locality..."
                  onChange={(e) => {

                    setQuery(e.target.value);
                    setShowSuggestions(true);

                  }}
                  className="
                  w-full
                  rounded-3xl
                  border-2
                  p-5
                  pl-14
                  text-lg
                  outline-none
                  "
                />

              </div>

              {

                showSuggestions &&
                query.length > 0 &&
                filteredHotspots.length > 0 &&

                <div
                  className="
                  absolute
                  top-28
                  w-full
                  bg-white
                  rounded-3xl
                  shadow-xl
                  max-h-64
                  overflow-y-auto
                  z-50
                  "
                >

                  {

                    filteredHotspots.map((item, index) => (

                      <div
                        key={index}
                        onClick={() => {

                          setHotspot(item);
                          setQuery(item);
                          setShowSuggestions(false);

                        }}
                        className="
                        p-5
                        cursor-pointer
                        hover:bg-slate-100
                        "
                      >

                        {item}

                      </div>

                    ))

                  }

                </div>

              }

            </div>



            <div className="w-[30%]">

              <p className="text-slate-500 font-semibold mb-3">

                Days

              </p>

              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) =>
                  setDays(Number(e.target.value))
                }
                className="w-full"
              />

              <h1 className="font-bold text-3xl mt-4">

                {days} Days

              </h1>

            </div>

          </div>



          {/* BEST STRATEGY CARDS */}

          {

            best &&

            <div className="grid grid-cols-4 gap-6 mb-16">

              <div className="bg-indigo-50 rounded-3xl p-6 min-h-[170px]">

                <Shield className="mb-4 text-indigo-600" />

                <p className="text-slate-500 mb-2">

                  Best Strategy

                </p>

                <h1 className="font-bold text-2xl text-indigo-600 break-words">

                  {best.best_strategy.replaceAll("_", " ")}

                </h1>

              </div>



              <div className="bg-green-50 rounded-3xl p-6 min-h-[170px]">

                <TrendingUp className="mb-4 text-green-600" />

                <p className="text-slate-500 mb-2">

                  Projected PCRI

                </p>

                <h1 className="text-5xl font-bold text-green-600">

                  {best.projected_pcri}

                </h1>

              </div>



              <div className="bg-red-50 rounded-3xl p-6 min-h-[170px]">

                <BadgeAlert className="mb-4 text-red-500" />

                <p className="text-slate-500 mb-2">

                  Violations Prevented

                </p>

                <h1 className="text-5xl font-bold text-red-500">

                  {best.violations_prevented}

                </h1>

              </div>



              <div className="bg-yellow-50 rounded-3xl p-6 min-h-[170px]">

                <Brain className="mb-4 text-yellow-600" />

                <p className="text-slate-500 mb-2">

                  Confidence

                </p>

                <h1 className="text-5xl font-bold">

                  {best.confidence}%

                </h1>

              </div>

            </div>

          }



          {/* GRAPH */}

          {

            scenarios.length > 0 &&

            <>

              <h2 className="text-4xl font-bold mb-8">

                PCRI Comparison

              </h2>

              <ResponsiveContainer width="100%" height={400}>

                <BarChart data={graphData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="PCRI" fill="#4F46E5" />

                </BarChart>

              </ResponsiveContainer>

            </>

          }



          {/* SCENARIOS */}

          {

            scenarios.length > 0 &&

            <>

              <h2 className="text-4xl font-bold mt-16 mb-8">

                Scenario Analysis

              </h2>

              <div className="space-y-5">

                {

                  scenarios.map((item, index) => (

                    <div
                      key={index}
                      className="
                      bg-slate-50
                      rounded-3xl
                      p-6
                      shadow-sm
                      "
                    >

                      <div className="grid grid-cols-4">

                        <div>

                          <h1 className="font-bold text-xl capitalize">

                            {item.scenario}

                          </h1>

                          <p className="text-slate-500 capitalize">

                            {
                              item.intervention
                                .replaceAll("_", " ")
                            }

                          </p>

                        </div>

                        <div>

                          <p className="text-slate-500">

                            PCRI

                          </p>

                          <h1 className="font-bold text-2xl">

                            {item.projected_pcri}

                          </h1>

                        </div>

                        <div>

                          <p className="text-slate-500">

                            Impact

                          </p>

                          <h1 className="font-bold text-red-500">

                            {item.impact}

                          </h1>

                        </div>

                        <div>

                          <p className="text-slate-500">

                            Confidence

                          </p>

                          <h1 className="font-bold">

                            {item.confidence}%

                          </h1>

                        </div>

                      </div>

                    </div>

                  ))

                }

              </div>

            </>

          }



          {/* AI COPILOT */}

          {

            hotspot &&

            <div className="mt-20">

              <h1 className="text-4xl font-bold mb-8">

                AI Copilot Insights

              </h1>

              {

                loadingCopilot ?

                  <div
                    className="
                    bg-indigo-50
                    rounded-3xl
                    p-10
                    text-lg
                    text-slate-600
                    "
                  >

                    Generating AI insights...

                  </div>

                  :

                  copilot &&

                  <div
                    className="
                    bg-gradient-to-r
                    from-indigo-50
                    to-blue-50
                    rounded-3xl
                    shadow-sm
                    p-10
                    whitespace-pre-wrap
                    leading-8
                    text-slate-700
                    "
                  >

                    {copilot}

                  </div>

              }

            </div>

          }

        </div>

      </div>

    </div>

  );

}

export default SimulatorPage;