"use client";

import { getAllPickupMethodsAction } from "@/actions/method-action";
import CommonModal from "@/components/shared/modal/common-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IMethod } from "@/types/method-type";
import { useQuery } from "@tanstack/react-query";
import { Package, Truck } from "lucide-react";
import { useState } from "react";

import CreateParcelRequestForm from "./create-parcel-request-form";

const CreateParcelMethodCards = () => {
  const [selectedPickupMethod, setSelectedPickupMethod] =
    useState<IMethod | null>(null);

  const { data: pickupMethodsResponse } = useQuery({
    queryKey: ["pickup-methods"],
    queryFn: () => getAllPickupMethodsAction(),
  });

  const pickupMethods: IMethod[] =
    (pickupMethodsResponse?.data as IMethod[]) || [];
  const orderedPickupMethods = [pickupMethods[1], pickupMethods[0]].filter(
    Boolean,
  );

  const closeModal = () => {
    setSelectedPickupMethod(null);
  };

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
              onClick={() => setSelectedPickupMethod(method)}
              className={cn(
                "h-80 flex flex-col items-center justify-center transition-colors shadow-2xl hover:shadow-2xl/50 cursor-pointer",
                method.slug === "regular-pickup"
                  ? "border-success/60 bg-success/10 hover:bg-success/15 dark:border-success/70 dark:bg-success/15 dark:hover:bg-success/20"
                  : "border-warning/60 bg-warning/10 hover:bg-warning/15 dark:border-warning/70 dark:bg-warning/15 dark:hover:bg-warning/20",
              )}
            >
              <CardHeader className="items-center justify-center text-center">
                <div className="flex w-full justify-center">
                  {method.slug === "regular-pickup" ? (
                    <Package className="h-14 w-14 text-success" />
                  ) : (
                    <Truck className="h-14 w-14 text-warning" />
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

      <CommonModal
        isOpen={selectedPickupMethod !== null}
        onClose={closeModal}
        title={selectedPickupMethod?.name || "Make pickup request"}
        description="Fill in the parcel details to submit a pickup request."
      >
        {selectedPickupMethod && (
          <CreateParcelRequestForm
            initialPickupMethodId={selectedPickupMethod.id}
            initialPickupMethodSlug={selectedPickupMethod.slug}
            onSuccess={closeModal}
          />
        )}
      </CommonModal>
    </section>
  );
};

export default CreateParcelMethodCards;
