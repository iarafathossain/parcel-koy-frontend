"use client";

import { resetPasswordAction } from "@/actions/auth-action";
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
  IResetPasswordPayload,
  resetPasswordZodSchema,
} from "@/validators/auth-validators";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formatCountdown = (seconds: number) => {
  const minute = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const second = (seconds % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

const ResetPasswordForm = ({
  initialEmail,
  otpDurationInSeconds,
}: {
  initialEmail?: string;
  otpDurationInSeconds: number;
}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(otpDurationInSeconds);

  useEffect(() => {
    if (otpDurationInSeconds <= 0) {
      return;
    }

    const endAt = Date.now() + otpDurationInSeconds * 1000;

    const intervalId = setInterval(() => {
      const remainingSeconds = Math.max(
        0,
        Math.ceil((endAt - Date.now()) / 1000),
      );
      setSecondsLeft(remainingSeconds);

      if (remainingSeconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [otpDurationInSeconds]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IResetPasswordPayload) =>
      resetPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: initialEmail || "",
      otp: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to reset password.");
          return;
        }

        setServerSuccess(result.message || "Password reset successful.");
        form.reset({
          email: value.email,
          otp: "",
          newPassword: "",
        });

        router.push("/login");
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
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your email, OTP, and set a new secure password.
          {secondsLeft > 0 ? (
            <p className="mt-3 text-sm text-foreground/80">
              OTP expires in <span className="font-semibold">{formatCountdown(secondsLeft)}</span>
            </p>
          ) : (
            <p className="mt-3 text-sm text-destructive">
              OTP has expired. Request a new OTP from Forgot Password.
            </p>
          )}
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
              validators={{ onChange: resetPasswordZodSchema.shape.email }}
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
              validators={{ onChange: resetPasswordZodSchema.shape.otp }}
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

            <form.Field
              name="newPassword"
              validators={{
                onChange: resetPasswordZodSchema.shape.newPassword,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
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
                  pendingLabel="Resetting..."
                  disabled={!canSubmit || isSubmitting}
                >
                  Reset Password
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

export default ResetPasswordForm;
