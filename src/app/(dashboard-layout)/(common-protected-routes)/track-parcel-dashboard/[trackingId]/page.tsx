import { TrackingDisplay } from "@/components/modules/tracking";
import { Button } from "@/components/ui/button";
import { API } from "@/lib/api-endpoints";
import { TrackingApiResponse } from "@/lib/tracking-utils";
import { Package } from "lucide-react";
import Link from "next/link";

async function getTrackingData(
  trackingId: string,
): Promise<TrackingApiResponse | null> {
  try {
    const res = await fetch(API.PARCELS.GET_PARCEL_TRACKING(trackingId), {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch tracking data", error);
    return null;
  }
}

const MerchantTrackParcelByIdPage = async ({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) => {
  const { trackingId } = await params;
  const response = await getTrackingData(trackingId);

  if (!response?.success || !response.data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-8">
        <Package className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold tracking-tight">Parcel Not Found</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          We couldn&apos;t find any tracking information for ID:{" "}
          <span className="font-semibold">{trackingId}</span>
        </p>
        <Link href="/track-parcel-dashboard">
          <Button variant="outline">Try Another Tracking ID</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center justify-between px-4 md:px-8 pt-6">
        <h2 className="text-lg font-semibold">Tracking Results</h2>
        <Link href="/track-parcel-dashboard">
          <Button variant="outline" size="sm">
            New Search
          </Button>
        </Link>
      </div>
      <TrackingDisplay data={response.data} />
    </div>
  );
};

export default MerchantTrackParcelByIdPage;
