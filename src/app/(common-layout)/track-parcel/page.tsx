"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const TrackParcelPage = () => {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedTrackingId = trackingId.trim();
    if (!cleanedTrackingId) {
      return;
    }

    router.push(`/track-parcel/${encodeURIComponent(cleanedTrackingId)}`);
  };

  return (
    <section className="w-full bg-muted/20">
      <div className="mx-auto flex min-h-90 w-full max-w-5xl flex-col items-center px-4 py-14 md:py-16">
        <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          Track Your Consignment
        </h1>
        <p className="mt-3 text-center text-lg text-muted-foreground">
          Now you can easily track your consignment
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-14 flex w-full max-w-3xl items-stretch overflow-hidden rounded-md border bg-background"
        >
          <div className="flex items-center border-r px-4 text-muted-foreground">
            <Search className="h-6 w-6" />
          </div>

          <Input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Search Tracking Code here..."
            className="h-14 rounded-none border-0 px-5 text-base focus-visible:ring-0"
          />

          <Button
            type="submit"
            className="h-14 rounded-none px-7 text-xl font-semibold"
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};

export default TrackParcelPage;
