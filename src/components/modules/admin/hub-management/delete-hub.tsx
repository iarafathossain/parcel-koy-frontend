"use client";

import { deleteHubBySlugAction } from "@/actions/hub-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { IHub } from "@/types/hub-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteHubProps {
  hub: IHub;
  onClose: () => void;
}

const DeleteHub = ({ hub, onClose }: DeleteHubProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return await deleteHubBySlugAction(hub.slug);
    },
  });

  const handleDelete = async () => {
    setServerError(null);
    const toastId = toast.loading("Deleting hub...");

    try {
      const result = await mutateAsync();

      if (!result.success) {
        const message = result.message || "Failed to delete hub.";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["hubs"] });
      toast.success(result.message || "Hub deleted successfully.");
      setTimeout(() => onClose(), 200);
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

  return (
    <div className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertDescription className="text-red-800">
          This action cannot be undone. The hub and related records may be
          affected.
        </AlertDescription>
      </Alert>

      <Card className="p-4 bg-amber-50">
        <p className="text-sm text-amber-900">
          You are deleting hub <span className="font-semibold">{hub.name}</span>
          .
        </p>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete Hub"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeleteHub;
