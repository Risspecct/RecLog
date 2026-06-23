import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TrafficChart from "../components/TrafficChart";
import RootCauseChart from "../components/RootCauseChart";
import TopHotspotsTable from "../components/TopHotspotsTable";
import RecommendationCard from "../components/RecommendationCard";
import RiskMeter from "../components/RiskMeter";
import IncidentTimeline from "../components/IncidentTimeline";

function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        api
            .get("/dashboard/summary")
            .then((response) => {

                setData(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    if (!data) {

        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-100">
                <h1 className="text-xl font-semibold text-slate-600">
                    Loading Dashboard...
                </h1>
            </div>
        );

    }

    return (

        <div className="bg-slate-100 min-h-screen overflow-x-hidden">

            <Sidebar />

            <div className="ml-64 p-8 overflow-x-hidden">

                <Navbar
                    title="Dashboard"
                    subtitle="Bangalore Traffic Intelligence Overview"
                />


                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">


                    <SummaryCard
                        title="Total Hotspots"
                        value={data.total_hotspots}
                        description="Total number of traffic hotspots identified from historical patterns."
                    />

                    <SummaryCard
                        title="Critical Hotspots"
                        value={data.critical_hotspots}
                        description="Regions requiring immediate intervention."
                    />

                    <SummaryCard
                        title="Total Violations"
                        value={data.total_violations}
                        description="Aggregate traffic violations across Bangalore."
                    />

                    <SummaryCard
                        title="Average PCRI"
                        value={data.avg_pcri}
                        description="Average Priority Congestion Risk Index."
                    />

                </div>



                {/* Charts Section */}

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-10">

                    <div className="lg:col-span-2">

                        <TrafficChart />

                    </div>

                    <RootCauseChart />

                </div>
                <div className="mt-10">
                    <RiskMeter />
                </div>
                <div className="mt-10">
                    <IncidentTimeline />
                </div>


                {/* Table Section */}

                <div className="mt-10">

                    <TopHotspotsTable />

                </div>

                {/* Recommendations Section */}
                <div className="grid grid-cols-3 gap-8 mt-10">

                    <RecommendationCard
                        location="KR Puram"
                        pcri="52.3"
                        confidence="92"
                        officers="7"
                        reduction="15"
                    />
                    <RecommendationCard
                        location="Gandhi Nagar"
                        pcri="47.2"
                        confidence="89"
                        officers="5"
                        reduction="11"
                    />




                    <RecommendationCard
                        location="Marathahalli"
                        pcri="50.1"
                        confidence="86"
                        officers="6"
                        reduction="14"
                    />

                </div>
            </div>

        </div>

    );

}

export default Dashboard;