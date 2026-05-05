"use client";

import { TrackingSearchForm } from "@/components/modules/tracking";

const TrackParcelDashboardPage = () => {
  return (
    <TrackingSearchForm
      baseRoute="/track-parcel-dashboard"
      title="Track Parcel"
      subtitle="Search and track your parcel shipments"
      className="border-b"
    />
  );
};

export default TrackParcelDashboardPage;
