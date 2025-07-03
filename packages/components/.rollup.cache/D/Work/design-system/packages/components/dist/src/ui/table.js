import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// File: packages/components/src/ui/table.tsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
// Table variants following existing design token patterns
const tableVariants = cva(["w-full caption-bottom text-sm", "border-collapse border-spacing-0"].join(" "), {
    variants: {
        variant: {
            default: "border border-[var(--color-border)]",
            striped: "border border-[var(--color-border)]", // Add striped variant
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
const tableHeaderVariants = cva(["border-b border-[var(--color-border)]", "bg-[var(--color-gray-50)]"].join(" "));
const tableBodyVariants = cva("");
const tableRowVariants = cva([
    "transition-colors duration-150",
    "border-b border-[var(--color-border)] last:border-0",
].join(" "), {
    variants: {
        variant: {
            default: [
                "hover:bg-[var(--color-accent)]", // Fixed: use existing accent token
                "data-[state=selected]:bg-[var(--color-primary-50)]",
            ].join(" "),
            striped: [
                "even:bg-[var(--color-surface-subtle)]", // Fixed: use existing token for stripes
                "hover:bg-[var(--color-accent)]", // Standard hover
                "even:hover:bg-[var(--color-gray-200)]", // Darker hover for striped rows
                "data-[state=selected]:bg-[var(--color-primary-50)]",
            ].join(" "),
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const tableHeadVariants = cva([
    "h-12 px-4 text-left align-middle",
    "font-medium text-[var(--color-navy-500)]",
    "text-sm font-semibold",
    "[&:has([role=checkbox])]:pr-0",
].join(" "), {
    variants: {
        sortable: {
            true: [
                "cursor-pointer select-none",
                "hover:text-[var(--color-navy-600)]",
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
    "text-[var(--color-charcoal-500)]",
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
// Table Components
const Table = React.forwardRef(({ className, variant, size, ...props }, ref) => (_jsx("div", { className: "relative w-full overflow-auto", children: _jsx("table", { ref: ref, className: cn(tableVariants({ variant, size }), className), ...props }) })));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("thead", { ref: ref, className: cn(tableHeaderVariants(), className), ...props })));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => (_jsx("tbody", { ref: ref, className: cn(tableBodyVariants(), className), ...props })));
TableBody.displayName = "TableBody";
const TableRow = React.forwardRef(({ className, variant, ...props }, ref) => (_jsx("tr", { ref: ref, className: cn(tableRowVariants({ variant }), className), ...props })));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, sortable, sortDirection, onSort, children, ...props }, ref) => {
    const handleSort = () => {
        if (sortable && onSort) {
            onSort();
        }
    };
    return (_jsx("th", { ref: ref, className: cn(tableHeadVariants({ sortable }), className), onClick: handleSort, ...props, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: children }), sortable && (_jsx("span", { className: "ml-2", children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", className: cn("fill-[var(--color-navy-500)] transition-transform duration-150", sortDirection === "desc" ? "rotate-180" : "rotate-0", !sortDirection && "opacity-40"), children: _jsx("path", { d: "M8 2L6 6h1.5v8h1v-8H10L8 2z" }) }) }))] }) }));
});
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, size, ...props }, ref) => (_jsx("td", { ref: ref, className: cn(tableCellVariants({ size }), className), ...props })));
TableCell.displayName = "TableCell";
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, tableVariants, tableHeaderVariants, tableBodyVariants, tableRowVariants, tableHeadVariants, tableCellVariants, };
//# sourceMappingURL=table.js.map