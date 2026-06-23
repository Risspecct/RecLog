
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function DeploymentPage() {

  const [location, setLocation] = useState("");
  const [hotspots, setHotspots] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [officers, setOfficers] = useState(20);
  const [towTrucks, setTowTrucks] = useState(5);

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);



  useEffect(() => {

    fetchHotspots();

  }, []);



  async function fetchHotspots() {

    try {

      const response = await api.get(
        "/simulation/hotspots"
      );

      setHotspots(response.data);

    }

    catch (err) {

      console.log(err);

    }

  }



  const suggestions = hotspots
    .filter((item) =>
      item.toLowerCase().includes(
        location.toLowerCase()
      )
    )
    .slice(0, 6);



  async function generatePlan() {

    if (!location) {

      alert("Select a location");
      return;

    }

    setLoading(true);

    try {

      const response = await api.post(
        "/simulation/resources",
        {
          hotspot_name: location,
          days: 7
        }
      );

      setPlan(response.data);

    }

    catch (err) {

      console.log(err);

      alert("Unable to generate deployment plan");

    }

    setLoading(false);

  }



  function downloadReport() {

    if (!plan) return;

    const report = `

TRAFFIC DEPLOYMENT PLAN

Location:
${location}

Risk Tier:
${plan.risk_tier}

Recommended Officers:
${plan.officers}

Tow Trucks:
${plan.tow_trucks}

Patrol Interval:
${plan.patrol_interval}

`;

    const blob = new Blob(
      [report],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "deployment_plan.txt";

    a.click();

  }



  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-10">

        <Navbar
          title="Deployment Engine"
          subtitle="Generate police deployment plans"
        />



        <div className="bg-white rounded-3xl p-10 mt-10 shadow-sm">

          <h1 className="text-3xl font-bold mb-10">

            Resource Planner

          </h1>



          <div className="relative">

            <p className="text-slate-500 mb-3">

              Hotspot Location

            </p>

            <input
              value={location}
              onChange={(e) => {

                setLocation(e.target.value);
                setShowSuggestions(true);

              }}
              className="
              w-full
              border
              rounded-2xl
              p-4
              outline-none
              "
              placeholder="Search hotspot..."
            />



            {

              showSuggestions &&
              location.length > 0 &&
              suggestions.length > 0 &&

              <div className="
              absolute
              bg-white
              shadow-xl
              rounded-2xl
              mt-2
              w-full
              z-50
              overflow-hidden
              ">

                {

                  suggestions.map((item, index) => (

                    <div
                      key={index}
                      className="
      p-4
      hover:bg-slate-100
      cursor-pointer
      border-b
      last:border-b-0
    "
                      onClick={() => {
                        setLocation(item);
                        setShowSuggestions(false);
                      }}
                    >

                      <div className="font-medium text-slate-800">

                        {item.split(",")[0]}

                      </div>

                      <div className="text-sm text-slate-500 mt-1">

                        {item}

                      </div>

                    </div>

                  ))

                }

              </div>

            }

          </div>



          <div className="grid grid-cols-2 gap-8 mt-8">

            <div>

              <p className="text-slate-500 mb-3">

                Available Officers

              </p>

              <input
                type="number"
                value={officers}
                onChange={(e) =>
                  setOfficers(Number(e.target.value))
                }
                className="
                w-full
                border
                rounded-2xl
                p-4
                "
              />

            </div>



            <div>

              <p className="text-slate-500 mb-3">

                Available Tow Trucks

              </p>

              <input
                type="number"
                value={towTrucks}
                onChange={(e) =>
                  setTowTrucks(Number(e.target.value))
                }
                className="
                w-full
                border
                rounded-2xl
                p-4
                "
              />

            </div>

          </div>



          <button

            onClick={generatePlan}

            className="
            bg-indigo-600
            text-white
            px-8
            py-4
            rounded-2xl
            mt-10
            "

          >

            Generate Plan

          </button>

        </div>



        {

          loading &&

          <div className="mt-10 text-slate-500">

            Generating deployment plan...

          </div>

        }



        {

          plan &&

          <div className="grid grid-cols-4 gap-6 mt-10">

            <div className="
            bg-white
            border-l-4
            border-red-500
            rounded-3xl
            p-8
            shadow-sm">

              <p className="text-slate-500">

                Risk Tier

              </p>

              <h1 className="text-3xl font-bold mt-4">

                {plan.risk_tier}

              </h1>

            </div>



            <div className="
            bg-white
            border-l-4
            border-blue-500
            rounded-3xl
            p-8
            shadow-sm">

              <p className="text-slate-500">

                Officers Needed

              </p>

              <h1 className="text-3xl font-bold mt-4">

                {plan.officers}

              </h1>

            </div>



            <div className="
            bg-white
            border-l-4
            border-orange-500
            rounded-3xl
            p-8
            shadow-sm">

              <p className="text-slate-500">

                Tow Trucks

              </p>

              <h1 className="text-3xl font-bold mt-4">

                {plan.tow_trucks}

              </h1>

            </div>



            <div className="
            bg-white
            border-l-4
            border-green-500
            rounded-3xl
            p-8
            shadow-sm">

              <p className="text-slate-500">

                Patrol Interval

              </p>

              <h1 className="text-3xl font-bold mt-4">

                {plan.patrol_interval}

              </h1>

            </div>

          </div>

        }



        {

          plan &&

          <div className="
          bg-white
          rounded-3xl
          p-8
          mt-8
          shadow-sm">

            <h2 className="text-2xl font-bold mb-6">

              Deployment Summary

            </h2>

            <div className="space-y-4 text-slate-700">

              <p>

                📍 Location:
                {" "}
                {location.split(",")[0]}

              </p>

              <p>

                👮 Deploy
                {" "}
                <b>{plan.officers}</b>
                {" "}
                officers

              </p>

              <p>

                🚚 Allocate
                {" "}
                <b>{plan.tow_trucks}</b>
                {" "}
                tow trucks

              </p>

              <p>

                ⏱ Patrol every
                {" "}
                <b>{plan.patrol_interval}</b>

              </p>

            </div>



            <button

              onClick={downloadReport}

              className="
              bg-slate-900
              text-white
              px-8
              py-4
              rounded-2xl
              mt-8
              "

            >

              Download Deployment Plan

            </button>

          </div>

        }

      </div>

    </div>

  );

}

export default DeploymentPage;
