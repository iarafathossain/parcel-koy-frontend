import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CtaSection = ({
  title = "Grow Your Business with ParcelKoy",
  description = "Start your first step with ParcelKoy and streamline every delivery.",
  buttonText = "Become a Merchant",
  buttonLink = "/register",
}) => {
  return (
    <section className="container mx-auto pad-horizontal section-default">
      <div className="radius-xl bg-primary pad-horizontal py-generous text-center text-primary-foreground py-4">
        <h2 className="heading-h3 tracking-tight">{title}</h2>
        <p className="mt-default text-primary-foreground/85">{description}</p>
        <Button asChild variant="secondary" className="mt-generous">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
};
