import InfoTooltip from "./InfoTooltip";

function RecommendationCard({
  location,
  pcri,
  confidence,
  officers,
  reduction
}) {

  return (

    <div className="bg-white rounded-3xl shadow-md p-6">

      <div className="flex items-center justify-between">

        <h2 className="font-bold text-xl text-slate-800">
          {location}
        </h2>

        <InfoTooltip
          text="AI-generated deployment recommendation based on PCRI and expected congestion reduction."
        />

      </div>

      <p className="mt-3 text-gray-500">
        PCRI : {pcri}
      </p>

      <p className="text-gray-500">
        Confidence : {confidence}%
      </p>

      <div className="mt-5">

        <p className="font-semibold">
          Recommended Deployment
        </p>

        <p>
          {officers} officers
        </p>

      </div>

      <div className="mt-5">

        <p className="font-bold text-green-600">
          Expected Reduction
        </p>

        <p>
          {reduction}%
        </p>

      </div>

    </div>

  );

}

export default RecommendationCard;