function TopHotspotsTable(){

const hotspots=[
{
location:"Kempe Gowda Circle",
pcri:46.9,
tier:"Critical"
},
{
location:"Koramangala",
pcri:41,
tier:"Critical"
},
{
location:"Bellandur",
pcri:37,
tier:"High"
}
]

return(

<div className="bg-white rounded-3xl p-8 shadow-sm">

<h2 className="text-xl font-semibold mb-6">
Top Priority Hotspots
</h2>

<table className="w-full">

<thead className="text-slate-500">

<tr>

<th>Location</th>
<th>PCRI</th>
<th>Tier</th>

</tr>

</thead>

<tbody>

{
hotspots.map((item,index)=>(

<tr
key={index}
className="border-t h-16"
>

<td>{item.location}</td>

<td>{item.pcri}</td>

<td>

<span className="bg-red-100 text-red-600 px-3 py-2 rounded-xl">

{item.tier}

</span>

</td>

</tr>

))
}

</tbody>

</table>

</div>

)

}

export default TopHotspotsTable;