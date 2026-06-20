function IncidentTimeline(){

const incidents=[

"08:10 AM - KR Puram congestion spike",
"09:30 AM - Marathahalli overflow",
"10:15 AM - Gandhi Nagar parking violation",
"11:05 AM - Shivaji Nagar blockage"

]

return(

<div className="bg-white rounded-3xl p-8 shadow-md">

<h2 className="font-semibold text-xl mb-8">

Today's Incidents

</h2>

{

incidents.map((item,index)=>(

<div
key={index}
className="border-l-4 border-indigo-500 pl-4 mb-6"
>

{item}

</div>

))

}

</div>

)

}

export default IncidentTimeline;