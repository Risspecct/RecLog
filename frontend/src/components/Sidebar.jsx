import {
  LayoutDashboard,
  MapPinned,
  BarChart3
} from "lucide-react";

function Sidebar() {

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed">

      <div className="p-8 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          RecLog
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Traffic Intelligence Platform
        </p>

      </div>

      <div className="mt-10 space-y-3 px-5">

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">

          <LayoutDashboard size={20}/>
          Dashboard

        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">

          <MapPinned size={20}/>
          Hotspots

        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">

          <BarChart3 size={20}/>
          Analytics

        </div>

      </div>

    </div>
  )

}

export default Sidebar