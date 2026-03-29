"use client";

import { forgotPasswordAction } from "@/actions/auth-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  forgotPasswordZodSchema,
  IForgotPasswordPayload,
} from "@/validators/auth-validators";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IForgotPasswordPayload) =>
      forgotPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to send OTP.");
          return;
        }

        setServerSuccess(result.message || "OTP sent to your email.");
        router.push(`/reset-password?email=${encodeURIComponent(value.email)}`);
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
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your account email and we will send a 6-digit OTP.
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
              name="email"
              validators={{ onChange: forgotPasswordZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
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
                  pendingLabel="Sending OTP..."
                  disabled={!canSubmit || isSubmitting}
                >
                  Send OTP
                </SubmitBtn>
              )}
            </form.Subscribe>
          </form>
        </FieldSet>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4 text-sm text-muted-foreground">
        Back to
        <Link
          href="/login"
          className="ml-1 text-primary font-medium hover:underline underline-offset-4"
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
