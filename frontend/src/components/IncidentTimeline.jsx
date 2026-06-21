import InfoTooltip from "./InfoTooltip";

function IncidentTimeline() {

  const incidents = [

    "08:10 AM - KR Puram congestion spike",
    "09:30 AM - Marathahalli overflow",
    "10:15 AM - Gandhi Nagar parking violation",
    "11:05 AM - Shivaji Nagar blockage"

  ];

  return (

    <div className="bg-white rounded-3xl p-8 shadow-md">

      <div className="flex justify-between items-center mb-8">

        <h2 className="font-semibold text-xl">
          Today's Incidents
        </h2>

        <InfoTooltip
          text="Chronological view of recent traffic events and incidents used for situational awareness."
        />

      </div>

      {

        incidents.map((item, index) => (

          <div
            key={index}
            className="border-l-4 border-indigo-500 pl-4 mb-6"
          >

            {item}

          </div>

        ))

      }

    </div>

  );

}

export default IncidentTimeline;