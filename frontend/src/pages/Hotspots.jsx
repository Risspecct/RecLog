import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function Hotspots() {

const [hotspots,setHotspots]=useState([]);

useEffect(()=>{

api.get("/hotspots?limit=50")
.then((response)=>{

setHotspots(response.data);

})
.catch(console.log);

},[]);

return(

<div className="bg-slate-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-10">

<Navbar
title="Hotspots"
subtitle="Explore and analyze traffic hotspots"
/>

<div className="bg-white rounded-3xl shadow-sm p-8 mt-10">

<h2 className="text-2xl font-semibold mb-6">

Top Hotspots

</h2>

<table className="w-full">

<thead>

<tr className="text-slate-500 border-b">

<th className="pb-4 text-left">
Hotspot
</th>

<th className="pb-4 text-left">
PCRI
</th>

<th className="pb-4 text-left">
Tier
</th>

</tr>

</thead>

<tbody>

{
hotspots.map((spot)=>(

<tr
key={spot.h3_cell}
className="border-b hover:bg-slate-50"
>

<td className="py-4">

{spot.hotspot_name.split(",")[0]}

</td>

<td>

{spot.PCRI.toFixed(2)}

</td>

<td>

<span className={`px-3 py-1 rounded-full text-sm

${spot.enforcement_tier==="Critical"
?"bg-red-100 text-red-600"
:"bg-orange-100 text-orange-600"}

`}>

{spot.enforcement_tier}

</span>

</td>

</tr>

))
}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Hotspots;