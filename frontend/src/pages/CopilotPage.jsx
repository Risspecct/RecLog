import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useState } from "react";

function CopilotPage(){

const [query,setQuery]=useState("");
const [answer,setAnswer]=useState("");
const [loading,setLoading]=useState(false);

async function generate() {

  setLoading(true);

  try {

    const response = await api.post(
      "/copilot/chat",
      {
        message: query
      }
    );

    setAnswer(response.data.answer);

  }

  catch (err) {

    console.log(err);

  }

  setLoading(false);

}

return(

<div className="bg-slate-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-10">

<Navbar/>

<div className="bg-white p-10 rounded-3xl shadow-md mt-10">

<h1 className="text-3xl font-bold mb-8">

AI Traffic Copilot

</h1>

<textarea

className="w-full border rounded-2xl p-5 h-40"

placeholder="Ask anything about traffic congestion, parking violations, enforcement operations, or resource allocation..."

value={query}

onChange={(e)=>setQuery(e.target.value)}

/>

<button

onClick={generate}

className="bg-indigo-600 text-white px-8 py-4 rounded-2xl mt-6"

>

Generate Deployment Plan

</button>

{

loading &&

<div className="mt-6">

Generating...

</div>

}

{

answer &&

<div className="bg-slate-50 rounded-3xl p-8 mt-10 shadow-sm">

<h1 className="text-2xl font-bold mb-5">

Generated Deployment Plan

</h1>

<div className="whitespace-pre-wrap leading-8 text-gray-700">

{answer}

</div>

</div>

}

</div>

</div>

</div>

)

}

export default CopilotPage;