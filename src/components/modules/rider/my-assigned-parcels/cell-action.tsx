"use client";

import { sendDeliveryOtpAction } from "@/actions/rider-action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { catchError } from "@/helpers/catch-error";
import { ParcelStatusType } from "@/types/enum-type";
import { IParcel } from "@/types/parcel-type";
import { ALLOWED_TRANSITIONS } from "@/validators/parcel-validator";
import { Edit, KeyRound, MoreHorizontal, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: IParcel;
  onUpdateStatus: (data: IParcel) => void;
  onVerifyOtp: (data: IParcel) => void;
}

export const CellAction = ({
  data,
  onUpdateStatus,
  onVerifyOtp,
}: CellActionProps) => {
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const allowedStatuses = useMemo<string[]>(
    () => [...(ALLOWED_TRANSITIONS[data.status as ParcelStatusType] || [])],
    [data.status],
  );

  const canTransition = allowedStatuses.length > 0;
  const canDeliver = allowedStatuses.includes("DELIVERED");

  const handleSendOtp = async () => {
    try {
      setIsSendingOtp(true);
      const res = await sendDeliveryOtpAction(data.id);
      if (res.success) {
        toast.success(res.message || "OTP sent successfully");
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(catchError(error));
    } finally {
      setIsSendingOtp(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {canTransition && (
          <DropdownMenuItem onClick={() => onUpdateStatus(data)}>
            <Edit className="mr-2 h-4 w-4" />
            Update Status
          </DropdownMenuItem>
        )}

        {canDeliver && (
          <>
            <DropdownMenuItem onClick={handleSendOtp} disabled={isSendingOtp}>
              <Send className="mr-2 h-4 w-4" />
              Send Delivery OTP
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onVerifyOtp(data)}>
              <KeyRound className="mr-2 h-4 w-4" />
              Verify & Deliver
            </DropdownMenuItem>
          </>
        )}

        {!canTransition && (
          <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
