"use client";

import { ChartData } from "@/types/dashboard-stats-type";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

const PieChartComponent = ({ data, total }: PieChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
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
        <Tooltip
          formatter={(value) => `${value ?? 0}`}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px" }}
          formatter={(value) => `${String(value)} (${total})`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
