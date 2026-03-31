import { CredentialsSection } from "@/components/shared/landing/credential";
import { CtaSection } from "@/components/shared/landing/cta";
import { Partnership } from "@/components/shared/landing/partnership";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Truck } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="bg-background">
      {/* About Hero */}
      <section className="container mx-auto px-4 py-14 md:py-20 text-center">
        <Badge variant="outline" className="mb-4">
          About ParcelKoy
        </Badge>
        <h1 className="max-w-3xl mx-auto text-4xl leading-tight font-bold tracking-tight text-foreground md:text-5xl">
          Redefining Logistics for the Modern E-commerce Era
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
          Founded with a vision to bridge the gap between merchants and
          customers, ParcelKoy is a tech-driven logistics network focused on
          speed, transparency, and reliability.
        </p>
      </section>

      {/* Mission / Vision Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3 rounded-xl border bg-card p-6">
            <Target className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground text-sm">
              To provide seamless, hassle-free delivery solutions that empower
              businesses to scale without worrying about backend logistics.
            </p>
          </div>
          <div className="space-y-3 rounded-xl border bg-card p-6">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-muted-foreground text-sm">
              To become the most trusted nationwide parcel network, known for
              innovation, 99% on-time delivery, and exceptional merchant
              support.
            </p>
          </div>
          <div className="space-y-3 rounded-xl border bg-card p-6">
            <Truck className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Our Reach</h3>
            <p className="text-muted-foreground text-sm">
              Operating across major cities with rapidly expanding suburban
              routes, equipped with smart hubs for optimized routing.
            </p>
          </div>
        </div>
      </section>

      <CredentialsSection />

      <Partnership title="Trusted by Top Brands & Growing Merchants" />

      <CtaSection
        title="Ready to Scale Your Deliveries?"
        description="Join thousands of merchants who trust ParcelKoy for their daily logistics."
      />
    </div>
  );
};

export default AboutUsPage;
