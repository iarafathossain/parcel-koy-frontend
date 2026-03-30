"use client";

import { createMethodAction } from "@/actions/method-action";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { catchError } from "@/helpers/catch-error";
import { MethodType } from "@/types/enum-type";
import { createMethodZodSchema } from "@/validators/method-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface CreateMethodProps {
  onSuccess?: () => void;
}

const CreateMethod = ({ onSuccess }: CreateMethodProps) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>(MethodType.PICKUP);
  const [description, setDescription] = useState<string>("");
  const [baseFee, setBaseFee] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createMethodAction,
  });

  const handleSubmit = async () => {
    setServerError(null);

    const trimmedFee = baseFee.trim();
    const parsedBaseFee = trimmedFee === "" ? undefined : Number(trimmedFee);

    const payload = {
      name: name.trim(),
      type,
      description: description.trim() || undefined,
      baseFee: parsedBaseFee,
      isActive,
    };

    const parsed = createMethodZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Creating method...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to create method";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["methods"] });
      toast.success(result.message || "Method created successfully.");
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
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <Card className="p-4 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="method-name">Method Name</Label>
          <Input
            id="method-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter method name"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="method-type">Method Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="method-type" disabled={isPending}>
              <SelectValue placeholder="Select method type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MethodType.PICKUP}>Pickup</SelectItem>
              <SelectItem value={MethodType.DELIVERY}>Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="method-description">Description (Optional)</Label>
          <Textarea
            id="method-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter method description"
            rows={3}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="method-base-fee">Base Fee (Optional)</Label>
          <Input
            id="method-base-fee"
            type="number"
            value={baseFee}
            onChange={(e) => setBaseFee(e.target.value)}
            placeholder="e.g., 20"
            step="0.01"
            min="0"
            disabled={isPending}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            disabled={isPending}
          />
          Active Method
        </label>

        <SubmitBtn isPending={isPending}>Create Method</SubmitBtn>
      </Card>
    </form>
  );
};

export default CreateMethod;
