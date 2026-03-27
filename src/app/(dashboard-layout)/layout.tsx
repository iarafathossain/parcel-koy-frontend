import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <section className="min-h-screen p-6">{children}</section>;
}
