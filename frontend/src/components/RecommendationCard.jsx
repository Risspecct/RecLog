import { useEffect, useState } from "react";
import api from "../services/api";

function RecommendationCard(){

const [recommendations,setRecommendations]=useState([]);

useEffect(()=>{

api.get("/analytics/recommendations")
.then((response)=>{

setRecommendations(response.data);

})
.catch(console.log);

},[]);

return(

<div className="bg-white rounded-3xl shadow-sm p-8">

<h2 className="text-xl font-semibold mb-6">
Recommendations
</h2>

<div className="space-y-5">

{

recommendations.slice(0,4).map((item,index)=>(

<div
key={index}
className="border-l-4 border-indigo-500 pl-4"
>

<h3 className="font-semibold text-slate-800">

{item.root_cause}

</h3>

<p className="text-slate-500 mt-1">

{item.recommendation}

</p>

</div>

))

}

</div>

</div>

)

}

export default RecommendationCard;