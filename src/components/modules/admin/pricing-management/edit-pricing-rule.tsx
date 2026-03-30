"use client";

import { getAllCategoriesAction } from "@/actions/category-action";
import { getAllMethodsAction } from "@/actions/method-action";
import { getAllSpeedsAction } from "@/actions/speed-action";
import { updatePricingByIdAction } from "@/actions/pricing-action";
import { getAllZonesAction } from "@/actions/zone-action";
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
import { catchError } from "@/helpers/catch-error";
import { IPricingRule } from "@/types/pricing-type";
import { updatePricingZodSchema } from "@/validators/pricing-validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface EditPricingRuleProps {
  rule: IPricingRule;
  onSuccess?: () => void;
}

const EditPricingRule = ({ rule, onSuccess }: EditPricingRuleProps) => {
  const [originalZoneId, setOriginalZoneId] = useState<string>(rule.originalZoneId);
  const [destinationZoneId, setDestinationZoneId] = useState<string>(
    rule.destinationZoneId,
  );
  const [categoryId, setCategoryId] = useState<string>(rule.categoryId || "none");
  const [speedId, setSpeedId] = useState<string>(rule.speedId);
  const [pickupMethodId, setPickupMethodId] = useState<string>(rule.pickupMethodId);
  const [deliveryMethodId, setDeliveryMethodId] = useState<string>(
    rule.deliveryMethodId,
  );
  const [minWeight, setMinWeight] = useState<string>(String(rule.minWeight));
  const [maxWeight, setMaxWeight] = useState<string>(String(rule.maxWeight));
  const [price, setPrice] = useState<string>(String(rule.price));
  const [isActive, setIsActive] = useState<boolean>(rule.isActive);
  const [serverError, setServerError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: zonesResponse } = useQuery({
    queryKey: ["zones", "for-pricing-edit"],
    queryFn: () => getAllZonesAction(""),
  });

  const { data: categoriesResponse } = useQuery({
    queryKey: ["categories", "for-pricing-edit"],
    queryFn: () => getAllCategoriesAction(""),
  });

  const { data: speedsResponse } = useQuery({
    queryKey: ["speeds", "for-pricing-edit"],
    queryFn: () => getAllSpeedsAction(""),
  });

  const { data: methodsResponse } = useQuery({
    queryKey: ["methods", "for-pricing-edit"],
    queryFn: () => getAllMethodsAction(""),
  });

  const zones = zonesResponse?.data || [];
  const categories = categoriesResponse?.data || [];
  const speeds = speedsResponse?.data || [];
  const methods = methodsResponse?.data || [];

  const pickupMethods = methods.filter((method) => method.type === "PICKUP");
  const deliveryMethods = methods.filter(
    (method) => method.type === "DELIVERY",
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: Parameters<typeof updatePricingByIdAction>[1]) =>
      updatePricingByIdAction(rule.id, payload),
  });

  const handleSubmit = async () => {
    setServerError(null);

    const nextMinWeight = Number(minWeight);
    const nextMaxWeight = Number(maxWeight);
    const nextPrice = Number(price);

    const payload = {
      originalZoneId:
        originalZoneId !== rule.originalZoneId ? originalZoneId : undefined,
      destinationZoneId:
        destinationZoneId !== rule.destinationZoneId
          ? destinationZoneId
          : undefined,
      categoryId:
        categoryId === "none"
          ? null
          : categoryId !== (rule.categoryId || "none")
            ? categoryId
            : undefined,
      speedId: speedId !== rule.speedId ? speedId : undefined,
      pickupMethodId:
        pickupMethodId !== rule.pickupMethodId ? pickupMethodId : undefined,
      deliveryMethodId:
        deliveryMethodId !== rule.deliveryMethodId
          ? deliveryMethodId
          : undefined,
      minWeight: nextMinWeight !== rule.minWeight ? nextMinWeight : undefined,
      maxWeight: nextMaxWeight !== rule.maxWeight ? nextMaxWeight : undefined,
      price: nextPrice !== Number(rule.price) ? nextPrice : undefined,
      isActive: isActive !== rule.isActive ? isActive : undefined,
    };

    const parsed = updatePricingZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Updating pricing rule...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to update pricing rule";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["pricing-rules"] });
      toast.success(result.message || "Pricing rule updated successfully.");
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Origin Zone</Label>
            <Select value={originalZoneId} onValueChange={setOriginalZoneId}>
              <SelectTrigger disabled={isPending}>
                <SelectValue placeholder="Select origin zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Destination Zone</Label>
            <Select
              value={destinationZoneId}
              onValueChange={setDestinationZoneId}
            >
              <SelectTrigger disabled={isPending}>
                <SelectValue placeholder="Select destination zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger disabled={isPending}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Speed</Label>
            <Select value={speedId} onValueChange={setSpeedId}>
              <SelectTrigger disabled={isPending}>
                <SelectValue placeholder="Select speed" />
              </SelectTrigger>
              <SelectContent>
                {speeds.map((speed) => (
                  <SelectItem key={speed.id} value={speed.id}>
                    {speed.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Pickup Method</Label>
            <Select value={pickupMethodId} onValueChange={setPickupMethodId}>
              <SelectTrigger disabled={isPending}>
                <SelectValue placeholder="Select pickup method" />
              </SelectTrigger>
              <SelectContent>
                {pickupMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Delivery Method</Label>
            <Select value={deliveryMethodId} onValueChange={setDeliveryMethodId}>
              <SelectTrigger disabled={isPending}>
                <SelectValue placeholder="Select delivery method" />
              </SelectTrigger>
              <SelectContent>
                {deliveryMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-minWeight">Min Weight (kg)</Label>
            <Input
              id="edit-minWeight"
              type="number"
              min="0"
              step="0.01"
              value={minWeight}
              onChange={(e) => setMinWeight(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-maxWeight">Max Weight (kg)</Label>
            <Input
              id="edit-maxWeight"
              type="number"
              min="0"
              step="0.01"
              value={maxWeight}
              onChange={(e) => setMaxWeight(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="edit-price">Price</Label>
            <Input
              id="edit-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isPending}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            disabled={isPending}
          />
          Active Rule
        </label>

        <SubmitBtn isPending={isPending}>Update Pricing Rule</SubmitBtn>
      </Card>
    </form>
  );
};

export default EditPricingRule;
