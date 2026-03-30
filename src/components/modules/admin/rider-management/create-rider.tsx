"use client";

import { createRiderAction } from "@/actions/rider-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import { createRiderZodSchema } from "@/validators/rider-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateRiderProps {
  onSuccess?: () => void;
}

const CreateRider = ({ onSuccess }: CreateRiderProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRiderAction,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "@Rider123",
      contactNumber: "",
      gender: "",
      presentAddress: "",
      permanentAddress: "",
      age: "",
      hubId: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const payload = {
        password: value.password.trim(),
        rider: {
          name: value.name.trim(),
          email: value.email.trim(),
          contactNumber: value.contactNumber.trim(),
          gender: value.gender,
          presentAddress: value.presentAddress.trim() || undefined,
          permanentAddress: value.permanentAddress.trim() || undefined,
          age: value.age.trim() ? Number(value.age) : undefined,
          hubId: value.hubId,
        },
      };

      const parsed = createRiderZodSchema.safeParse(payload);
      if (!parsed.success) {
        const message = parsed.error.issues[0]?.message || "Invalid payload";
        setServerError(message);
        toast.error(message);
        return;
      }

      const toastId = toast.loading("Creating rider...");

      try {
        const result = await mutateAsync(parsed.data);

        if (!result.success) {
          const message = result.message || "Failed to create rider";
          setServerError(message);
          toast.error(message);
          return;
        }

        await queryClient.invalidateQueries({ queryKey: ["riders"] });
        toast.success(result.message || "Rider created successfully.");
        onSuccess?.();
      } catch (error: unknown) {
        const message = catchError(
          error,
          "An unexpected error occurred. Please try again.",
        );
        setServerError(message);
        toast.error(message);
      } finally {
        toast.dismiss(toastId);
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
              onChange: createRiderZodSchema.shape.rider.shape.name,
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
            name="email"
            validators={{
              onChange: createRiderZodSchema.shape.rider.shape.email,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="Enter email"
              />
            )}
          </form.Field>

          <form.Field
            name="contactNumber"
            validators={{
              onChange: createRiderZodSchema.shape.rider.shape.contactNumber,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Contact Number"
                type="text"
                placeholder="01XXXXXXXXX"
              />
            )}
          </form.Field>

          <form.Field name="gender">
            {(field) => (
              <AppField
                field={field}
                label="Gender"
                isSelect
                selectType="gender"
                placeholder="Select gender"
              />
            )}
          </form.Field>

          <form.Field name="presentAddress">
            {(field) => (
              <AppField
                field={field}
                label="Present Address"
                type="text"
                placeholder="Enter present address"
              />
            )}
          </form.Field>

          <form.Field name="permanentAddress">
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
                  return undefined;
                }

                const parsed = Number(value);
                if (!Number.isInteger(parsed)) {
                  return "Age must be an integer";
                }
                if (parsed < 18) {
                  return "Rider age must be at least 18";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Age (Optional)"
                type="number"
                placeholder="Enter age"
              />
            )}
          </form.Field>

          <form.Field
            name="hubId"
            validators={{
              onChange: createRiderZodSchema.shape.rider.shape.hubId,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Hub"
                isSelect
                selectType="hub"
                placeholder="Select hub"
              />
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: createRiderZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                append={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-transparent focus-visible:bg-transparent active:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <SubmitBtn isPending={isPending}>Create Rider</SubmitBtn>
        </form>
      </FieldSet>
    </div>
  );
};

export default CreateRider;
