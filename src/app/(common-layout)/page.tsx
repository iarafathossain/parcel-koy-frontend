import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bike,
  Building2,
  ClipboardCheck,
  Coins,
  Handshake,
  Headset,
  Package,
  Search,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const partners = [
  "bKash",
  "Apex",
  "Walton",
  "IFAD",
  "Jamuna",
  "Sailor",
  "Othoba",
  "Lotto",
  "HT Bazar",
  "Naturo",
  "Ghorer Bazar",
  "Online Tech Academy",
];

const serviceItems = [
  {
    title: "Ecommerce Delivery",
    description: "Fast doorstep delivery with COD collection.",
    icon: Truck,
  },
  {
    title: "Pick and Drop",
    description: "Scheduled pickup and drop for parcels and documents.",
    icon: Bike,
  },
  {
    title: "Packaging",
    description: "Safe and professional packaging for fragile shipments.",
    icon: Package,
  },
  {
    title: "Warehousing",
    description: "Short-term storage and dispatch support for merchants.",
    icon: Building2,
  },
];

const valueProps = [
  {
    title: "Daily Pickup, No Limits",
    description:
      "ParcelKoy supports unlimited daily pickups for growing merchants.",
    icon: Truck,
  },
  {
    title: "Cash on Delivery",
    description: "Collect cash from customers and settle directly to you.",
    icon: Coins,
  },
  {
    title: "Faster Payment Service",
    description:
      "Flexible payout channels through bank and mobile financial services.",
    icon: Wallet,
  },
  {
    title: "Online Management",
    description: "Manage parcels, status, and returns from a single dashboard.",
    icon: ClipboardCheck,
  },
  {
    title: "Real-Time Tracking",
    description: "Every consignment gets a tracking ID with live updates.",
    icon: Search,
  },
  {
    title: "24/7 Customer Service",
    description: "Dedicated support team to resolve issues around the clock.",
    icon: Headset,
  },
];

const faqs = [
  {
    question: "Why choose ParcelKoy Courier?",
    answer:
      "ParcelKoy combines fast pickup, reliable delivery, transparent tracking, and quick cash settlement for ecommerce growth.",
  },
  {
    question: "What coverage area does ParcelKoy provide?",
    answer:
      "We provide major city coverage with expanding suburban and district routes through hub-based operations.",
  },
  {
    question: "What services does ParcelKoy offer?",
    answer:
      "Ecommerce delivery, pick and drop, secure packaging, warehousing support, and COD management.",
  },
  {
    question: "How are delivery charges calculated?",
    answer:
      "Charges are based on destination zone, package size/weight, and service speed. You can view exact rates on the pricing page.",
  },
];

const LandingPage = () => {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b bg-linear-to-r from-secondary/45 via-background to-primary/10">
        <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-primary/25 bg-background/70"
            >
              Reliable Fast Global Logistics
            </Badge>
            <h1 className="max-w-xl text-4xl leading-tight font-bold tracking-tight text-foreground md:text-5xl">
              We Deliver Parcels On Time With No Hassle
            </h1>
            <p className="max-w-lg text-base text-muted-foreground">
              Easy tracking, fast payment, and safe delivery across the country.
              Grow your business with ParcelKoy&apos;s smart logistics network.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="h-10 px-5">
                <Link href="/register">Become a Merchant</Link>
              </Button>
              <Button asChild variant="outline" className="h-10 px-5">
                <Link href="/track-parcel">Track Parcel</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border bg-card/80 p-7 shadow-sm backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border bg-background/80 p-4">
                  <p className="text-2xl font-semibold">300k+</p>
                  <p className="text-sm text-muted-foreground">
                    Satisfied Merchant
                  </p>
                </div>
                <div className="rounded-2xl border bg-background/80 p-4">
                  <p className="text-2xl font-semibold">5k+</p>
                  <p className="text-sm text-muted-foreground">
                    Delivery Riders
                  </p>
                </div>
                <div className="rounded-2xl border bg-background/80 p-4 sm:col-span-2">
                  <p className="text-2xl font-semibold">98.6%</p>
                  <p className="text-sm text-muted-foreground">
                    On-time delivery success rate in active zones.
                  </p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-primary/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-chart-2/20 blur-2xl" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Brands Love To Work With Us
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex h-14 items-center justify-center rounded-lg border bg-card px-2 text-sm font-semibold text-muted-foreground"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-14">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Our Service
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((item) => (
            <Card key={item.title} className="border bg-card/80 py-0">
              <CardContent className="flex h-full flex-col items-center gap-3 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:py-16">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Why You Should Choose ParcelKoy?
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item) => (
            <Card key={item.title} className="border py-0">
              <CardHeader className="pb-1">
                <div className="mb-2 w-fit rounded-lg bg-primary/10 p-2 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-5 text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border bg-card px-5 py-4"
            >
              <summary className="cursor-pointer list-none pr-6 text-base font-semibold marker:content-none">
                <span className="inline-flex w-full items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-semibold tracking-tight">
            Grow Your Business with ParcelKoy
          </h2>
          <p className="mt-2 text-primary-foreground/85">
            Start your first step with ParcelKoy and streamline every delivery.
          </p>
          <Button asChild variant="secondary" className="mt-6">
            <Link href="/register">Become a Merchant</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14 md:pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border py-0">
            <CardContent className="flex items-start gap-3 p-6">
              <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  Licensed
                </p>
                <h3 className="mt-1 text-xl font-semibold">
                  A Licensed Courier Service of GPO
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Officially recognized and operating under compliant logistics
                  standards.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border py-0">
            <CardContent className="flex items-start gap-3 p-6">
              <Handshake className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  Membership
                </p>
                <h3 className="mt-1 text-xl font-semibold">
                  Member of National Delivery Associations
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Collaborating with industry partners to maintain trusted,
                  scalable logistics services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
