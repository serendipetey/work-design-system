// packages/components/src/ui/column-sort-controls.tsx
import * as React from "react";
import { SelectField, SelectItem } from "./select";
import { Button } from "./button-old";
import { cn } from "@/lib/utils";
import type { DataTableColumn } from "./data-table";

export interface ColumnSortControlsProps {
  columns: DataTableColumn[];
  currentColumn?: string | null;
  currentDirection?: "asc" | "desc";
  onColumnChange?: (column: string | null) => void;
  onDirectionChange?: (direction: "asc" | "desc") => void;
  className?: string;
  disabled?: boolean;
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
}) => {
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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Column Selection Dropdown */}
      <SelectField
        value={selectValue}
        onValueChange={handleColumnChange}
        size="md"
        disabled={disabled}
        showLabel={false}
        placeholder="Sort by column"
        className="min-w-[160px]"
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
        variant="ghost"
        size="md"
        onClick={handleDirectionToggle}
        disabled={disabled || !currentColumn}
        aria-label={`Sort ${
          currentDirection === "asc" ? "ascending" : "descending"
        }`}
        className="px-3"
      >
        <DirectionIcon direction={currentDirection} />
      </Button>
    </div>
  );
};
