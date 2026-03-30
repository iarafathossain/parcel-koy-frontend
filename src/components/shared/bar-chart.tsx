"use client";

import { ChartData } from "@/types/dashboard-stats-type";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: ChartData["bar"]["data"];
}

const BarChartComponent = ({ data }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="date"
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: "12px" }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: "12px" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          cursor={{ fill: "hsl(var(--muted))/20" }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="delivered" fill="#16a34a" radius={[4, 4, 0, 0]} />
        <Bar dataKey="cancelled" fill="#dc2626" radius={[4, 4, 0, 0]} />
        <Bar dataKey="failed" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
