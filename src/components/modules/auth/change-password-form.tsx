"use client";

import { changePasswordAction } from "@/actions/auth-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import {
  IChangePasswordPayload,
  changePasswordZodSchema,
} from "@/validators/auth-validators";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ChangePasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IChangePasswordPayload) =>
      changePasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      const parsed = changePasswordZodSchema.safeParse(value);
      if (!parsed.success) {
        const message = parsed.error.issues[0]?.message || "Invalid input";
        setServerError(message);
        return;
      }

      try {
        const result = await mutateAsync(parsed.data);

        if (!result.success) {
          setServerError(result.message || "Failed to change password.");
          return;
        }

        setServerSuccess(result.message || "Password changed successfully.");
        form.reset();

        setTimeout(() => {
          router.push("/my-profile");
        }, 600);
      } catch (error: unknown) {
        setServerError(
          catchError(error, "An unexpected error occurred. Please try again."),
        );
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
        <CardDescription>
          Use a strong new password to keep your account secure.
        </CardDescription>
      </CardHeader>

      <CardContent>
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
              name="currentPassword"
              validators={{
                onChange: changePasswordZodSchema.shape.currentPassword,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Current Password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  append={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-transparent focus-visible:bg-transparent active:bg-transparent"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      type="button"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="newPassword"
              validators={{
                onChange: changePasswordZodSchema.shape.newPassword,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  append={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-transparent focus-visible:bg-transparent active:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      type="button"
                    >
                      {showNewPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>
                  }
                />
              )}
            </form.Field>

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

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <SubmitBtn
                  isPending={isSubmitting || isPending}
                  pendingLabel="Updating..."
                  disabled={!canSubmit || isSubmitting}
                >
                  Update Password
                </SubmitBtn>
              )}
            </form.Subscribe>
          </form>
        </FieldSet>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4 text-sm text-muted-foreground">
        Back to
        <Link
          href="/my-profile"
          className="ml-1 text-primary font-medium hover:underline underline-offset-4"
        >
          My Profile
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
