"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] w-full px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10">
          <p className="text-sm font-semibold tracking-wide text-destructive">
            Unexpected Error
          </p>

          <h2 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">
            Something went wrong while loading this page
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            We could not complete your request right now. Try again, or return
            to a safe page.
          </p>

          {error.digest && (
            <p className="mt-4 text-xs text-muted-foreground">
              Reference ID: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => reset()}>Try Again</Button>

            <Button asChild variant="outline">
              <Link href="/">Go to Home</Link>
            </Button>

            <Button asChild variant="ghost">
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
