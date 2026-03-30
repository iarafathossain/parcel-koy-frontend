"use client";

import { softDeleteMerchantAction } from "@/actions/merchant-action";
import { getUserInfoAction } from "@/actions/user-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { useUser } from "@/hooks/use-user";
import { IMerchant } from "@/types/user-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteMerchantProps {
  merchant: IMerchant;
  onClose: () => void;
}

const DeleteMerchant = ({ merchant, onClose }: DeleteMerchantProps) => {
  const { user } = useUser();
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: currentUserResponse } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getUserInfoAction(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (merchantId: string) => {
      return await softDeleteMerchantAction(merchantId);
    },
  });

  const handleDelete = async () => {
    setServerError(null);

    const merchantIdFromContext =
      user?.merchantProfile?.id ?? currentUserResponse?.merchantProfile?.id;
    const merchantId = merchant.id || merchantIdFromContext;

    if (!merchantId) {
      setServerError("Merchant ID is missing. Please refresh and try again.");
      return;
    }

    try {
      const result = await mutateAsync(merchantId);

      if (!result.success) {
        setServerError(result.message || "Failed to delete merchant.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["merchants"] });
      setTimeout(() => onClose(), 500);
    } catch (error: unknown) {
      setServerError(
        catchError(error, "An unexpected error occurred. Please try again."),
      );
    }
  };

  return (
    <div className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertDescription className="text-red-800">
          This action will soft delete the merchant and hide the account from
          active operations.
        </AlertDescription>
      </Alert>

      <Card className="p-4 bg-amber-50">
        <p className="text-sm text-amber-900">
          Delete action for <strong>{merchant.user.name}</strong>
        </p>
        <p className="text-xs text-amber-800 mt-2">
          Business: {merchant.businessName}
        </p>
      </Card>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>

        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              Deleting...
            </>
          ) : (
            "Delete Merchant"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeleteMerchant;
