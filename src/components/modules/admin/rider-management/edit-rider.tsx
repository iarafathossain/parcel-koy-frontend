"use client";

import {
  getUserInfoAction,
  updateRiderProfileAction,
} from "@/actions/user-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import { useUser } from "@/hooks/use-user";
import { IRider } from "@/types/user-type";
import {
  UpdateRiderProfilePayload,
  updateRiderProfileZodSchema,
} from "@/validators/rider-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface EditRiderProps {
  rider: IRider;
  onSuccess?: () => void;
}

const EditRider = ({ rider, onSuccess }: EditRiderProps) => {
  const { user } = useUser();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: currentUserResponse } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getUserInfoAction(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateRiderProfilePayload) =>
      updateRiderProfileAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: rider.user.name,
      contactNumber: rider.user.contactNumber,
      gender: rider.user.gender,
      presentAddress: rider.presentAddress || "",
      permanentAddress: rider.permanentAddress || "",
      age: String(rider.age || ""),
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      const riderIdFromContext =
        user?.riderProfile?.id ?? currentUserResponse?.riderProfile?.id;
      const riderId = rider.id || riderIdFromContext;

      if (!riderId) {
        setServerError("Rider ID is missing. Please refresh and try again.");
        return;
      }

      try {
        const payload: UpdateRiderProfilePayload = {
          riderId,
          name: value.name,
          contactNumber: value.contactNumber,
          gender: value.gender,
          presentAddress: value.presentAddress,
          permanentAddress: value.permanentAddress,
          age: Number(value.age),
        };

        const result = await mutateAsync(payload);

        if (!result.success) {
          setServerError(result.message || "Failed to update rider profile.");
          return;
        }

        setServerSuccess(result.message || "Rider updated successfully.");
        await queryClient.invalidateQueries({ queryKey: ["riders"] });
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
                  updateRiderProfileZodSchema.shape.name.safeParse(value);
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
                placeholder="Enter rider name"
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
                  updateRiderProfileZodSchema.shape.contactNumber.safeParse(
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
                  updateRiderProfileZodSchema.shape.gender.safeParse(value);
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
            name="presentAddress"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Present address cannot be empty";
                }

                const parsed =
                  updateRiderProfileZodSchema.shape.presentAddress.safeParse(
                    value,
                  );
                if (!parsed.success) {
                  return (
                    parsed.error.issues[0]?.message || "Invalid present address"
                  );
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Present Address"
                type="text"
                placeholder="Enter present address"
              />
            )}
          </form.Field>

          <form.Field
            name="permanentAddress"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Permanent address cannot be empty";
                }

                const parsed =
                  updateRiderProfileZodSchema.shape.permanentAddress.safeParse(
                    value,
                  );
                if (!parsed.success) {
                  return (
                    parsed.error.issues[0]?.message ||
                    "Invalid permanent address"
                  );
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Permanent Address"
                type="text"
                placeholder="Enter permanent address"
              />
            )}
          </form.Field>

          <form.Field
            name="age"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Age is required";
                }

                const parsedNumber = Number(value);

                if (Number.isNaN(parsedNumber)) {
                  return "Age must be a valid number";
                }

                const parsed =
                  updateRiderProfileZodSchema.shape.age.safeParse(parsedNumber);
                if (!parsed.success) {
                  return parsed.error.issues[0]?.message || "Invalid age";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Age"
                type="number"
                placeholder="Enter rider age"
              />
            )}
          </form.Field>

          <SubmitBtn isPending={isPending}>Update Rider</SubmitBtn>
        </form>
      </FieldSet>
    </div>
  );
};

export default EditRider;
