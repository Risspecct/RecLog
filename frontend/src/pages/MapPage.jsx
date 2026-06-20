import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";

function MapPage(){

return(

<div className="bg-slate-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-10">

<Navbar/>

<div className="mt-10">

<MapComponent/>

</div>

</div>

</div>

)

}

export default MapPage;