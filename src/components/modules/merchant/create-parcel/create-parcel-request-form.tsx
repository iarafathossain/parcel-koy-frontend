"use client";

import { createParcelAction } from "@/actions/parcel-action";
import AppField from "@/components/shared/app-field";
import DeliveryChargeDisplay from "@/components/shared/display-delivery-charge";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { catchError } from "@/helpers/catch-error";
import { parseNumber } from "@/helpers/parse-number";
import { cn } from "@/lib/utils";
import {
  CreateParcelPayload,
  createParcelZodSchema,
} from "@/validators/parcel-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type CreateParcelRequestFormProps = {
  initialPickupMethodId: string;
  initialPickupMethodSlug: string;
  onSuccess?: () => void;
};

const CreateParcelRequestForm = ({
  initialPickupMethodId,
  initialPickupMethodSlug,
  onSuccess,
}: CreateParcelRequestFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const requiresPickupLocation = initialPickupMethodSlug === "pick-drop";

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateParcelPayload) => createParcelAction(payload),
  });

  const form = useForm({
    defaultValues: {
      categoryId: "",
      destinationAreaId: "",
      originAreaId: "",
      speedId: "",
      deliveryMethodId: "",
      declaredWeight: "",
      isFragile: false,
      pickupAddress: "",
      deliveryAddress: "",
      receiverName: "",
      receiverContactNumber: "",
      codAmount: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const parsedDeclaredWeight = parseNumber(
        value.declaredWeight,
        "Declared weight",
      );
      if (parsedDeclaredWeight.error || parsedDeclaredWeight.value === null) {
        setServerError(parsedDeclaredWeight.error);
        return;
      }

      const parsedCodAmount = parseNumber(value.codAmount, "COD amount");
      if (parsedCodAmount.error || parsedCodAmount.value === null) {
        setServerError(parsedCodAmount.error);
        return;
      }

      if (requiresPickupLocation) {
        if (!value.originAreaId) {
          setServerError("Origin area is required for pick-drop.");
          return;
        }

        if (!value.pickupAddress || value.pickupAddress.trim().length === 0) {
          setServerError("Pickup address is required for pick-drop.");
          return;
        }
      }

      const payload: CreateParcelPayload = {
        categoryId: value.categoryId,
        destinationAreaId: value.destinationAreaId,
        speedId: value.speedId,
        pickupMethodId: initialPickupMethodId,
        deliveryMethodId: value.deliveryMethodId,
        declaredWeight: parsedDeclaredWeight.value,
        isFragile: value.isFragile,
        deliveryAddress: value.deliveryAddress,
        receiverName: value.receiverName,
        receiverContactNumber: value.receiverContactNumber,
        codAmount: parsedCodAmount.value,
        ...(requiresPickupLocation
          ? {
              originAreaId: value.originAreaId,
              pickupAddress: value.pickupAddress,
            }
          : {}),
      };

      const parsed = createParcelZodSchema.safeParse(payload);

      if (!parsed.success) {
        setServerError(
          parsed.error.issues[0]?.message || "Please fix form errors.",
        );
        return;
      }

      const toastId = toast.loading("Submitting pickup request...");

      try {
        const result = await mutateAsync(payload);

        if (!result.success) {
          setServerError(result.message || "Failed to create pickup request.");
          toast.error(result.message || "Failed to create pickup request.");
          return;
        }

        toast.success(result.message || "Pickup request created successfully.");
        form.reset();
        onSuccess?.();
      } catch (error: unknown) {
        const message = catchError(
          error,
          "An unexpected error occurred while creating pickup request.",
        );

        setServerError(message);
        toast.error(message);
      } finally {
        toast.dismiss(toastId);
      }
    },
  });

  return (
    <div className="space-y-4 overflow-auto max-h-[80vh]">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <form.Subscribe selector={(state) => state.values}>
        {(values) => (
          <DeliveryChargeDisplay
            values={values}
            pickupMethodId={initialPickupMethodId}
            requiresPickupLocation={requiresPickupLocation}
            defaultOriginAreaId="019d2ae7-d164-772a-91ce-59e29071e07b"
          />
        )}
      </form.Subscribe>

      <FieldSet disabled={isPending || form.state.isSubmitting}>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field
              name="categoryId"
              validators={{ onChange: createParcelZodSchema.shape.categoryId }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Category"
                  placeholder="Select category"
                  isSelect
                  selectType="category"
                />
              )}
            </form.Field>

            <form.Field
              name="destinationAreaId"
              validators={{
                onChange: createParcelZodSchema.shape.destinationAreaId,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Destination Area"
                  placeholder="Select destination area"
                  isSelect
                  selectType="area"
                  selectLabel="Destination Area"
                />
              )}
            </form.Field>

            {requiresPickupLocation && (
              <>
                <form.Field
                  name="originAreaId"
                  validators={{
                    onChange: ({ value }) => {
                      if (!requiresPickupLocation) {
                        return undefined;
                      }

                      if (!value || value.trim().length === 0) {
                        return "Origin area is required for pick-drop";
                      }

                      const parsed =
                        createParcelZodSchema.shape.originAreaId.safeParse(
                          value,
                        );
                      if (!parsed.success) {
                        return (
                          parsed.error.issues[0]?.message ||
                          "Invalid origin area"
                        );
                      }

                      return undefined;
                    },
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Origin Area"
                      placeholder="Select origin area"
                      isSelect
                      selectType="area"
                      selectLabel="Origin Area"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="pickupAddress"
                  validators={{
                    onChange: ({ value }) => {
                      if (!requiresPickupLocation) {
                        return undefined;
                      }

                      if (!value || value.trim().length === 0) {
                        return "Pickup address is required for pick-drop";
                      }

                      const parsed =
                        createParcelZodSchema.shape.pickupAddress.safeParse(
                          value,
                        );
                      if (!parsed.success) {
                        return (
                          parsed.error.issues[0]?.message ||
                          "Invalid pickup address"
                        );
                      }

                      return undefined;
                    },
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Pickup Address"
                      type="text"
                      placeholder="Enter pickup address"
                    />
                  )}
                </form.Field>
              </>
            )}

            <form.Field
              name="speedId"
              validators={{ onChange: createParcelZodSchema.shape.speedId }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Speed"
                  placeholder="Select speed"
                  isSelect
                  selectType="speed"
                />
              )}
            </form.Field>

            <form.Field
              name="deliveryMethodId"
              validators={{
                onChange: createParcelZodSchema.shape.deliveryMethodId,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Delivery Method"
                  placeholder="Select delivery method"
                  isSelect
                  selectType="deliveryMethod"
                />
              )}
            </form.Field>

            <form.Field name="isFragile">
              {(field) => (
                <div
                  className={cn("flex items-center gap-2 rounded-md mt-4 p-3")}
                >
                  <Checkbox
                    id="isFragile"
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(Boolean(checked))
                    }
                  />
                  <Label htmlFor="isFragile">This parcel is fragile</Label>
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field
              name="declaredWeight"
              validators={{
                onChange: ({ value }) => {
                  const parsed = parseNumber(value, "Declared weight");

                  if (parsed.error) {
                    return parsed.error;
                  }

                  const validated =
                    createParcelZodSchema.shape.declaredWeight.safeParse(
                      parsed.value,
                    );

                  if (!validated.success) {
                    return (
                      validated.error.issues[0]?.message ||
                      "Declared weight is invalid"
                    );
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Declared Weight"
                  type="number"
                  placeholder="Enter parcel weight"
                />
              )}
            </form.Field>

            <form.Field
              name="codAmount"
              validators={{
                onChange: ({ value }) => {
                  const parsed = parseNumber(value, "COD amount");

                  if (parsed.error) {
                    return parsed.error;
                  }

                  const validated =
                    createParcelZodSchema.shape.codAmount.safeParse(
                      parsed.value,
                    );

                  if (!validated.success) {
                    return (
                      validated.error.issues[0]?.message ||
                      "COD amount is invalid"
                    );
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="COD Amount"
                  type="number"
                  placeholder="Enter COD amount"
                />
              )}
            </form.Field>
          </div>

          <form.Field
            name="deliveryAddress"
            validators={{
              onChange: createParcelZodSchema.shape.deliveryAddress,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Delivery Address"
                type="text"
                placeholder="Enter delivery address"
              />
            )}
          </form.Field>

          <form.Field
            name="receiverName"
            validators={{ onChange: createParcelZodSchema.shape.receiverName }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Receiver Name"
                type="text"
                placeholder="Enter receiver name"
              />
            )}
          </form.Field>

          <form.Field
            name="receiverContactNumber"
            validators={{
              onChange: createParcelZodSchema.shape.receiverContactNumber,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Receiver Contact Number"
                type="text"
                placeholder="Enter receiver contact number"
              />
            )}
          </form.Field>

          <SubmitBtn isPending={isPending}>Submit Pickup Request</SubmitBtn>
        </form>
      </FieldSet>
    </div>
  );
};

export default CreateParcelRequestForm;
