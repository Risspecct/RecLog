import InfoTooltip from "./InfoTooltip";
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
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">
          Traffic Violations Over the Week
        </h2>
        <InfoTooltip text="This chart shows the number of traffic violations recorded each day over the past week." />
      </div>

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