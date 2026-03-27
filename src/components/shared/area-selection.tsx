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
}

const AreaSelection = ({ placeholder }: AreaSelectionProps) => {
  const { data: areaResults } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllAreasAction(),
  });

  const areas: IArea[] = (areaResults?.data as IArea[]) || [];
  return (
    <Select>
      <SelectTrigger className="w-full">
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
