import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-[70vh] w-full px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10">
          <p className="text-sm font-semibold tracking-wide text-primary">
            404
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">
            The page you are looking for does not exist
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            The link may be broken, the page may have been moved, or you may not
            have permission to view it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">Go to Home</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
