import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CtaSection = ({
  title = "Grow Your Business with ParcelKoy",
  description = "Start your first step with ParcelKoy and streamline every delivery.",
  buttonText = "Become a Merchant",
  buttonLink = "/register",
}) => {
  return (
    <section className="container mx-auto px-4 pb-12 md:pb-16">
      <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-primary-foreground/85">{description}</p>
        <Button asChild variant="secondary" className="mt-6">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
};
