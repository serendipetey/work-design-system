import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SelectField, SelectItem } from "./select";
import { Button } from "./button";
import { cn } from "@/lib/utils";
const DirectionIcon = ({ direction }) => (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", className: cn("transition-transform duration-150", direction === "desc" ? "rotate-180" : "rotate-0"), children: _jsx("path", { d: "M8 2L6 6h1.5v8h1v-8H10L8 2z", fill: "currentColor" }) }));
export const ColumnSortControls = ({ columns, currentColumn, currentDirection = "asc", onColumnChange, onDirectionChange, className, disabled = false, }) => {
    // Filter to only sortable columns
    const sortableColumns = columns.filter((col) => col.sortable);
    // Handle column selection
    const handleColumnChange = (value) => {
        if (value === "none" || value === "") {
            onColumnChange?.(null);
        }
        else {
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
    return (_jsxs("div", { className: cn("flex items-center gap-2", className), children: [_jsxs(SelectField, { value: selectValue, onValueChange: handleColumnChange, size: "md", disabled: disabled, showLabel: false, placeholder: "Sort by column", className: "min-w-[160px]", children: [_jsx(SelectItem, { value: "none", children: "No sorting" }), sortableColumns.map((column) => (_jsx(SelectItem, { value: column.key, children: column.header }, column.key)))] }), _jsx(Button, { variant: "ghost", size: "md", onClick: handleDirectionToggle, disabled: disabled || !currentColumn, "aria-label": `Sort ${currentDirection === "asc" ? "ascending" : "descending"}`, className: "px-3", children: _jsx(DirectionIcon, { direction: currentDirection }) })] }));
};
