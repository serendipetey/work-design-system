import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/table.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
// 🎯 Design Tokens + Robust Fallbacks Architecture
const tableStyles = {
    base: {
        fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
        backgroundColor: "var(--color-surface, #ffffff)",
        color: "var(--color-text-body, #374151)",
        borderColor: "var(--color-border, #d1d5db)",
    },
    variants: {
        default: {
            backgroundColor: "var(--color-surface, #ffffff)",
            borderColor: "var(--color-border, #d1d5db)",
        },
        striped: {
            backgroundColor: "var(--color-surface, #ffffff)",
            borderColor: "var(--color-border, #d1d5db)",
        },
        minimal: {
            backgroundColor: "var(--color-surface, #ffffff)",
            borderColor: "transparent",
        },
    },
    sizes: {
        sm: { fontSize: "var(--font-size-xs, 12px)" },
        md: { fontSize: "var(--font-size-sm, 14px)" },
        lg: { fontSize: "var(--font-size-base, 16px)" },
    },
    header: {
        backgroundColor: "var(--color-surface-subtle, #f9fafb)",
        borderColor: "var(--color-border, #d1d5db)",
        color: "var(--color-text-heading, #1f2937)",
    },
    cell: {
        color: "var(--color-text-body, #374151)",
    },
    interactions: {
        hover: "var(--color-accent, #f1f5f9)",
        selected: "var(--color-primary-50, #eff6ff)",
        stripedRow: "var(--color-surface-subtle, #f9fafb)",
        stripedHover: "var(--color-gray-200, #e5e7eb)",
    },
};
// Table variants with design tokens + fallbacks
const tableVariants = cva(["w-full caption-bottom text-sm", "border-collapse border-spacing-0"].join(" "), {
    variants: {
        variant: {
            default: "border border-[var(--color-border, #d1d5db)]",
            striped: "border border-[var(--color-border, #d1d5db)]",
            minimal: "border-0",
        },
        size: {
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
const tableHeaderVariants = cva([
    "border-b border-[var(--color-border, #d1d5db)]",
    "bg-[var(--color-surface-subtle, #f9fafb)]",
].join(" "));
const tableBodyVariants = cva("");
const tableRowVariants = cva([
    "transition-colors duration-150",
    "border-b border-[var(--color-border, #d1d5db)] last:border-0",
].join(" "), {
    variants: {
        variant: {
            default: [
                "hover:bg-[var(--color-accent, #f1f5f9)]",
                "data-[state=selected]:bg-[var(--color-primary-50, #eff6ff)]",
            ].join(" "),
            striped: [
                "even:bg-[var(--color-surface-subtle, #f9fafb)]",
                "hover:bg-[var(--color-accent, #f1f5f9)]",
                "even:hover:bg-[var(--color-gray-200, #e5e7eb)]",
                "data-[state=selected]:bg-[var(--color-primary-50, #eff6ff)]",
            ].join(" "),
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const tableHeadVariants = cva([
    "h-12 px-4 text-left align-middle",
    "font-medium text-[var(--color-text-heading, #1f2937)]",
    "text-sm font-semibold",
    "[&:has([role=checkbox])]:pr-0",
].join(" "), {
    variants: {
        sortable: {
            true: [
                "cursor-pointer select-none",
                "hover:text-[var(--color-primary-600, #2563eb)]",
                "transition-colors duration-150",
            ].join(" "),
            false: "",
        },
    },
    defaultVariants: {
        sortable: false,
    },
});
const tableCellVariants = cva([
    "px-4 py-3 align-middle",
    "text-[var(--color-text-body, #374151)]",
    "[&:has([role=checkbox])]:pr-0",
].join(" "), {
    variants: {
        size: {
            sm: "px-3 py-2 text-xs",
            md: "px-4 py-3 text-sm",
            lg: "px-6 py-4 text-base",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
// 🎯 Table Components with Token + Fallback Architecture
const Table = React.forwardRef(({ className, variant = "default", size = "md", style, ...props }, ref) => {
    // 🎯 Combine styles: Base + Variant + Size + Custom
    const combinedStyles = {
        ...tableStyles.base,
        ...(variant && tableStyles.variants[variant]),
        ...(size && tableStyles.sizes[size]),
        ...style, // Allow style overrides
    };
    return (_jsx("div", { className: "relative w-full overflow-auto", children: _jsx("table", { ref: ref, className: cn(tableVariants({ variant, size }), className), style: combinedStyles, ...props }) }));
});
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, style, ...props }, ref) => {
    const combinedStyles = {
        ...tableStyles.header,
        ...style,
    };
    return (_jsx("thead", { ref: ref, className: cn(tableHeaderVariants(), className), style: combinedStyles, ...props }));
});
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => (_jsx("tbody", { ref: ref, className: cn(tableBodyVariants(), className), ...props })));
TableBody.displayName = "TableBody";
const TableRow = React.forwardRef(({ className, variant = "default", ...props }, ref) => (_jsx("tr", { ref: ref, className: cn(tableRowVariants({ variant }), className), ...props })));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, sortable = false, sortDirection, onSort, children, style, ...props }, ref) => {
    const handleSort = () => {
        if (sortable && onSort) {
            onSort();
        }
    };
    const combinedStyles = {
        ...tableStyles.cell,
        color: tableStyles.header.color,
        ...style,
    };
    return (_jsx("th", { ref: ref, className: cn(tableHeadVariants({ sortable }), className), onClick: handleSort, style: combinedStyles, ...props, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: children }), sortable && (_jsx("span", { className: "ml-2", children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", className: cn("fill-[var(--color-text-heading, #1f2937)] transition-transform duration-150", sortDirection === "desc" ? "rotate-180" : "rotate-0", !sortDirection && "opacity-40"), children: _jsx("path", { d: "M8 2L6 6h1.5v8h1v-8H10L8 2z" }) }) }))] }) }));
});
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, size = "md", style, ...props }, ref) => {
    const combinedStyles = {
        color: tableStyles.cell.color,
        ...style,
    };
    return (_jsx("td", { ref: ref, className: cn(tableCellVariants({ size }), className), style: combinedStyles, ...props }));
});
TableCell.displayName = "TableCell";
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, tableVariants, tableHeaderVariants, tableBodyVariants, tableRowVariants, tableHeadVariants, tableCellVariants, };
