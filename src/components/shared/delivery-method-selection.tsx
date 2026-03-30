"use client";

import { getAllDeliveryMethodsAction } from "@/actions/method-action";
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

interface DeliveryMethodSelectionProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  hasError?: boolean;
}

const DeliveryMethodSelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError = false,
}: DeliveryMethodSelectionProps) => {
  const { data: deliveryMethodsResult } = useQuery({
    queryKey: ["delivery-methods"],
    queryFn: () => getAllDeliveryMethodsAction(),
  });

  const deliveryMethods: IMethod[] =
    (deliveryMethodsResult?.data as IMethod[]) || [];

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
          <SelectLabel>Delivery Method</SelectLabel>
          {deliveryMethods.map((method) => (
            <SelectItem key={method.id} value={method.id}>
              {method.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DeliveryMethodSelection;
