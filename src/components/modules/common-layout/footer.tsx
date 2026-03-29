import { publicNavbarItems } from "@/lib/nav-items";
import { Clock3, Mail, MapPin, Phone, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  { title: "Same-Day Delivery", href: "/services" },
  { title: "Express Parcels", href: "/services" },
  { title: "Cash on Delivery", href: "/services" },
  { title: "Bulk Merchant Shipping", href: "/services" },
];

const supportLinks = [
  { title: "Track Parcel", href: "/track-parcel" },
  { title: "Pricing", href: "/pricing" },
  { title: "Coverage", href: "/coverage" },
  { title: "Contact", href: "/contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="ParcelKoy Logistics"
                width={220}
                height={44}
                className="h-auto w-44"
              />
            </Link>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              Fast, secure, and reliable parcel delivery for businesses and
              individuals across the country.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              <span>Support: 8:00 AM - 10:00 PM (Daily)</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="rounded-md border p-2 transition-colors hover:bg-background"
              >
                Facebook
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-md border p-2 transition-colors hover:bg-background"
              >
                Instagram
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Services
            </h3>
            <div className="mt-4 space-y-3">
              {services.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Truck className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Quick Links
            </h3>
            <div className="mt-4 space-y-3">
              {publicNavbarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}

              {supportLinks
                .filter((item) => item.title === "Track Parcel")
                .map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block text-sm font-semibold text-primary transition-colors hover:opacity-80"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>House 24, Road 11, Banani, Dhaka 1213</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+8801700000000" className="hover:text-foreground">
                  +880 1700-000000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:support@parcelkoy.com"
                  className="hover:text-foreground"
                >
                  support@parcelkoy.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t bg-background/70">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {year} ParcelKoy Logistics. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about-us" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
