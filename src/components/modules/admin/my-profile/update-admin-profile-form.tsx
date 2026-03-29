"use client";

import { updateAdminProfileAction } from "@/actions/user-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import { IAdmin } from "@/types/user-type";
import {
  UpdateAdminProfilePayload,
  updateAdminProfileZodSchema,
} from "@/validators/admin-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface UpdateAdminProfileFormProps {
  adminProfile: IAdmin;
  onSuccess?: () => void;
}

const UpdateAdminProfileForm = ({
  adminProfile,
  onSuccess,
}: UpdateAdminProfileFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateAdminProfilePayload) =>
      updateAdminProfileAction(payload),
  });

  console.log("Admin profile in form:", adminProfile);

  const form = useForm({
    defaultValues: {
      name: adminProfile.user.name,
      contactNumber: adminProfile.user.contactNumber,
      presentAddress: adminProfile.presentAddress || "",
      permanentAddress: adminProfile.permanentAddress || "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      try {
        const payload: UpdateAdminProfilePayload = {
          adminId: adminProfile.id,
          name: value.name,
          contactNumber: value.contactNumber,
          presentAddress: value.presentAddress,
          permanentAddress: value.permanentAddress,
        };

        const result = await mutateAsync(payload);

        if (!result.success) {
          setServerError(result.message || "Failed to update admin profile.");
          return;
        }

        setServerSuccess(result.message || "Profile updated successfully.");
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
                  updateAdminProfileZodSchema.shape.name.safeParse(value);
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
                placeholder="Enter your name"
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
                  updateAdminProfileZodSchema.shape.contactNumber.safeParse(
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
            name="presentAddress"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Present address cannot be empty";
                }

                const parsed =
                  updateAdminProfileZodSchema.shape.presentAddress.safeParse(
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
                  updateAdminProfileZodSchema.shape.permanentAddress.safeParse(
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

          <SubmitBtn isPending={isPending}>Update Profile</SubmitBtn>
        </form>
      </FieldSet>
    </div>
  );
};

export default UpdateAdminProfileForm;
