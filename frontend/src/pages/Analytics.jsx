import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HeatZoneCard from "../components/HeatZoneCard";

function Analytics(){

return(

<div className="bg-slate-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-10">

<Navbar/>

<div className="grid grid-cols-3 gap-8 mt-10">

<HeatZoneCard
area="KR Puram"
level="Extreme"
/>

<HeatZoneCard
area="Marathahalli"
level="High"
/>

<HeatZoneCard
area="Gandhi Nagar"
level="Critical"
/>

</div>

</div>

</div>

)

}

export default Analytics;