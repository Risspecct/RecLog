import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TrafficChart from "../components/TrafficChart";
import RootCauseChart from "../components/RootCauseChart";
import TopHotspotsTable from "../components/TopHotspotsTable";

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

        <div className="bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="ml-64 p-10">

                <Navbar />

                {/* Summary Cards */}

                <div className="grid grid-cols-4 gap-7 mt-10">

                    <SummaryCard
                        title="Total Hotspots"
                        value={data.total_hotspots}
                    />

                    <SummaryCard
                        title="Critical Hotspots"
                        value={data.critical_hotspots}
                    />

                    <SummaryCard
                        title="Total Violations"
                        value={data.total_violations}
                    />

                    <SummaryCard
                        title="Average PCRI"
                        value={data.avg_pcri}
                    />

                </div>


                {/* Charts Section */}

                <div className="grid grid-cols-3 gap-8 mt-10">

                    <div className="col-span-2">

                        <TrafficChart />

                    </div>

                    <RootCauseChart />

                </div>


                {/* Table Section */}

                <div className="mt-10">

                    <TopHotspotsTable />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;