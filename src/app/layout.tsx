import { SonnerWrapper } from "@/components/ui/sonner-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { UserProvider } from "@/providers/user-provider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://parcel-koy-frontend.vercel.app/"),

  title: {
    default: "Logistics | Next-Gen Parcel & Delivery Management",
    template: "%s | Logistics",
  },
  description:
    "End-to-end supply chain visibility, automated parcel tracking, and seamless last-mile delivery solutions for modern e-commerce and B2B merchants.",
  keywords: [
    "supply chain management",
    "last-mile delivery",
    "freight forwarding",
    "parcel tracking API",
    "logistics dashboard",
    "fleet management",
    "delivery dispatch system",
  ],
  authors: [{ name: "B6A5 Engineering" }],
  creator: "B6A5 Logistics",
  publisher: "B6A5 Logistics",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Logistics | Next-Gen Parcel & Delivery Management",
    description:
      "End-to-end supply chain visibility, automated parcel tracking, and seamless last-mile delivery solutions for modern e-commerce and B2B merchants.",
    siteName: "Logistics",
  },

  twitter: {
    card: "summary",
    title: "Logistics | Next-Gen Parcel & Delivery Management",
    description:
      "End-to-end supply chain visibility, automated parcel tracking, and seamless last-mile delivery solutions for modern e-commerce and B2B merchants.",
    creator: "@b6a5logistics",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <TooltipProvider>
            <QueryProvider>
              <UserProvider>{children}</UserProvider>
            </QueryProvider>
          </TooltipProvider>
        </ThemeProvider>
        <SonnerWrapper />
      </body>
    </html>
  );
}
