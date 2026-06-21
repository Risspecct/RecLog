import {
LayoutDashboard,
MapPinned,
Bot,
Shield,
Gauge
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar(){

return(

<div className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white z-50">

<div className="p-8 border-b border-slate-700">

<h1 className="text-2xl font-bold">
RecLog
</h1>

<p className="text-slate-400 text-sm mt-1">
Traffic Intelligence Platform
</p>

</div>

<div className="mt-10 px-5 space-y-3">

<Link to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
  <LayoutDashboard size={20}/>
  Dashboard
</Link>

<Link to="/hotspots" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
  <MapPinned size={20}/>
  Hotspots
</Link>

<Link to="/map" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
  <MapPinned size={20}/>
  Hotspot Map
</Link>

<Link to="/copilot" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
  <Bot size={20}/>
  AI Copilot
</Link>

<Link to="/deployment" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
  <Shield size={20}/>
  Deployment Engine
</Link>

<Link to="/simulator" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
  <Gauge size={20}/>
  Impact Simulator
</Link>

</div>

</div>

)

}

export default Sidebar;