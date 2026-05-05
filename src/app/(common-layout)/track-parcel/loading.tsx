import LoadingShell from "@/components/shared/loading/loading-shell";

export default function TrackParcelLoading() {
  return (
    <div className="flex h-[60vh] items-center justify-center w-full max-w-xl mx-auto">
      <LoadingShell variant="trackingRoute" />
    </div>
  );
}
