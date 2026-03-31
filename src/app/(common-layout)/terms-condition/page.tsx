import { CtaSection } from "@/components/shared/landing/cta";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";

export default function TermsConditionsPage() {
  const lastUpdated = "March 31, 2026";

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-14 md:py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Scale className="h-8 w-8" />
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          The rules and guidelines for utilizing ParcelKoy&apos;s logistics,
          warehousing, and COD settlement services.
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
              1. Agreement to Terms
            </h2>
            <p className="leading-7">
              By accessing our website or utilizing the ParcelKoy logistics
              network, you agree to be bound by these Terms and Conditions. If
              you do not agree with all of these terms, then you are expressly
              prohibited from using the Site and our services and you must
              discontinue use immediately.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Merchant Responsibilities
            </h2>
            <p className="leading-7 mb-3">
              As a registered merchant with ParcelKoy, you agree to the
              following:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-7">
              <li>
                <strong className="text-foreground">
                  Accurate Information:
                </strong>{" "}
                You must provide accurate pickup and delivery addresses, phone
                numbers, and parcel weights when creating a consignment.
              </li>
              <li>
                <strong className="text-foreground">Packaging:</strong> All
                items must be securely packed to withstand standard transit
                handling. Fragile items must be clearly marked. ParcelKoy offers
                premium packaging as an add-on service.
              </li>
              <li>
                <strong className="text-foreground">Prohibited Items:</strong>{" "}
                You agree not to ship illegal drugs, firearms, hazardous
                materials, explosives, perishable goods (without prior
                arrangement), or any items restricted by local laws.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Cash on Delivery (COD) & Payouts
            </h2>
            <p className="leading-7">
              ParcelKoy collects COD on behalf of merchants. Collected funds,
              minus applicable delivery and return charges, will be remitted to
              the merchant&apos;s designated Bank or Mobile Financial Service
              (MFS) account. Payout cycles are typically processed within 24 to
              48 hours following a successful delivery. Merchants are
              responsible for ensuring their payment details are accurate in the
              dashboard.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Liability and Claims
            </h2>
            <p className="leading-7">
              In the event of loss or damage to a parcel while in the custody of
              ParcelKoy, our liability is limited to standard compensation caps
              outlined in your merchant agreement unless extra insurance was
              declared and purchased at the time of dispatch. Claims for lost or
              damaged items must be submitted via the merchant dashboard within
              7 days of the shipment&apos;s creation date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Returns and Cancellations
            </h2>
            <p className="leading-7">
              If a customer rejects a parcel or is unreachable after multiple
              delivery attempts, the parcel will be marked as &quot;Return to
              Merchant.&quot; Standard return charges will apply and will be
              deducted from your COD settlements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Modifications
            </h2>
            <p className="leading-7">
              ParcelKoy reserves the right, in our sole discretion, to make
              changes or modifications to these Terms and Conditions at any
              time. We will alert you about any changes by updating the
              &quot;Last Updated&quot; date of these Terms, and you waive any
              right to receive specific notice of each such change.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Accept These Terms?"
        description="Join thousands of merchants shipping successfully with ParcelKoy."
        buttonText="Become a Merchant"
        buttonLink="/register"
      />
    </div>
  );
}
