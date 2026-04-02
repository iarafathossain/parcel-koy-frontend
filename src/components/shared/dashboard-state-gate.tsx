"use client";

import DataLoading from "@/components/shared/data-loading";
import { APIResponse } from "@/types/api-type";
import { DashboardData } from "@/types/dashboard-stats-type";
import { ReactNode } from "react";

interface DashboardStateGateProps<TData extends DashboardData> {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  response: APIResponse<DashboardData> | undefined;
  roleLabel: string;
  isExpectedData: (data: DashboardData) => data is TData;
  children: (data: TData) => ReactNode;
}

const DashboardStateGate = <TData extends DashboardData>({
  isLoading,
  isError,
  error,
  response,
  roleLabel,
  isExpectedData,
  children,
}: DashboardStateGateProps<TData>) => {
  if (isLoading) {
    return <DataLoading />;
  }

  if (isError || !response?.success || !response?.data) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : response?.message || "Failed to load dashboard";

    return (
      <div className="text-center py-12">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    );
  }

  if (!isExpectedData(response.data)) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">
          Invalid dashboard data for {roleLabel}.
        </p>
      </div>
    );
  }

  return <>{children(response.data)}</>;
};

export default DashboardStateGate;
