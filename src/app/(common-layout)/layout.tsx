import CustomerChatWidget from "@/components/ai/customer-chat-widget";
import Footer from "@/components/modules/common-layout/footer";
import Navbar from "@/components/modules/common-layout/navbar";
import { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <Footer />
      </footer>
      <CustomerChatWidget />
    </div>
  );
}
