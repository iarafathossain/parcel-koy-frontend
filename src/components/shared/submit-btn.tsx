import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

type SubmitBtnProps = {
  isPending: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  pendingLabel?: string;
};

const SubmitBtn = ({
  isPending,
  children,
  className,
  disabled = false,
  pendingLabel = "Submitting...",
}: SubmitBtnProps) => {
  const isDisabled = disabled || isPending;
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={isDisabled}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin mr-2" size={16} />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitBtn;
