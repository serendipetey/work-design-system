import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// File: packages/components/src/ui/pagination.tsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
// Pagination container variants
const paginationVariants = cva(["mx-auto flex w-full justify-center items-center space-x-1"].join(" "));
// Pagination item variants - inherits from buttonVariants
const paginationItemVariants = cva([
    // Base styles from buttonVariants but simplified for pagination
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-150 ease-in-out cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "h-8 w-8 p-0", // Square buttons for page numbers
    // Inherit unified focus states from existing buttons
    "focus-visible:outline-none",
    "focus-visible:!bg-[var(--color-focus-500)]",
    "focus-visible:!text-[var(--color-navy-500)]",
    "focus-visible:!border-t-0 focus-visible:!border-l-0 focus-visible:!border-r-0",
    "focus-visible:!border-b-[3px] focus-visible:!border-b-[var(--color-navy-500)]",
    "focus-visible:!shadow-none",
].join(" "), {
    variants: {
        variant: {
            default: [
                "bg-transparent text-[var(--color-charcoal-500)]",
                "border border-transparent",
                "hover:bg-[var(--color-gray-100)] hover:text-[var(--color-navy-500)]",
            ].join(" "),
            active: [
                "bg-[var(--color-primary)] text-[var(--color-white)]",
                "border border-[var(--color-primary)]",
                "hover:bg-[var(--color-primary)] hover:text-[var(--color-white)]",
            ].join(" "),
            disabled: [
                "bg-transparent text-[var(--color-gray-400)]",
                "border border-transparent",
                "cursor-not-allowed",
            ].join(" "),
        },
        size: {
            sm: "h-6 w-6 text-xs",
            md: "h-8 w-8 text-sm",
            lg: "h-10 w-10 text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
// Navigation button variants - inherits from buttonVariants but with specific styling
const paginationNavVariants = cva([
    // Inherit from existing buttonVariants but customize for navigation
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-150 ease-in-out cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "h-8 px-3", // Rectangular for prev/next
    // Inherit unified focus states
    "focus-visible:outline-none",
    "focus-visible:!bg-[var(--color-focus-500)]",
    "focus-visible:!text-[var(--color-navy-500)]",
    "focus-visible:!border-t-0 focus-visible:!border-l-0 focus-visible:!border-r-0",
    "focus-visible:!border-b-[3px] focus-visible:!border-b-[var(--color-navy-500)]",
    "focus-visible:!shadow-none",
].join(" "), {
    variants: {
        variant: {
            outline: [
                "bg-transparent text-[var(--color-primary)]",
                "border border-[var(--color-primary)]",
                "hover:bg-[var(--color-primary)] hover:text-[var(--color-white)]",
            ].join(" "),
            ghost: [
                "bg-transparent text-[var(--color-charcoal-500)]",
                "border border-transparent",
                "hover:bg-[var(--color-gray-100)] hover:text-[var(--color-navy-500)]",
            ].join(" "),
        },
    },
    defaultVariants: {
        variant: "ghost",
    },
});
// Results text variants
const paginationResultsVariants = cva(["text-sm text-[var(--color-charcoal-500)]", "flex items-center gap-1"].join(" "));
// Helper function to generate page numbers
const generatePageNumbers = (currentPage, totalPages, maxVisible = 7) => {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const halfVisible = Math.floor(maxVisible / 2);
    const pages = [];
    if (currentPage <= halfVisible + 1) {
        // Show: 1, 2, 3, 4, ..., last
        for (let i = 1; i <= maxVisible - 2; i++) {
            pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
    }
    else if (currentPage >= totalPages - halfVisible) {
        // Show: 1, ..., last-3, last-2, last-1, last
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++) {
            pages.push(i);
        }
    }
    else {
        // Show: 1, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
    }
    return pages;
};
// Pagination Components
const Pagination = React.forwardRef(({ className, totalItems, currentPage, itemsPerPage, onPageChange, showResults = true, maxVisiblePages = 7, ...props }, ref) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = generatePageNumbers(currentPage, totalPages, maxVisiblePages);
    if (totalPages <= 1)
        return null;
    return (_jsxs("nav", { ref: ref, role: "navigation", "aria-label": "pagination", className: cn("flex flex-col space-y-4", className), ...props, children: [showResults && (_jsx(PaginationResults, { currentPage: currentPage, itemsPerPage: itemsPerPage, totalItems: totalItems })), _jsxs("div", { className: cn(paginationVariants()), children: [_jsx(PaginationPrevious, { onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1 }), pages.map((page, index) => page === "ellipsis" ? (_jsx(PaginationEllipsis, {}, `ellipsis-${index}`)) : (_jsx(PaginationItem, { page: page, isActive: page === currentPage, onClick: () => onPageChange(page) }, page))), _jsx(PaginationNext, { onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages })] })] }));
});
Pagination.displayName = "Pagination";
const PaginationItem = React.forwardRef(({ className, isActive, page, variant, size, ...props }, ref) => (_jsx("button", { ref: ref, className: cn(paginationItemVariants({
        variant: isActive ? "active" : variant,
        size,
    }), className), "aria-label": `Go to page ${page}`, "aria-current": isActive ? "page" : undefined, ...props, children: page })));
PaginationItem.displayName = "PaginationItem";
const PaginationPrevious = React.forwardRef(({ className, variant = "ghost", ...props }, ref) => (_jsxs("button", { ref: ref, className: cn(paginationNavVariants({ variant }), className), "aria-label": "Go to previous page", ...props, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", className: "mr-1", children: _jsx("path", { d: "M10 12L6 8L10 4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Previous"] })));
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = React.forwardRef(({ className, variant = "ghost", ...props }, ref) => (_jsxs("button", { ref: ref, className: cn(paginationNavVariants({ variant }), className), "aria-label": "Go to next page", ...props, children: ["Next", _jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", className: "ml-1", children: _jsx("path", { d: "M6 4L10 8L6 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })] })));
PaginationNext.displayName = "PaginationNext";
const PaginationEllipsis = React.forwardRef(({ className, ...props }, ref) => (_jsx("span", { ref: ref, "aria-hidden": true, className: cn("flex h-8 w-8 items-center justify-center text-[var(--color-charcoal-500)]", className), ...props, children: "\u2026" })));
PaginationEllipsis.displayName = "PaginationEllipsis";
const PaginationResults = React.forwardRef(({ className, currentPage, itemsPerPage, totalItems, ...props }, ref) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return (_jsxs("div", { ref: ref, className: cn(paginationResultsVariants(), className), ...props, children: [_jsx("span", { children: "Showing" }), _jsx("strong", { children: startItem }), _jsx("span", { children: "to" }), _jsx("strong", { children: endItem }), _jsx("span", { children: "of" }), _jsx("strong", { children: totalItems }), _jsx("span", { children: "results" })] }));
});
PaginationResults.displayName = "PaginationResults";
export { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationResults, paginationVariants, paginationItemVariants, paginationNavVariants, paginationResultsVariants, };
//# sourceMappingURL=pagination.js.map