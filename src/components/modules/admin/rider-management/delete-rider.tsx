"use client";

import { softDeleteRiderAction } from "@/actions/rider-action";
import { getUserInfoAction } from "@/actions/user-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { useUser } from "@/hooks/use-user";
import { IRider } from "@/types/user-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteRiderProps {
  rider: IRider;
  onClose: () => void;
}

const DeleteRider = ({ rider, onClose }: DeleteRiderProps) => {
  const { user } = useUser();
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: currentUserResponse } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getUserInfoAction(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (riderId: string) => {
      return await softDeleteRiderAction(riderId);
    },
  });

  const handleDelete = async () => {
    setServerError(null);

    const riderIdFromContext =
      user?.riderProfile?.id ?? currentUserResponse?.riderProfile?.id;
    const riderId = rider.id || riderIdFromContext;

    if (!riderId) {
      setServerError("Rider ID is missing. Please refresh and try again.");
      return;
    }

    try {
      const result = await mutateAsync(riderId);

      if (!result.success) {
        setServerError(result.message || "Failed to delete rider.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["riders"] });
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
          This action will soft delete the rider and hide the account from
          active operations.
        </AlertDescription>
      </Alert>

      <Card className="p-4 bg-amber-50">
        <p className="text-sm text-amber-900">
          Delete action for <strong>{rider.user.name}</strong>
        </p>
        <p className="text-xs text-amber-800 mt-2">Email: {rider.user.email}</p>
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
            "Delete Rider"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeleteRider;
