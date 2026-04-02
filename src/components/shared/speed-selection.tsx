"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISpeed } from "@/types/speed-type";
import { useQuery } from "@tanstack/react-query";
import { getAllSpeedsAction } from "../../actions/speed-action";

interface SpeedSelectionProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  hasError?: boolean;
}

const SpeedSelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError = false,
}: SpeedSelectionProps) => {
  const { data: speedsResult, isLoading } = useQuery({
    queryKey: ["speeds", "for-pricing"],
    queryFn: () => getAllSpeedsAction(""),
  });

  const speeds: ISpeed[] = (speedsResult?.data as ISpeed[]) || [];
  const isOptionsLoading = isLoading && speeds.length === 0;

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
          <SelectLabel>Speed</SelectLabel>
          {isOptionsLoading && (
            <SelectItem value="__loading_speeds" disabled>
              Loading speeds...
            </SelectItem>
          )}
          {speeds.map((speed) => (
            <SelectItem key={speed.id} value={speed.id}>
              {speed.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SpeedSelection;
