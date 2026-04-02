"use client";

import { getAllPickupMethodsAction } from "@/actions/method-action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMethod } from "@/types/method-type";
import { useQuery } from "@tanstack/react-query";

interface PickupMethodSelectionProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  hasError?: boolean;
}

const PickupMethodSelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError = false,
}: PickupMethodSelectionProps) => {
  const { data: pickupMethodsResult, isLoading } = useQuery({
    queryKey: ["pickup-methods", "for-pricing"],
    queryFn: () => getAllPickupMethodsAction(),
  });

  const pickupMethods: IMethod[] =
    (pickupMethodsResult?.data as IMethod[]) || [];
  const isOptionsLoading = isLoading && pickupMethods.length === 0;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        onBlur={onBlur}
        aria-invalid={hasError || undefined}
        disabled={isOptionsLoading}
        className="w-full"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pickup Method</SelectLabel>
          {isOptionsLoading && (
            <SelectItem value="__loading_pickup_methods" disabled>
              Loading pickup methods...
            </SelectItem>
          )}
          {pickupMethods.map((method) => (
            <SelectItem key={method.id} value={method.id}>
              {method.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PickupMethodSelection;
