type LoadingShellVariant =
  | "global"
  | "adminDashboard"
  | "merchantDashboard"
  | "riderDashboard"
  | "protectedRoute"
  | "trackingRoute"
  | "myProfile"
  | "changePassword";

interface LoadingShellProps {
  variant: LoadingShellVariant;
}

const shells: Record<LoadingShellVariant, React.ReactNode> = {
  global: (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-6xl space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-52 rounded-md bg-muted" />
          <div className="h-4 w-80 rounded-md bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-28 rounded-lg border bg-card" />
          <div className="h-28 rounded-lg border bg-card" />
          <div className="h-28 rounded-lg border bg-card" />
        </div>

        <div className="h-72 rounded-lg border bg-card" />
      </div>
    </main>
  ),
  adminDashboard: (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-56 rounded-md bg-muted" />
        <div className="h-4 w-72 rounded-md bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="h-28 rounded-lg border bg-card" />
        <div className="h-28 rounded-lg border bg-card" />
        <div className="h-28 rounded-lg border bg-card" />
        <div className="h-28 rounded-lg border bg-card" />
        <div className="h-28 rounded-lg border bg-card" />
        <div className="h-28 rounded-lg border bg-card" />
      </div>

      <div className="h-72 rounded-lg border bg-card" />
    </div>
  ),
  merchantDashboard: (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-64 rounded-md bg-muted" />
        <div className="h-4 w-80 rounded-md bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="h-24 rounded-lg border bg-card" />
        <div className="h-24 rounded-lg border bg-card" />
        <div className="h-24 rounded-lg border bg-card" />
        <div className="h-24 rounded-lg border bg-card" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="h-72 rounded-lg border bg-card xl:col-span-2" />
        <div className="h-72 rounded-lg border bg-card" />
      </div>
    </div>
  ),
  riderDashboard: (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-60 rounded-md bg-muted" />
        <div className="h-4 w-72 rounded-md bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="h-24 rounded-lg border bg-card" />
        <div className="h-24 rounded-lg border bg-card" />
        <div className="h-24 rounded-lg border bg-card" />
      </div>

      <div className="h-72 rounded-lg border bg-card" />
    </div>
  ),
  protectedRoute: (
    <div className="space-y-4 animate-pulse">
      <div className="h-7 w-56 rounded-md bg-muted" />
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-5 w-40 rounded-md bg-muted" />
        <div className="h-4 w-full rounded-md bg-muted" />
        <div className="h-4 w-5/6 rounded-md bg-muted" />
        <div className="h-4 w-3/4 rounded-md bg-muted" />
      </div>
    </div>
  ),
  trackingRoute: (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-64 rounded-md bg-muted" />
        <div className="h-4 w-80 rounded-md bg-muted" />
      </div>

      <div className="rounded-xl border bg-card p-4 md:p-6 space-y-4">
        <div className="flex items-stretch gap-2 rounded-md border bg-background p-2">
          <div className="h-10 w-10 rounded-md bg-muted" />
          <div className="h-10 flex-1 rounded-md bg-muted" />
          <div className="h-10 w-28 rounded-md bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="h-64 rounded-lg border bg-muted/40" />
          <div className="space-y-4 rounded-lg border bg-muted/25 p-4">
            <div className="h-5 w-40 rounded-md bg-muted" />
            <div className="space-y-3">
              <div className="h-16 rounded-md bg-muted" />
              <div className="h-16 rounded-md bg-muted" />
              <div className="h-16 rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  myProfile: (
    <div className="space-y-6 animate-pulse">
      <div className="h-7 w-40 rounded-md bg-muted" />

      <div className="rounded-lg border bg-card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded-md bg-muted" />
            <div className="h-4 w-56 rounded-md bg-muted" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-16 rounded-md bg-muted" />
          <div className="h-16 rounded-md bg-muted" />
          <div className="h-16 rounded-md bg-muted" />
          <div className="h-16 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  ),
  changePassword: (
    <div className="flex items-start justify-center mt-5 px-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 space-y-5 animate-pulse">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-7 w-44 rounded-md bg-muted" />
          <div className="mx-auto h-4 w-72 rounded-md bg-muted" />
        </div>

        <div className="space-y-4">
          <div className="h-10 rounded-md bg-muted" />
          <div className="h-10 rounded-md bg-muted" />
          <div className="h-10 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  ),
};

const LoadingShell = ({ variant }: LoadingShellProps) => {
  return shells[variant];
};

export default LoadingShell;
