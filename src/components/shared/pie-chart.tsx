"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData } from "@/types/dashboard-stats-type";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface PieChartProps {
  data: ChartData["pie"]["data"];
  total: number;
}

// Color palette for different statuses
const COLORS: Record<string, string> = {
  REQUESTED: "#2563eb",
  PICKUP_RIDER_ASSIGNED: "#0ea5e9",
  PICKED_UP: "#8b5cf6",
  PICKUP_FAILED: "#dc2626",
  RECEIVED_AT_ORIGIN_HUB: "#6366f1",
  IN_TRANSIT: "#f59e0b",
  RECEIVED_AT_DESTINATION_HUB: "#e11d48",
  OUT_FOR_DELIVERY: "#f97316",
  DELIVERED: "#16a34a",
  PARTIAL_DELIVERY: "#f59e0b",
  DELIVERY_FAILED: "#dc2626",
  ON_HOLD: "#64748b",
  RETURNED_TO_MERCHANT: "#475569",
  CANCELLED: "#991b1b",
};

const chartConfig = Object.keys(COLORS).reduce(
  (config, status) => {
    config[status] = { label: status.replace(/_/g, " ") };
    return config;
  },
  {} as Record<string, { label: string }>,
);

const PieChartComponent = ({ data, total }: PieChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ payload, value, percent }) =>
              `${(payload as { status: string })?.status}: ${String(value)} (${((percent ?? 0) * 100).toFixed(0)}%)`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[data[index]?.status as string] || "hsl(var(--primary))"
                }
              />
            ))}
          </Pie>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [String(value ?? 0), String(name)]}
                labelFormatter={(label) => `Status: ${String(label)}`}
              />
            }
          />
          <ChartLegend
            content={
              <ChartLegendContent
                formatter={(value) => `${String(value)} (${total})`}
              />
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default PieChartComponent;
