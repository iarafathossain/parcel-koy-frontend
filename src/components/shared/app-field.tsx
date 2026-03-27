import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import { ReactNode } from "react";

import AreaSelection from "./area-selection";

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  append?: ReactNode;
  prepend?: ReactNode;
  className?: string;
  disabled?: boolean;
  isSelect?: boolean;
};

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return String(error);
};

const AppField = ({
  field,
  label,
  type = "text",
  placeholder,
  append,
  prepend,
  className,
  disabled = false,
  isSelect = false,
}: AppFieldProps) => {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;

  const hasError = firstError !== null;
  return (
    <Field className={cn("space-y-1.5", className)}>
      <Label
        htmlFor={field.name}
        className={cn(hasError && "text-destructive")}
      >
        {label}
      </Label>

      {isSelect ? (
        <AreaSelection placeholder={placeholder} />
      ) : (
        <div className="relative">
          {prepend && (
            <div
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 pl-3 z-10",
                hasError && "-translate-y-4/5",
              )}
            >
              {prepend}
            </div>
          )}

          <Input
            name={field.name}
            id={field.name}
            type={type}
            value={field.state.value}
            placeholder={placeholder}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${field.name}-error` : undefined}
            className={cn(
              prepend && "pl-10",
              append && "pr-10",
              hasError &&
                "border-destructive focus-visible:ring-destructive/20",
            )}
          />

          {append && (
            <div
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 pr-3 z-10",
                hasError && "-translate-y-4/5",
              )}
            >
              {append}
            </div>
          )}

          {hasError && (
            <p
              id={`${field.name}-error`}
              role="alert"
              className="mt-1 text-sm text-destructive"
            >
              {firstError}
            </p>
          )}
        </div>
      )}
    </Field>
  );
};

export default AppField;
