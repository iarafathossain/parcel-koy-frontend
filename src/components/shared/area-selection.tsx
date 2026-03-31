"use client";

import { getAllAreasAction } from "@/actions/area-action";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { IArea } from "@/types/area-type";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
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
  const searchObject = useSearchParams() as unknown as {
    [key: string]: string | undefined | string[];
  };

  const queryString = formattedQueryString(searchObject);

  const { data: areaResults } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllAreasAction(queryString),
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
          <SelectLabel>{label}</SelectLabel>
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
