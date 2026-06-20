function HeatZoneCard({
area,
level
}){

return(

<div className="bg-white rounded-3xl p-6 shadow-md">

<h2 className="font-bold text-xl">

{area}

</h2>

<p className="mt-4 text-red-500">

{level}

</p>

</div>

)

}

export default HeatZoneCard;