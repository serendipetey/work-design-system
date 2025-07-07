import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/column-sort-controls.tsx
// 🎯 REFACTORED: Now uses centralized form utilities for consistency
import * as React from "react";
import { SelectField, SelectItem } from "./select";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { getHelperContent, getHelperVariant, getFormFieldAria, helperVariants, fieldVariants, } from "./form";
const DirectionIcon = ({ direction }) => (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", className: cn("transition-transform duration-150", direction === "desc" ? "rotate-180" : "rotate-0"), children: _jsx("path", { d: "M8 2L6 6h1.5v8h1v-8H10L8 2z", fill: "currentColor" }) }));
export const ColumnSortControls = ({ columns, currentColumn, currentDirection = "asc", onColumnChange, onDirectionChange, className, disabled = false, hintText, error, success, warning, containerClassName, helperClassName, }) => {
    // 🎯 Use centralized form utilities for validation states
    const helperContent = getHelperContent(error, success, warning);
    const helperVariant = getHelperVariant(error, success, warning);
    const sortControlsId = React.useId();
    const formFieldAria = getFormFieldAria(sortControlsId, error, success, warning, hintText);
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
    // 🎯 Determine validation variant for consistent styling
    const validationVariant = error
        ? "error"
        : success
            ? "success"
            : warning
                ? "warning"
                : "default";
    return (_jsxs("div", { className: cn(fieldVariants(), containerClassName), children: [hintText && (_jsx("p", { className: cn(helperVariants({ variant: "muted" }), "mb-2"), children: hintText })), _jsxs("div", { className: cn("flex items-center gap-2", className), id: sortControlsId, children: [_jsxs(SelectField, { value: selectValue, onValueChange: handleColumnChange, size: "md", disabled: disabled, hideLabel: true, placeholder: "Sort by column", className: "min-w-[160px]", ...formFieldAria, children: [_jsx(SelectItem, { value: "none", children: "No sorting" }), sortableColumns.map((column) => (_jsx(SelectItem, { value: column.key, children: column.header }, column.key)))] }), _jsx(Button, { variant: "ghost", size: "md", onClick: handleDirectionToggle, disabled: disabled || !currentColumn, "aria-label": `Sort ${currentDirection === "asc" ? "ascending" : "descending"}`, className: "px-3", children: _jsx(DirectionIcon, { direction: currentDirection }) })] }), helperContent && (_jsx("p", { className: cn(helperVariants({ variant: helperVariant }), "mt-2", helperClassName), children: helperContent }))] }));
};
