"use client";

import { getAllAdminsAction } from "@/actions/admin-action";
import { createHubAction } from "@/actions/hub-action";
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
import { createHubZodSchema } from "@/validators/hub-validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface CreateHubProps {
  onSuccess?: () => void;
}

const CreateHub = ({ onSuccess }: CreateHubProps) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [managerId, setManagerId] = useState<string>("none");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: adminsResponse, isLoading: isAdminsLoading } = useQuery({
    queryKey: ["admins", "for-hub"],
    queryFn: () => getAllAdminsAction(""),
  });

  const admins = adminsResponse?.data || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createHubAction,
  });

  const handleSubmit = async () => {
    setServerError(null);

    const payload = {
      name: name.trim(),
      address: address.trim(),
      contactNumber: contactNumber.trim(),
      managerId: managerId !== "none" ? managerId : undefined,
      isActive,
    };

    const parsed = createHubZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Creating hub...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to create hub";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["hubs"] });
      toast.success(result.message || "Hub created successfully.");
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
          <Label htmlFor="hub-name">Hub Name</Label>
          <Input
            id="hub-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter hub name"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hub-address">Address</Label>
          <Input
            id="hub-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter hub address"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hub-contact">Contact Number</Label>
          <Input
            id="hub-contact"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="01XXXXXXXXX"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hub-manager">Manager (Optional)</Label>
          <Select value={managerId} onValueChange={setManagerId}>
            <SelectTrigger
              id="hub-manager"
              disabled={isPending || isAdminsLoading}
            >
              <SelectValue placeholder="Assign manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Manager</SelectItem>
              {admins.map((admin) => (
                <SelectItem key={admin.id} value={admin.id}>
                  {admin.user.name}
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
          Active Hub
        </label>

        <SubmitBtn isPending={isPending}>Create Hub</SubmitBtn>
      </Card>
    </form>
  );
};

export default CreateHub;
