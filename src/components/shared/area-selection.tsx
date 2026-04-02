"use client";

import { getAllAreasAction } from "@/actions/area-action";
import { IArea } from "@/types/area-type";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AreaSelectionProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  hasError?: boolean;
  label?: string;
}

const AreaSelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError = false,
  label = "Origin Area",
}: AreaSelectionProps) => {
  const { data: areaResults, isLoading } = useQuery({
    queryKey: ["areas", "for-pricing"],
    queryFn: () => getAllAreasAction(""),
  });

  const areas: IArea[] = (areaResults?.data as IArea[]) || [];
  const isOptionsLoading = isLoading && areas.length === 0;

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
          <SelectLabel>{label}</SelectLabel>
          {isOptionsLoading && (
            <SelectItem value="__loading_areas" disabled>
              Loading areas...
            </SelectItem>
          )}
          {areas.map((area) => (
            <SelectItem key={area.id} value={area.id}>
              {area.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AreaSelection;
