"use client";

import { getAllPickupMethodsAction } from "@/actions/method-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Package, Truck } from "lucide-react";

const CreateParcelMethodCards = () => {
  const { data: pickupMethodsResponse } = useQuery({
    queryKey: ["pickup-methods"],
    queryFn: () => getAllPickupMethodsAction(),
  });

  const pickupMethods = pickupMethodsResponse?.data || [];
  const orderedPickupMethods = [pickupMethods[1], pickupMethods[0]].filter(
    Boolean,
  );

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Make pickup request
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {orderedPickupMethods.length > 0 ? (
          orderedPickupMethods.map((method) => (
            <Card
              key={method.id}
              className={cn(
                "h-80 flex flex-col items-center justify-center transition-colors shadow-2xl",
                method.slug === "regular-pickup"
                  ? "border-lime-600/60 bg-lime-300/45 hover:bg-lime-300/60 dark:border-lime-500/70 dark:bg-lime-900/35 dark:hover:bg-lime-900/50"
                  : "border-amber-600/60 bg-amber-300/45 hover:bg-amber-300/60 dark:border-amber-500/70 dark:bg-amber-900/35 dark:hover:bg-amber-900/50",
              )}
            >
              <CardHeader className="items-center justify-center text-center">
                <div className="flex w-full justify-center">
                  {method.slug === "regular-pickup" ? (
                    <Package className="h-14 w-14 text-lime-700 dark:text-lime-300" />
                  ) : (
                    <Truck className="h-14 w-14 text-lime-700 dark:text-lime-300" />
                  )}
                </div>
                <CardTitle className="whitespace-nowrap text-3xl font-bold leading-none">
                  {method.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mx-auto max-w-xs text-base text-foreground/85">
                  {method.description}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No pickup methods available.
          </p>
        )}
      </div>
    </section>
  );
};

export default CreateParcelMethodCards;
