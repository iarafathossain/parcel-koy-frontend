"use client";

import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import { IAdmin } from "@/types/user-type";
import {
  IUpdateAdminPayload,
  updateAdminZodSchema,
} from "@/validators/admin-validators";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface EditAdminProps {
  admin: IAdmin;
}

const EditAdmin = ({ admin }: EditAdminProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: IUpdateAdminPayload) => {
      // TODO: Replace with actual API call
      // Example:
      // return await updateAdminAction(admin.id, payload);
      console.log("Updating admin with payload:", payload);
      return { success: true, data: payload };
    },
  });

  const form = useForm({
    defaultValues: {
      name: admin.user.name,
      email: admin.user.email,
      contactNumber: admin.user.contactNumber,
      presentAddress: admin.presentAddress || "",
      permanentAddress: admin.permanentAddress || "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setSuccessMessage(null);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(result.message || "Failed to update admin.");
          return;
        }

        setSuccessMessage("Admin updated successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error: unknown) {
        console.error("Update error:", error);
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

      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            {successMessage}
          </AlertDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="name"
              validators={{ onChange: updateAdminZodSchema.shape.name }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Full Name"
                  type="text"
                  placeholder="Enter full name"
                />
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{ onChange: updateAdminZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                />
              )}
            </form.Field>
          </div>

          <form.Field
            name="contactNumber"
            validators={{ onChange: updateAdminZodSchema.shape.contactNumber }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Contact Number"
                type="text"
                placeholder="Enter 11-digit contact number"
              />
            )}
          </form.Field>

          <form.Field
            name="presentAddress"
            validators={{ onChange: updateAdminZodSchema.shape.presentAddress }}
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
              onChange: updateAdminZodSchema.shape.permanentAddress,
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

          <SubmitBtn isPending={isPending}>Update Admin</SubmitBtn>
        </form>
      </FieldSet>
    </div>
  );
};

export default EditAdmin;
