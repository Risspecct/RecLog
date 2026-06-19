import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

const data = [
  {
    name:"Demand Overflow",
    value:35
  },
  {
    name:"Road Capacity",
    value:20
  },
  {
    name:"Heavy Vehicle",
    value:25
  },
  {
    name:"General Parking",
    value:20
  }
];

const COLORS = [
"#4F46E5",
"#10B981",
"#F59E0B",
"#EF4444"
];

function RootCauseChart(){

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
fill={COLORS[index]}
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