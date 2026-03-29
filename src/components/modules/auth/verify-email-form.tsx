"use client";

import { verifyEmailAction } from "@/actions/auth-action";
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
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import {
  IVerifyEmailPayload,
  verifyEmailZodSchema,
} from "@/validators/auth-validators";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VerifyEmailForm = ({ initialEmail }: { initialEmail?: string }) => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => verifyEmailAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: initialEmail || "",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to verify email.");
          return;
        }

        setServerSuccess(result.message || "Email verified successfully.");
        form.reset({
          email: value.email,
          otp: "",
        });

        const role = result.data?.user?.role;
        if (!role) {
          router.push("/login");
          return;
        }

        const targetRoute = getDefaultDashboardRoute(role);
        router.push(targetRoute);
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
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          Enter your email and 6-digit OTP to activate your ParcelKoy account.
          <p className="text-sm text-primary my-3">
            We just sent a verification code to your email({initialEmail}).
            Please check your inbox for the 6 digit OTP.
          </p>
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
              validators={{ onChange: verifyEmailZodSchema.shape.email }}
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

            <form.Field
              name="otp"
              validators={{ onChange: verifyEmailZodSchema.shape.otp }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="OTP"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                />
              )}
            </form.Field>

            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            {serverSuccess && (
              <Alert variant={"default"}>
                <AlertDescription>{serverSuccess}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <SubmitBtn
                  isPending={isSubmitting || isPending}
                  pendingLabel="Verifying..."
                  disabled={!canSubmit || isSubmitting}
                >
                  Verify Email
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

export default VerifyEmailForm;
