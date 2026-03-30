"use client";

import { createAreaAction } from "@/actions/area-action";
import { getAllHubsAction } from "@/actions/hub-action";
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
import { createAreaZodSchema } from "@/validators/area-validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface CreateAreaProps {
  onSuccess?: () => void;
}

const CreateArea = ({ onSuccess }: CreateAreaProps) => {
  const [name, setName] = useState<string>("");
  const [zoneId, setZoneId] = useState<string>("none");
  const [hubId, setHubId] = useState<string>("none");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: zonesResponse, isLoading: isZonesLoading } = useQuery({
    queryKey: ["zones", "for-area"],
    queryFn: () => getAllZonesAction(""),
  });

  const { data: hubsResponse, isLoading: isHubsLoading } = useQuery({
    queryKey: ["hubs", "for-area"],
    queryFn: () => getAllHubsAction(""),
  });

  const zones = zonesResponse?.data || [];
  const hubs = hubsResponse?.data || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAreaAction,
  });

  const handleSubmit = async () => {
    setServerError(null);

    const payload = {
      name: name.trim(),
      zoneId: zoneId !== "none" ? zoneId : undefined,
      hubId: hubId !== "none" ? hubId : undefined,
      isActive,
    };

    const parsed = createAreaZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Creating area...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to create area";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["areas"] });
      toast.success(result.message || "Area created successfully.");
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
          <Label htmlFor="area-name">Area Name</Label>
          <Input
            id="area-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter area name"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="area-zone">Zone</Label>
          <Select value={zoneId} onValueChange={setZoneId}>
            <SelectTrigger
              id="area-zone"
              disabled={isPending || isZonesLoading}
            >
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Zone</SelectItem>
              {zones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="area-hub">Hub (Optional)</Label>
          <Select value={hubId} onValueChange={setHubId}>
            <SelectTrigger id="area-hub" disabled={isPending || isHubsLoading}>
              <SelectValue placeholder="Select hub" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Hub</SelectItem>
              {hubs.map((hub) => (
                <SelectItem key={hub.id} value={hub.id}>
                  {hub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            disabled={isPending}
          />
          Active Area
        </label>

        <SubmitBtn isPending={isPending}>Create Area</SubmitBtn>
      </Card>
    </form>
  );
};

export default CreateArea;
