import InfoTooltip from "./InfoTooltip";

function RiskMeter() {

  return (

    <div className="bg-white rounded-3xl shadow-md p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="font-semibold text-xl">
          City Congestion Risk
        </h2>

        <InfoTooltip
          text="Represents overall congestion severity. Higher percentages indicate greater traffic pressure across the city."
        />

      </div>

      <div className="w-full h-5 bg-slate-200 rounded-full">

        <div
          className="h-5 rounded-full bg-red-500"
          style={{ width: "72%" }}
        />

      </div>

      <h1 className="mt-5 text-3xl font-bold text-red-500">
        72%
      </h1>

      <p className="text-gray-500">
        High Congestion Alert
      </p>

    </div>

  );

}

export default RiskMeter;