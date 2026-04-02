import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const CommonModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: CommonModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-md md:max-w-xl min-w-sm max-h-[90vh] overflow-auto",
          className,
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={description ? undefined : "sr-only"}>
            {description || `${title} dialog content`}
          </DialogDescription>
        </DialogHeader>
        {/* Dynamic Content Goes Here */}
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
