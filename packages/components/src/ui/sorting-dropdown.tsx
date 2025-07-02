// packages/components/src/ui/sorting-dropdown.tsx
import * as React from "react";
import { SelectField, SelectItem } from "./select";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc" | null;

export interface SortingDropdownProps {
  value?: SortDirection;
  onValueChange?: (value: SortDirection) => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "error" | "success" | "warning";
  placeholder?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

const SortingDropdown = React.forwardRef<HTMLDivElement, SortingDropdownProps>(
  (
    {
      value,
      onValueChange,
      className,
      size = "sm",
      variant = "default",
      placeholder = "Sort order",
      disabled = false,
      "aria-label": ariaLabel = "Sort order",
      ...props
    },
    ref
  ) => {
    // Convert our sort direction to select value
    const selectValue =
      value === "asc" ? "asc" : value === "desc" ? "desc" : "";

    // Handle select value change
    const handleValueChange = (newValue: string) => {
      if (newValue === "asc") {
        onValueChange?.("asc");
      } else if (newValue === "desc") {
        onValueChange?.("desc");
      } else {
        onValueChange?.(null);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("w-auto min-w-[120px]", className)}
        {...props}
      >
        <SelectField
          value={selectValue}
          onValueChange={handleValueChange}
          size={size}
          variant={variant}
          placeholder={placeholder}
          disabled={disabled}
          showLabel={false}
          aria-label={ariaLabel}
        >
          <SelectItem value="">None</SelectItem>
          <SelectItem value="asc">Ascending ↑</SelectItem>
          <SelectItem value="desc">Descending ↓</SelectItem>
        </SelectField>
      </div>
    );
  }
);
SortingDropdown.displayName = "SortingDropdown";

export { SortingDropdown };
