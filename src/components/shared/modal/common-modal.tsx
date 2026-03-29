import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const CommonModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: CommonModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-xl">
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
