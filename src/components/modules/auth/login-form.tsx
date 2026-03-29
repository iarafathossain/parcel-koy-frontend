"use client";

import { loginAction } from "@/actions/auth-action";
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
  ILoginUserPayload,
  loginUserZodSchema,
} from "@/validators/auth-validators";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirectTo }: { redirectTo?: string }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginUserPayload) =>
      loginAction(payload, redirectTo),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = (await mutateAsync(value)) as any;

        // redirect to verify-email page if email is not verified
        if (result?.message === "Email not verified") {
          router.push(`/verify-email?email=${value.email}`);
          return;
        }

        // redirect to forgot-password page if needPasswordChange flag is true
        if (result?.message === "needPasswordChange flag is true.") {
          router.push(`/forgot-password?email=${value.email}`);
          toast.error("Your password has expired. Please reset your password.");
          return;
        }

        if (!result.success) {
          setServerError(result.message || "Login failed. Please try again.");
          return;
        }
      } catch (error: unknown) {
        console.error("Login error:", error);
        setServerError(
          catchError(error, "An unexpected error occurred. Please try again."),
        );
      }
    },
  });
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
        <CardDescription className="text-center">
          Please enter your credentials to login.
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
              validators={{ onChange: loginUserZodSchema.shape.email }}
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
              name="password"
              validators={{ onChange: loginUserZodSchema.shape.password }}
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

            <div className="text-right mt-2">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>

            {serverError && (
              <Alert variant={"destructive"}>
                {serverError === "read ECONNRESET" ? (
                  <AlertDescription>
                    Network error: Please check your internet connection and try
                    again.
                  </AlertDescription>
                ) : (
                  <AlertDescription>{serverError}</AlertDescription>
                )}
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <SubmitBtn
                  isPending={isSubmitting || isPending}
                  pendingLabel="Logging In..."
                  disabled={!canSubmit || isSubmitting}
                >
                  Log In
                </SubmitBtn>
              )}
            </form.Subscribe>
          </form>
        </FieldSet>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Sign Up for an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
