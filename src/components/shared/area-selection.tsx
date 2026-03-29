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
}

const AreaSelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError = false,
}: AreaSelectionProps) => {
  const { data: areaResults } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllAreasAction(),
  });

  const areas: IArea[] = (areaResults?.data as IArea[]) || [];
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
          <SelectLabel>Origin Area</SelectLabel>
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
