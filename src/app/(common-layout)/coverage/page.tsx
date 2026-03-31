import { CtaSection } from "@/components/shared/landing/cta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API } from "@/lib/api-endpoints";
import { IArea } from "@/types/area-type";
import {
  Building,
  CheckCircle2,
  MapPin,
  PhoneCall,
  XCircle,
} from "lucide-react";

interface Manager {
  id: string;
  userId: string;
  presentAddress: string | null;
  permanentAddress: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Hub {
  id: string;
  name: string;
  slug: string;
  address: string;
  contactNumber: string;
  isActive: boolean;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  coverageAreas: IArea[];
  manager: Manager;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Hub[];
}

async function getHubs(): Promise<Hub[]> {
  try {
    const res = await fetch(API.HUBS.GET_ALL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch hubs");
    }

    const json: ApiResponse = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching hubs:", error);
    return [];
  }
}

export default async function CoveragePage() {
  const hubs = await getHubs();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-14 md:py-20 text-center">
        <Badge variant="outline" className="mb-4">
          Network & Coverage
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          Our Nationwide Hub Network
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          ParcelKoy is rapidly expanding across the country. Find your nearest
          dispatch and delivery hub to ensure your parcels are always in trusted
          hands.
        </p>
      </section>

      {/* Hubs Grid Section */}
      <section className="container mx-auto px-4 pb-16">
        {hubs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
            <Building className="mb-4 h-10 w-10 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">No Hubs Found</h3>
            <p className="text-muted-foreground">
              We are currently updating our hub network. Please check back
              later.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hubs.map((hub) => (
              <Card
                key={hub.id}
                className="group relative overflow-hidden transition-all hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl font-bold">
                      {hub.name}
                    </CardTitle>
                    {hub.isActive ? (
                      <CheckCircle2
                        className="h-5 w-5 text-green-500 shrink-0"
                        aria-label="Active Hub"
                      />
                    ) : (
                      <XCircle
                        className="h-5 w-5 text-destructive shrink-0"
                        aria-label="Inactive Hub"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {hub.address}
                    </p>
                  </div>

                  {/* Contact Number */}
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm font-medium text-foreground">
                      {hub.contactNumber}
                    </p>
                  </div>

                  {/* Coverage Areas Tag */}
                  <div className="pt-2">
                    <Badge variant="secondary" className="font-normal">
                      {hub.coverageAreas.length} Coverage Area
                      {hub.coverageAreas.length !== 1 && "s"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Reused CTA Section */}
      <CtaSection
        title="Don't see your area listed?"
        description="We are constantly expanding! Register as a merchant today, and we'll notify you as soon as we launch in your district."
        buttonText="Register Now"
        buttonLink="/register"
      />
    </div>
  );
}
