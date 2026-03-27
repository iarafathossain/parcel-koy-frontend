import { ReactNode } from "react";

export default function RiderDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r p-4">Rider Sidebar</aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
