import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CommonModal = ({
  isOpen,
  onClose,
  title,
  children,
}: CommonModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {/* Dynamic Content Goes Here */}
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
