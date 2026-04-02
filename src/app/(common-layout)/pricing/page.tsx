"use client";

import { getAllAreasAction } from "@/actions/area-action";
import { getAllCategoriesAction } from "@/actions/category-action";
import {
  getAllDeliveryMethodsAction,
  getAllPickupMethodsAction,
} from "@/actions/method-action";
import { getAllSpeedsAction } from "@/actions/speed-action";
import AppField from "@/components/shared/app-field";
import DeliveryChargeDisplay from "@/components/shared/display-delivery-charge";
import { parseNumber } from "@/helpers/parse-number";
import { getDeliveryChargeZodSchema } from "@/validators/pricing-validator";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const PricingPage = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["areas", "for-pricing"],
      queryFn: () => getAllAreasAction(""),
    });

    queryClient.prefetchQuery({
      queryKey: ["categories", "for-pricing"],
      queryFn: () => getAllCategoriesAction(""),
    });

    queryClient.prefetchQuery({
      queryKey: ["speeds", "for-pricing"],
      queryFn: () => getAllSpeedsAction(""),
    });

    queryClient.prefetchQuery({
      queryKey: ["pickup-methods", "for-pricing"],
      queryFn: () => getAllPickupMethodsAction(),
    });

    queryClient.prefetchQuery({
      queryKey: ["delivery-methods", "for-pricing"],
      queryFn: () => getAllDeliveryMethodsAction(),
    });
  }, [queryClient]);

  const form = useForm({
    defaultValues: {
      originAreaId: "",
      destinationAreaId: "",
      categoryId: "",
      speedId: "",
      pickupMethodId: "",
      deliveryMethodId: "",
      declaredWeight: "",
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          Check Delivery Charge
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          Select all the required fields below to view the live delivery charge.
        </p>
      </div>

      {/* Auto-fetching Delivery Charge Component */}
      <form.Subscribe selector={(state) => state.values}>
        {(values) => (
          <DeliveryChargeDisplay
            values={values}
            pickupMethodId={values.pickupMethodId}
            requiresPickupLocation={true}
          />
        )}
      </form.Subscribe>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Origin Area */}
          <form.Field
            name="originAreaId"
            validators={{
              onChange: getDeliveryChargeZodSchema.shape.originAreaId,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Origin Area *"
                placeholder="Select origin area"
                isSelect
                selectType="area"
                selectLabel="Origin Area"
              />
            )}
          </form.Field>

          {/* Destination Area */}
          <form.Field
            name="destinationAreaId"
            validators={{
              onChange: getDeliveryChargeZodSchema.shape.destinationAreaId,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Destination Area *"
                placeholder="Select destination area"
                isSelect
                selectType="area"
                selectLabel="Destination Area"
              />
            )}
          </form.Field>

          {/* Category */}
          <form.Field
            name="categoryId"
            validators={{
              onChange: getDeliveryChargeZodSchema.shape.categoryId,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Category *"
                placeholder="Select category"
                isSelect
                selectType="category"
              />
            )}
          </form.Field>

          {/* Speed */}
          <form.Field
            name="speedId"
            validators={{ onChange: getDeliveryChargeZodSchema.shape.speedId }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Speed *"
                placeholder="Select speed"
                isSelect
                selectType="speed"
              />
            )}
          </form.Field>

          {/* Pickup Method */}
          <form.Field
            name="pickupMethodId"
            validators={{
              onChange: getDeliveryChargeZodSchema.shape.pickupMethodId,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Pickup Method *"
                placeholder="Select pickup method"
                isSelect
                selectType="pickupMethod"
              />
            )}
          </form.Field>

          {/* Delivery Method */}
          <form.Field
            name="deliveryMethodId"
            validators={{
              onChange: getDeliveryChargeZodSchema.shape.deliveryMethodId,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Delivery Method *"
                placeholder="Select delivery method"
                isSelect
                selectType="deliveryMethod"
              />
            )}
          </form.Field>

          {/* Declared Weight */}
          <form.Field
            name="declaredWeight"
            validators={{
              onChange: ({ value }) => {
                const parsed = parseNumber(value, "Declared weight");
                if (parsed.error) return parsed.error;

                const validated =
                  getDeliveryChargeZodSchema.shape.weight.safeParse(
                    parsed.value,
                  );

                if (!validated.success) {
                  return validated.error.issues[0]?.message || "Invalid weight";
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Declared Weight (kg) *"
                type="number"
                placeholder="Enter parcel weight"
              />
            )}
          </form.Field>
        </div>
      </form>
    </div>
  );
};

export default PricingPage;
