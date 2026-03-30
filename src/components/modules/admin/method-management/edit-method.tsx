"use client";

import { updateMethodBySlugAction } from "@/actions/method-action";
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
import { IMethod } from "@/types/method-type";
import { updateMethodZodSchema } from "@/validators/method-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface EditMethodProps {
  method: IMethod;
  onSuccess?: () => void;
}

const EditMethod = ({ method, onSuccess }: EditMethodProps) => {
  const [name, setName] = useState<string>(method.name);
  const [type, setType] = useState<string>(method.type);
  const [description, setDescription] = useState<string>(
    method.description || "",
  );
  const [baseFee, setBaseFee] = useState<string>(method.baseFee);
  const [isActive, setIsActive] = useState<boolean>(method.isActive);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: Parameters<typeof updateMethodBySlugAction>[1]) =>
      updateMethodBySlugAction(method.slug, payload),
  });

  const handleSubmit = async () => {
    setServerError(null);

    const trimmedBaseFee = baseFee.trim();
    const parsedCurrentBaseFee = Number(method.baseFee);
    const parsedNextBaseFee =
      trimmedBaseFee === "" ? undefined : Number(trimmedBaseFee);

    const payload = {
      name: name.trim() !== method.name ? name.trim() : undefined,
      type: type !== method.type ? type : undefined,
      description:
        description.trim() !== (method.description || "")
          ? description.trim() || undefined
          : undefined,
      baseFee:
        parsedNextBaseFee !== undefined &&
        !Number.isNaN(parsedNextBaseFee) &&
        parsedNextBaseFee !== parsedCurrentBaseFee
          ? parsedNextBaseFee
          : undefined,
      isActive: isActive !== method.isActive ? isActive : undefined,
    };

    const parsed = updateMethodZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Updating method...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to update method";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["methods"] });
      toast.success(result.message || "Method updated successfully.");
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
          <Label htmlFor="edit-method-name">Method Name</Label>
          <Input
            id="edit-method-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter method name"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-method-type">Method Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="edit-method-type" disabled={isPending}>
              <SelectValue placeholder="Select method type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MethodType.PICKUP}>Pickup</SelectItem>
              <SelectItem value={MethodType.DELIVERY}>Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-method-description">
            Description (Optional)
          </Label>
          <Textarea
            id="edit-method-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter method description"
            rows={3}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-method-base-fee">Base Fee (Optional)</Label>
          <Input
            id="edit-method-base-fee"
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

        <SubmitBtn isPending={isPending}>Update Method</SubmitBtn>
      </Card>
    </form>
  );
};

export default EditMethod;
