"use client";

import { getAllPickupMethodsAction } from "@/actions/method-action";
import { IMethod } from "@/types/method-type";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { data: pickupMethodsResult } = useQuery({
    queryKey: ["pickup-methods"],
    queryFn: () => getAllPickupMethodsAction(),
  });

  const pickupMethods: IMethod[] =
    (pickupMethodsResult?.data as IMethod[]) || [];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        onBlur={onBlur}
        aria-invalid={hasError || undefined}
        className="w-full"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pickup Method</SelectLabel>
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
