import { useEffect, useState } from "react";
import api from "../services/api";

import {
PieChart,
Pie,
Cell,
Tooltip
} from "recharts";

const COLORS = [
"#6366F1",
"#10B981",
"#F59E0B",
"#EF4444"
];

function RootCauseChart(){

const [data,setData]=useState([]);

useEffect(()=>{

api.get("/analytics/root-causes")
.then((response)=>{

const formatted=response.data.map((item)=>({

name:item.root_cause,
value:item.count

}));

setData(formatted);

})
.catch(console.log);

},[]);

return(

<div className="bg-white rounded-3xl shadow-sm p-8">

<h2 className="text-xl font-semibold mb-8">
Root Cause Distribution
</h2>

<PieChart width={350} height={300}>

<Pie
data={data}
dataKey="value"
outerRadius={100}
label
>

{
data.map((entry,index)=>(

<Cell
key={index}
fill={COLORS[index%4]}
/>

))
}

</Pie>

<Tooltip/>

</PieChart>

</div>

)

}

export default RootCauseChart;