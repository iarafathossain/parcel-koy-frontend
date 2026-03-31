import { Card, CardContent } from "@/components/ui/card";
import { Handshake, ShieldCheck } from "lucide-react";

export const CredentialsSection = () => {
  return (
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
  );
};
