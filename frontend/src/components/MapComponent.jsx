import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import api from "../services/api";

import "leaflet/dist/leaflet.css";

function MapComponent(){

const [hotspots,setHotspots]=useState([]);

useEffect(()=>{

api.get("/hotspots/top-priority?limit=20")
.then((response)=>{

setHotspots(response.data);

})
.catch(console.log);

},[]);

return(

<div className="bg-white rounded-3xl shadow-sm p-8">

<h1 className="text-2xl font-bold mb-8">

Bangalore Hotspot Map

</h1>

<MapContainer
center={[12.9716,77.5946]}
zoom={11}
style={{height:"700px"}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{
hotspots.map((spot)=>(

<Marker
position={[spot.center_lat,spot.center_lon]}
key={spot.h3_cell}
>

<Popup>

<h1 className="font-bold">

{spot.hotspot_name.split(",")[0]}

</h1>

<p>PCRI : {spot.PCRI.toFixed(2)}</p>

<p>Priority Score : {spot.priority_score.toFixed(2)}</p>

<p>Confidence : {spot.confidence.toFixed(1)}%</p>

<p>{spot.enforcement_tier}</p>

</Popup>

</Marker>

))
}

</MapContainer>

</div>

)

}

export default MapComponent;