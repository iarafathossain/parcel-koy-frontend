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
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { ICategory } from "@/types/category-type";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getAllCategoriesAction } from "../../actions/category-action";

interface CategorySelectionProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  hasError?: boolean;
}

const CategorySelection = ({
  placeholder,
  value,
  onChange,
  onBlur,
  id,
  hasError = false,
}: CategorySelectionProps) => {
  const searchObject = useSearchParams() as unknown as {
    [key: string]: string | undefined | string[];
  };

  const queryString = formattedQueryString(searchObject);

  const { data: categoriesResult } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoriesAction(queryString),
  });

  const categories: ICategory[] = (categoriesResult?.data as ICategory[]) || [];

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
          <SelectLabel>Category</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelection;
