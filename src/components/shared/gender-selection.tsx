"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/types/enum-type";

interface GenderSelectionProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  hasError?: boolean;
}

const GenderSelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError,
}: GenderSelectionProps) => {
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
          <SelectItem value={Gender.MALE}>{Gender.MALE}</SelectItem>
          <SelectItem value={Gender.FEMALE}>{Gender.FEMALE}</SelectItem>
          <SelectItem value={Gender.OTHER}>{Gender.OTHER}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenderSelection;
