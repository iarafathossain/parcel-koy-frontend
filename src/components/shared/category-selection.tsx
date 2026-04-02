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
import { ICategory } from "@/types/category-type";
import { useQuery } from "@tanstack/react-query";
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
  const { data: categoriesResult, isLoading } = useQuery({
    queryKey: ["categories", "for-pricing"],
    queryFn: () => getAllCategoriesAction(""),
  });

  const categories: ICategory[] = (categoriesResult?.data as ICategory[]) || [];
  const isOptionsLoading = isLoading && categories.length === 0;

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
          <SelectLabel>Category</SelectLabel>
          {isOptionsLoading && (
            <SelectItem value="__loading_categories" disabled>
              Loading categories...
            </SelectItem>
          )}
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
