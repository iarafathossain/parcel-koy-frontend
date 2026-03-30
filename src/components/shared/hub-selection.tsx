"use client";

import { getAllHubsAction } from "@/actions/hub-action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

interface HubSelectionProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  hasError?: boolean;
}

const HubSelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError,
}: HubSelectionProps) => {
  const { data: hubsResponse, isLoading } = useQuery({
    queryKey: ["hubs", "for-form-selection"],
    queryFn: () => getAllHubsAction(""),
  });

  const hubs = hubsResponse?.data || [];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        onBlur={onBlur}
        aria-invalid={hasError || undefined}
        className="w-full"
      >
        <SelectValue
          placeholder={isLoading ? "Loading hubs..." : placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {hubs.map((hub) => (
            <SelectItem key={hub.id} value={hub.id}>
              {hub.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default HubSelection;
