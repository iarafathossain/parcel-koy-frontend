import { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">Public Navbar</header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="border-t p-4">Public Footer</footer>
    </div>
  );
}
