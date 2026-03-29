"use client";

import { registerMerchantAction } from "@/actions/auth-action";
import AppField from "@/components/shared/app-field";
import SubmitBtn from "@/components/shared/submit-btn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldSet } from "@/components/ui/field";
import { catchError } from "@/helpers/catch-error";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { registerMerchantZodSchema } from "@/validators/auth-validators";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      contactNumber: "",
      pickupAddress: "",
      originAreaId: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Registering merchant...");
      try {
        const { success, message, data } = await registerMerchantAction(value);

        if (!success) {
          toast.error(message || "Failed to register merchant.");
        } else {
          toast.success("Merchant registered successfully.");

          const role = data?.user?.role;
          if (!role) {
            toast.error("User role is missing. Please login again.");
            return;
          }

          form.reset();

          const defaultDashboardRoute = getDefaultDashboardRoute(role);
          window.location.href = defaultDashboardRoute;
        }
      } catch (error: unknown) {
        toast.error(catchError(error));
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-center">Become a Merchant</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="name"
              validators={{ onChange: registerMerchantZodSchema.shape.name }}
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
              name="email"
              validators={{ onChange: registerMerchantZodSchema.shape.email }}
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
              name="businessName"
              validators={{
                onChange: registerMerchantZodSchema.shape.businessName,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Business Name"
                  type="text"
                  placeholder="Enter your business name"
                />
              )}
            </form.Field>
            <form.Field
              name="contactNumber"
              validators={{
                onChange: registerMerchantZodSchema.shape.contactNumber,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Contact Number"
                  type="text"
                  placeholder="Enter your contact number"
                />
              )}
            </form.Field>
            <form.Field
              name="pickupAddress"
              validators={{
                onChange: registerMerchantZodSchema.shape.pickupAddress,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Pickup Address"
                  type="text"
                  placeholder="Enter your pickup address"
                />
              )}
            </form.Field>
            <form.Field
              name="originAreaId"
              validators={{
                onChange: registerMerchantZodSchema.shape.originAreaId,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Origin Area"
                  type="text"
                  placeholder="Select pickup address area"
                  isSelect={true}
                />
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onChange: registerMerchantZodSchema.shape.password,
              }}
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

            <form.Field
              name="confirmPassword"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value, fieldApi }) => {
                  const requiredError =
                    registerMerchantZodSchema.shape.confirmPassword.safeParse(
                      value,
                    );

                  if (!requiredError.success) {
                    return (
                      requiredError.error.issues[0]?.message ||
                      "Confirm password is required"
                    );
                  }

                  const password = fieldApi.form.getFieldValue("password");
                  if (value !== password) {
                    return "Confirm password must match password";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  append={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-transparent focus-visible:bg-transparent active:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      type="button"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <div>
              <SubmitBtn isPending={loading}>Sign Up</SubmitBtn>
              <p className="text-center">
                By clicking Sign Up you are agreeing with our{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Terms and Conditions
                </Link>
              </p>
            </div>

            <p className="text-center my-3">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline underline-offset-4"
              >
                Log in
              </Link>{" "}
              here.
            </p>
          </form>
        </FieldSet>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
