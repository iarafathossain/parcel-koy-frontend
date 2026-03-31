import { CtaSection } from "@/components/shared/landing/cta";
import { FaqSection } from "@/components/shared/landing/faq-";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, PhoneCall } from "lucide-react";

// We can reuse the FAQs from the landing page here to deflect basic support tickets
const supportFaqs = [
  {
    question: "How do I track a missing parcel?",
    answer:
      "You can track your parcel using the Tracking ID on our tracking page. If the status hasn't updated in 24 hours, contact our support team with your ID.",
  },
  {
    question: "When are COD payments settled?",
    answer:
      "COD payments are processed and transferred to your designated bank or MFS account within 24-48 hours after successful delivery.",
  },
  {
    question: "How can I update my pickup address?",
    answer:
      "Log into your Merchant Dashboard, navigate to 'Settings' > 'Locations', and add or edit your pickup points.",
  },
  {
    question: "Do you offer compensation for lost/damaged goods?",
    answer:
      "Yes, we have a compensation policy for declared-value shipments. Please review our terms of service for specific packaging guidelines and claim processes.",
  },
];

const ContactUsPage = () => {
  return (
    <div className="bg-background">
      {/* Header */}
      <section className="container mx-auto px-4 py-14 md:py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact Our Support Team
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you need help with a dispatch or want to discuss enterprise
          solutions, we&apos;re here for you.
        </p>
      </section>

      {/* Contact Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Info Cards */}
          <div className="space-y-4 lg:col-span-1">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Call Us (24/7)</p>
                  <p className="text-muted-foreground">+880 1234 567 890</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email Support</p>
                  <p className="text-muted-foreground">support@parcelkoy.com</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Central Hub</p>
                  <p className="text-muted-foreground">
                    123 Logistics Ave, Commercial Dist.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject / Tracking ID</Label>
                  <Input
                    id="subject"
                    placeholder="e.g. Issue with PK-12345678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="min-h-30"
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reused FAQ Section */}
      <FaqSection title="Help Center & Quick Answers" faqs={supportFaqs} />

      {/* Reused CTA */}
      <CtaSection
        title="Need an Enterprise Solution?"
        description="We offer custom logistics routing and bulk warehousing for large e-commerce brands."
        buttonText="Contact Sales"
        buttonLink="/contact-sales"
      />
    </div>
  );
};

export default ContactUsPage;
