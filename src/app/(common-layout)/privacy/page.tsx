import { CtaSection } from "@/components/shared/landing/cta";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 31, 2026";

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-14 md:py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Shield className="h-8 w-8" />
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Your privacy is important to us. Learn how ParcelKoy collects, uses,
          and protects your data and your customers&apos; data.
        </p>
        <Badge variant="outline" className="mt-6">
          Last Updated: {lastUpdated}
        </Badge>
      </section>

      {/* Content Section */}
      <section className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="rounded-2xl border bg-card p-6 md:p-10 lg:p-12 text-muted-foreground space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Introduction
            </h2>
            <p className="leading-7">
              Welcome to ParcelKoy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website, use our merchant dashboard, or utilize our logistics and
              delivery services. Please read this privacy policy carefully.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Information We Collect
            </h2>
            <p className="leading-7 mb-3">
              We may collect information about you in a variety of ways. The
              information we may collect includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-7">
              <li>
                <strong className="text-foreground">Merchant Data:</strong>{" "}
                Name, business name, email address, phone number, and financial
                information (Bank/MFS details) required for Cash on Delivery
                (COD) settlements.
              </li>
              <li>
                <strong className="text-foreground">Customer Data:</strong>{" "}
                Consignee names, delivery addresses, and phone numbers provided
                by merchants strictly for the purpose of fulfilling deliveries.
              </li>
              <li>
                <strong className="text-foreground">Device Data:</strong> IP
                address, browser type, operating system, and tracking IDs used
                to monitor dashboard performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. How We Use Your Information
            </h2>
            <p className="leading-7 mb-3">
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. We use your
              data to:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-7">
              <li>Create and manage your merchant account.</li>
              <li>
                Process your parcels, dispatch riders, and deliver packages to
                your customers.
              </li>
              <li>
                Process Cash on Delivery (COD) collections and transfer funds to
                your accounts.
              </li>
              <li>Send real-time tracking updates and SMS notifications.</li>
              <li>
                Resolve disputes, troubleshoot problems, and respond to customer
                service requests.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Disclosure of Your Information
            </h2>
            <p className="leading-7">
              We may share information we have collected about you in certain
              situations. Your information may be disclosed to our delivery
              riders (for drop-off purposes), third-party payment processors
              (like bKash, for automated settlements), and law enforcement
              agencies if required by legal processes or to investigate
              potential fraud.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Data Security
            </h2>
            <p className="leading-7">
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Have Questions About Your Privacy?"
        description="Our support team is here to help you understand how we protect your business."
        buttonText="Contact Support"
        buttonLink="/contact"
      />
    </div>
  );
}
