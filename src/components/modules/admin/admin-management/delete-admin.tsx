"use client";

import {
  permanentDeleteAdminAction,
  softDeleteAdminAction,
} from "@/actions/admin-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { IAdmin } from "@/types/user-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteAdminProps {
  admin: IAdmin;
  onClose: () => void;
}

const DeleteAdmin = ({ admin, onClose }: DeleteAdminProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPermanentConfirmStep, setIsPermanentConfirmStep] =
    useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutateAsync: softDeleteMutateAsync, isPending: isSoftDeletePending } =
    useMutation({
      mutationFn: async () => {
        return await softDeleteAdminAction(admin.id);
      },
    });

  const {
    mutateAsync: permanentDeleteMutateAsync,
    isPending: isPermanentDeletePending,
  } = useMutation({
    mutationFn: async () => {
      return await permanentDeleteAdminAction(admin.id);
    },
  });

  const handleSoftDelete = async () => {
    setServerError(null);

    try {
      const result = await softDeleteMutateAsync();

      if (!result.success) {
        setServerError(result.message || "Failed to soft delete admin.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["admins"] });
      setTimeout(() => onClose(), 500);
    } catch (error: unknown) {
      setServerError(
        catchError(error, "An unexpected error occurred. Please try again."),
      );
    }
  };

  const handlePermanentDelete = async () => {
    setServerError(null);

    try {
      const result = await permanentDeleteMutateAsync();

      if (!result.success) {
        setServerError(result.message || "Failed to permanently delete admin.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["admins"] });
      setTimeout(() => onClose(), 500);
    } catch (error: unknown) {
      setServerError(
        catchError(error, "An unexpected error occurred. Please try again."),
      );
    }
  };

  const isAnyDeletePending = isSoftDeletePending || isPermanentDeletePending;

  return (
    <div className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertDescription className="text-red-800">
          Choose a delete mode. Soft delete keeps a recoverable record, while
          permanent delete removes the admin record permanently.
        </AlertDescription>
      </Alert>

      <Card className="p-4 bg-amber-50">
        <p className="text-sm text-amber-900">
          Delete action for <strong>{admin.user.name}</strong>
        </p>
        <p className="text-xs text-amber-800 mt-2">Email: {admin.user.email}</p>
      </Card>

      {isPermanentConfirmStep ? (
        <div className="space-y-3">
          <Alert variant="destructive" className="border-red-300 bg-red-50">
            <AlertDescription className="text-red-800">
              Permanent delete cannot be undone. Are you sure you want to
              permanently delete this admin?
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPermanentConfirmStep(false)}
              disabled={isAnyDeletePending}
            >
              Back
            </Button>

            <Button
              variant="destructive"
              onClick={handlePermanentDelete}
              disabled={isAnyDeletePending}
            >
              {isPermanentDeletePending ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Permanently Deleting...
                </>
              ) : (
                "Confirm Permanent Delete"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isAnyDeletePending}
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            onClick={handleSoftDelete}
            disabled={isAnyDeletePending}
          >
            {isSoftDeletePending ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Soft Deleting...
              </>
            ) : (
              "Soft Delete"
            )}
          </Button>

          <Button
            variant="destructive"
            onClick={() => setIsPermanentConfirmStep(true)}
            disabled={isAnyDeletePending}
          >
            Permanent Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeleteAdmin;
