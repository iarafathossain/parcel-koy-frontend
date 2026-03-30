"use client";

import { createAdminAction } from "@/actions/admin-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import { Gender } from "@/types/enum-type";
import { createAdminZodSchema } from "@/validators/admin-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateAdminProps {
  onSuccess?: () => void;
}

const CreateAdmin = ({ onSuccess }: CreateAdminProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAdminAction,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      gender: Gender.MALE,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const payload = {
        password: value.password.trim(),
        admin: {
          name: value.name.trim(),
          email: value.email.trim(),
          contactNumber: value.contactNumber.trim(),
          gender: value.gender,
        },
      };

      const parsed = createAdminZodSchema.safeParse(payload);
      if (!parsed.success) {
        const message = parsed.error.issues[0]?.message || "Invalid payload";
        setServerError(message);
        toast.error(message);
        return;
      }

      const toastId = toast.loading("Creating admin...");

      try {
        const result = await mutateAsync(parsed.data);

        if (!result.success) {
          const message = result.message || "Failed to create admin";
          setServerError(message);
          toast.error(message);
          return;
        }

        await queryClient.invalidateQueries({ queryKey: ["admins"] });
        toast.success(result.message || "Admin created successfully.");
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
              onChange: createAdminZodSchema.shape.admin.shape.name,
            }}
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
            validators={{
              onChange: createAdminZodSchema.shape.admin.shape.email,
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
              onChange: createAdminZodSchema.shape.admin.shape.contactNumber,
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

          <form.Field
            name="password"
            validators={{ onChange: createAdminZodSchema.shape.password }}
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

          <SubmitBtn isPending={isPending}>Create Admin</SubmitBtn>
        </form>
      </FieldSet>
    </div>
  );
};

export default CreateAdmin;
