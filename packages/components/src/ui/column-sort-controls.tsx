// packages/components/src/ui/column-sort-controls.tsx
// 🎯 REFACTORED: Now uses centralized form utilities for consistency

import * as React from "react";
import { SelectField, SelectItem } from "./select";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import type { DataTableColumn } from "./data-table";
import {
  getHelperContent,
  getHelperVariant,
  getFormFieldAria,
  helperVariants,
  fieldVariants,
} from "./form";

export interface ColumnSortControlsProps {
  columns: DataTableColumn[];
  currentColumn?: string | null;
  currentDirection?: "asc" | "desc";
  onColumnChange?: (column: string | null) => void;
  onDirectionChange?: (direction: "asc" | "desc") => void;
  className?: string;
  disabled?: boolean;

  // Form validation props (consistent with other form components)
  hintText?: string;
  error?: string;
  success?: string;
  warning?: string;

  // Container styling
  containerClassName?: string;
  helperClassName?: string;
}

const DirectionIcon = ({ direction }: { direction: "asc" | "desc" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className={cn(
      "transition-transform duration-150",
      direction === "desc" ? "rotate-180" : "rotate-0"
    )}
  >
    <path d="M8 2L6 6h1.5v8h1v-8H10L8 2z" fill="currentColor" />
  </svg>
);

export const ColumnSortControls: React.FC<ColumnSortControlsProps> = ({
  columns,
  currentColumn,
  currentDirection = "asc",
  onColumnChange,
  onDirectionChange,
  className,
  disabled = false,
  hintText,
  error,
  success,
  warning,
  containerClassName,
  helperClassName,
}) => {
  // 🎯 Use centralized form utilities for validation states
  const helperContent = getHelperContent(error, success, warning);
  const helperVariant = getHelperVariant(error, success, warning);
  const sortControlsId = React.useId();
  const formFieldAria = getFormFieldAria(
    sortControlsId,
    error,
    success,
    warning,
    hintText
  );

  // Filter to only sortable columns
  const sortableColumns = columns.filter((col) => col.sortable);

  // Handle column selection
  const handleColumnChange = (value: string) => {
    if (value === "none" || value === "") {
      onColumnChange?.(null);
    } else {
      onColumnChange?.(value);
    }
  };

  // Handle direction toggle
  const handleDirectionToggle = () => {
    const newDirection = currentDirection === "asc" ? "desc" : "asc";
    onDirectionChange?.(newDirection);
  };

  // Get current column value for select
  const selectValue = currentColumn || "none";

  // // 🎯 Determine validation variant for consistent styling
  // const validationVariant = error
  //   ? "error"
  //   : success
  //   ? "success"
  //   : warning
  //   ? "warning"
  //   : "default";

  return (
    <div className={cn(fieldVariants(), containerClassName)}>
      {/* Hint text (like other form components) */}
      {hintText && (
        <p className={cn(helperVariants({ variant: "muted" }), "mb-2")}>
          {hintText}
        </p>
      )}

      {/* Sort Controls */}
      <div
        className={cn("flex items-center gap-2", className)}
        id={sortControlsId}
      >
        {/* Column Selection Dropdown */}
        <SelectField
          value={selectValue}
          onValueChange={handleColumnChange}
          size="md"
          disabled={disabled}
          hideLabel={true}
          placeholder="Sort by column"
          className="min-w-[160px]"
          {...formFieldAria}
        >
          <SelectItem value="none">No sorting</SelectItem>
          {sortableColumns.map((column) => (
            <SelectItem key={column.key} value={column.key}>
              {column.header}
            </SelectItem>
          ))}
        </SelectField>

        {/* Direction Toggle Button */}
        <Button
          variant="outline"
          appearance="ghost"
          size="sm"
          leftIcon={<DirectionIcon direction={currentDirection} />}
          onClick={handleDirectionToggle}
          disabled={disabled || !currentColumn}
          data-icon-only="true"
          data-size="sm"
          aria-label={`Sort ${
            currentDirection === "asc" ? "ascending" : "descending"
          }`}
        />
      </div>

      {/* Helper/Validation Message */}
      {helperContent && (
        <p
          className={cn(
            helperVariants({ variant: helperVariant }),
            "mt-2",
            helperClassName
          )}
        >
          {helperContent}
        </p>
      )}
    </div>
  );
};
