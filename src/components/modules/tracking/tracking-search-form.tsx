"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface TrackingSearchFormProps {
  baseRoute?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  isCompact?: boolean;
}

export const TrackingSearchForm = ({
  baseRoute = "/track-parcel",
  className = "",
  title = "Track Your Consignment",
  subtitle = "Now you can easily track your consignment",
  isCompact = false,
}: TrackingSearchFormProps) => {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedTrackingId = trackingId.trim();
    if (!cleanedTrackingId) {
      return;
    }

    router.push(`${baseRoute}/${encodeURIComponent(cleanedTrackingId)}`);
  };

  if (isCompact) {
    return (
      <form onSubmit={handleSubmit} className="w-full flex items-stretch gap-2">
        <Input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking code..."
          className="flex-1 border text-sm"
        />

        <Button type="submit" size="sm" className="gap-1.5">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>
    );
  }

  return (
    <section className={`w-full bg-muted/20 ${className}`}>
      <div className="mx-auto flex min-h-90 w-full max-w-5xl flex-col items-center px-4 py-14 md:py-16">
        <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-center text-lg text-muted-foreground">
          {subtitle}
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
        <div className="mt-8 text-center">
          <p>A valid tracking ID for quick checking</p>
          <p className="text-sm text-muted-foreground">
            Example:{" "}
            <span className="font-mono bg-muted/50 px-1 rounded">
              PKY-2603-ZFZA4P
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrackingSearchForm;
