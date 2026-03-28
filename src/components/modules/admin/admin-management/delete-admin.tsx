"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { IAdmin } from "@/types/user-type";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteAdminProps {
  admin: IAdmin;
  onClose: () => void;
}

const DeleteAdmin = ({ admin, onClose }: DeleteAdminProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      // TODO: Replace with actual API call
      // Example:
      // return await deleteAdminAction(admin.id);
      console.log("Deleting admin:", admin.id);
      return { success: true };
    },
  });

  const handleDeleteConfirm = async () => {
    setServerError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (await mutateAsync()) as any;

      if (!result.success) {
        setServerError(result.message || "Failed to delete admin.");
        return;
      }

      // Close modal after successful deletion
      setTimeout(() => onClose(), 500);
    } catch (error: unknown) {
      console.error("Delete error:", error);
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
          This action cannot be undone. Deleting this admin will remove all
          associated data permanently.
        </AlertDescription>
      </Alert>

      <Card className="p-4 bg-amber-50">
        <p className="text-sm text-amber-900">
          Are you sure you want to delete <strong>{admin.user.name}</strong>?
        </p>
        <p className="text-xs text-amber-800 mt-2">Email: {admin.user.email}</p>
      </Card>

      {!confirmDelete ? (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => setConfirmDelete(true)}
            disabled={isPending}
          >
            Continue
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Alert className="border-red-300 bg-red-50">
            <AlertDescription className="text-red-800">
              Type the admin&apos;s email to confirm deletion:
            </AlertDescription>
          </Alert>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              disabled={isPending}
            >
              Back
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Deleting...
                </>
              ) : (
                "Yes, Delete Admin"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAdmin;
