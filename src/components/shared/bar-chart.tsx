"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData } from "@/types/dashboard-stats-type";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: ChartData["bar"]["data"];
}

const chartConfig = {
  total: { label: "Total", color: "#2563eb" },
  delivered: { label: "Delivered", color: "#16a34a" },
  cancelled: { label: "Cancelled", color: "#dc2626" },
  failed: { label: "Failed", color: "#f59e0b" },
} as const;

const BarChartComponent = ({ data }: BarChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tickMargin={10}
            tick={{ fill: "hsl(var(--foreground))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            width={40}
            tickMargin={10}
            tick={{ fill: "hsl(var(--foreground))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            style={{ fontSize: "12px" }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dashed"
                labelFormatter={(label) => `Date: ${label}`}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="delivered" fill="#16a34a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="cancelled" fill="#dc2626" radius={[4, 4, 0, 0]} />
          <Bar dataKey="failed" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BarChartComponent;
