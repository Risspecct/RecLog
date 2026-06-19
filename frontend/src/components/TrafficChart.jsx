import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", violations: 4200 },
  { day: "Tue", violations: 5100 },
  { day: "Wed", violations: 4700 },
  { day: "Thu", violations: 6000 },
  { day: "Fri", violations: 7500 },
  { day: "Sat", violations: 8000 },
];

function TrafficChart() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Weekly Traffic Violations
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="day"/>
          <YAxis/>
          <Tooltip/>
          <Area
            type="monotone"
            dataKey="violations"
            stroke="#4F46E5"
            fill="#C7D2FE"
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TrafficChart;