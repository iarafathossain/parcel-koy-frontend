"use client";

import { updateMerchantProfileAction } from "@/actions/user-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import { useUser } from "@/hooks/use-user";
import { IMerchant } from "@/types/user-type";
import {
  UpdateMerchantProfilePayload,
  updateMerchantProfileZodSchema,
} from "@/validators/merchant-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface EditMerchantProps {
  merchant: IMerchant;
  onSuccess?: () => void;
}

const EditMerchant = ({ merchant, onSuccess }: EditMerchantProps) => {
  const { user } = useUser();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateMerchantProfilePayload) =>
      updateMerchantProfileAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: merchant.user.name,
      gender: merchant.user.gender,
      contactNumber: merchant.user.contactNumber,
      businessName: merchant.businessName,
      pickupAddress: merchant.pickupAddress,
      originAreaId: merchant.originArea.id,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      const merchantIdFromContext = user?.merchantProfile?.id;
      const merchantId = merchant.id || merchantIdFromContext;

      if (!merchantId) {
        setServerError("Merchant ID is missing. Please refresh and try again.");
        return;
      }

      try {
        const payload: UpdateMerchantProfilePayload = {
          merchantId,
          name: value.name,
          gender: value.gender,
          contactNumber: value.contactNumber,
          businessName: value.businessName,
          pickupAddress: value.pickupAddress,
          originAreaId: value.originAreaId,
        };

        const result = await mutateAsync(payload);

        if (!result.success) {
          setServerError(
            result.message || "Failed to update merchant profile.",
          );
          return;
        }

        setServerSuccess(result.message || "Merchant updated successfully.");
        await queryClient.invalidateQueries({ queryKey: ["merchants"] });
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
        onSuccess?.();
      } catch (error: unknown) {
        setServerError(
          catchError(error, "An unexpected error occurred. Please try again."),
        );
      }
    },
  });

  return (
    <div className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      {serverSuccess && (
        <Alert>
          <AlertDescription>{serverSuccess}</AlertDescription>
        </Alert>
      )}

      <FieldSet disabled={isPending || form.state.isSubmitting}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Name cannot be empty";
                }

                const parsed =
                  updateMerchantProfileZodSchema.shape.name.safeParse(value);
                if (!parsed.success) {
                  return parsed.error.issues[0]?.message || "Invalid name";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Name"
                type="text"
                placeholder="Enter merchant name"
              />
            )}
          </form.Field>

          <form.Field
            name="contactNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Contact number is required";
                }

                const parsed =
                  updateMerchantProfileZodSchema.shape.contactNumber.safeParse(
                    value,
                  );
                if (!parsed.success) {
                  return (
                    parsed.error.issues[0]?.message || "Invalid contact number"
                  );
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Contact Number"
                type="text"
                placeholder="Enter contact number"
              />
            )}
          </form.Field>

          <form.Field
            name="gender"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Gender is required";
                }

                const parsed =
                  updateMerchantProfileZodSchema.shape.gender.safeParse(value);
                if (!parsed.success) {
                  return parsed.error.issues[0]?.message || "Invalid gender";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Gender"
                placeholder="Select gender"
                isSelect
                selectType="gender"
              />
            )}
          </form.Field>

          <form.Field
            name="businessName"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Business name cannot be empty";
                }

                const parsed =
                  updateMerchantProfileZodSchema.shape.businessName.safeParse(
                    value,
                  );
                if (!parsed.success) {
                  return (
                    parsed.error.issues[0]?.message || "Invalid business name"
                  );
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Business Name"
                type="text"
                placeholder="Enter business name"
              />
            )}
          </form.Field>

          <form.Field
            name="pickupAddress"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Pickup address cannot be empty";
                }

                const parsed =
                  updateMerchantProfileZodSchema.shape.pickupAddress.safeParse(
                    value,
                  );
                if (!parsed.success) {
                  return (
                    parsed.error.issues[0]?.message || "Invalid pickup address"
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

          <form.Field
            name="originAreaId"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Origin area is required";
                }

                const parsed =
                  updateMerchantProfileZodSchema.shape.originAreaId.safeParse(
                    value,
                  );
                if (!parsed.success) {
                  return (
                    parsed.error.issues[0]?.message || "Invalid origin area"
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
              />
            )}
          </form.Field>

          <SubmitBtn isPending={isPending}>Update Merchant</SubmitBtn>
        </form>
      </FieldSet>
    </div>
  );
};

export default EditMerchant;
