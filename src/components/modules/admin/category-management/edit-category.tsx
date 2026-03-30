"use client";

import { updateCategoryBySlugAction } from "@/actions/category-action";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catchError } from "@/helpers/catch-error";
import { ICategory } from "@/types/category-type";
import { updateCategoryZodSchema } from "@/validators/category-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface EditCategoryProps {
  category: ICategory;
  onSuccess?: () => void;
}

const EditCategory = ({ category, onSuccess }: EditCategoryProps) => {
  const [name, setName] = useState<string>(category.name);
  const [baseWeight, setBaseWeight] = useState<string>(
    String(category.baseWeight),
  );
  const [baseFee, setBaseFee] = useState<string>(category.baseFee);
  const [isActive, setIsActive] = useState<boolean>(category.isActive);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: Parameters<typeof updateCategoryBySlugAction>[1]) =>
      updateCategoryBySlugAction(category.slug, payload),
  });

  const handleSubmit = async () => {
    setServerError(null);

    const payload = {
      name: name.trim() !== category.name ? name.trim() : undefined,
      baseWeight:
        parseSingleNumber(baseWeight) !== category.baseWeight
          ? parseSingleNumber(baseWeight)
          : undefined,
      baseFee:
        baseFee && parseSingleNumber(baseFee) !== parseFloat(category.baseFee)
          ? parseSingleNumber(baseFee)
          : undefined,
      isActive: isActive !== category.isActive ? isActive : undefined,
    };

    const parsed = updateCategoryZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Updating category...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to update category";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(result.message || "Category updated successfully.");
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
          <Label htmlFor="edit-category-name">Category Name</Label>
          <Input
            id="edit-category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-category-base-weight">Base Weight (kg)</Label>
          <Input
            id="edit-category-base-weight"
            type="number"
            value={baseWeight}
            onChange={(e) => setBaseWeight(e.target.value)}
            placeholder="e.g., 1"
            step="0.01"
            min="0"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-category-base-fee">Base Fee (Optional)</Label>
          <Input
            id="edit-category-base-fee"
            type="number"
            value={baseFee}
            onChange={(e) => setBaseFee(e.target.value)}
            placeholder="e.g., 50"
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
          Active Category
        </label>

        <SubmitBtn isPending={isPending}>Update Category</SubmitBtn>
      </Card>
    </form>
  );
};

export default EditCategory;
