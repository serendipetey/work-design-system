import * as React from "react";
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
export declare const ColumnSortControls: React.FC<ColumnSortControlsProps>;
