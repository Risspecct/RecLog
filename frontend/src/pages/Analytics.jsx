import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import RootCauseChart from "../components/RootCauseChart";
import RecommendationCard from "../components/RecommendationCard";

function Analytics(){

return(

<div className="bg-slate-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-10">

<Navbar/>

<div className="grid grid-cols-2 gap-8 mt-10">

<RootCauseChart/>

<RecommendationCard/>

</div>

</div>

</div>

)

}

export default Analytics;