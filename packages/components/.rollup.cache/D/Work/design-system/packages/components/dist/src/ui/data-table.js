import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/data-table.tsx
import * as React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, } from "./table";
import { Pagination } from "./pagination";
import { ColumnSortControls } from "./column-sort-controls";
import { cn } from "@/lib/utils";
// Default icons - replace with your icon system
const SearchIcon = () => (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: _jsx("path", { d: "M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
const EditIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: [_jsx("path", { d: "M7.333 2.667H2.667A1.333 1.333 0 0 0 1.333 4v9.333A1.333 1.333 0 0 0 2.667 14.667H12a1.333 1.333 0 0 0 1.333-1.334V8", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M12.333 1.667a1.414 1.414 0 1 1 2 2L8 10l-2.667.667L6 8l6.333-6.333Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] }));
const DeleteIcon = () => (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: _jsx("path", { d: "M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h8.667Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
// Hook for data table state management
function useDataTable(data, options = {}) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [sortField, setSortField] = React.useState(options.defaultSort?.key || null);
    const [sortDirection, setSortDirection] = React.useState(options.defaultSort?.direction || "asc");
    const [currentPage, setCurrentPage] = React.useState(1);
    // Filter data based on search
    const filteredData = React.useMemo(() => {
        if (!options.searchable || !searchQuery)
            return data;
        return data.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())));
    }, [data, searchQuery, options.searchable]);
    // Sort filtered data
    const sortedData = React.useMemo(() => {
        if (!sortField)
            return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            const multiplier = sortDirection === "asc" ? 1 : -1;
            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * multiplier;
            }
            if (aValue < bValue)
                return -1 * multiplier;
            if (aValue > bValue)
                return 1 * multiplier;
            return 0;
        });
    }, [filteredData, sortField, sortDirection]);
    // Paginate sorted data
    const pageSize = options.pageSize || 10;
    const paginatedData = React.useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, currentPage, pageSize]);
    // Handle sort column change
    const handleSortColumnChange = React.useCallback((key) => {
        setSortField(key);
        setCurrentPage(1); // Reset to first page
    }, []);
    // Handle sort direction change
    const handleSortDirectionChange = React.useCallback((direction) => {
        setSortDirection(direction);
    }, []);
    // Handle search
    const handleSearch = React.useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page
    }, []);
    // Handle page change
    const handlePageChange = React.useCallback((page) => {
        setCurrentPage(page);
    }, []);
    return {
        // Data
        paginatedData,
        totalItems: sortedData.length,
        // State
        searchQuery,
        sortField,
        sortDirection,
        currentPage,
        // Handlers
        handleSearch,
        handleSortColumnChange,
        handleSortDirectionChange,
        handlePageChange,
    };
}
// Main DataTable component
export const DataTable = ({ data, columns, title, description, className, searchable = true, searchPlaceholder = "Search", onSearch, defaultSort, onSort, pagination = {}, rowActions = [], toolbarActions = [], footerActions = [], loading = false, emptyMessage = "No data available", striped = false, hoverable = true, getRowKey, ...props }) => {
    const { paginatedData, totalItems, searchQuery, sortField, sortDirection, currentPage, handleSearch, handleSortColumnChange, handleSortDirectionChange, handlePageChange, } = useDataTable(data, {
        searchable,
        defaultSort,
        pageSize: pagination.pageSize,
    });
    // Handle external search
    React.useEffect(() => {
        if (onSearch) {
            onSearch(searchQuery);
        }
    }, [searchQuery, onSearch]);
    // Handle external sort
    React.useEffect(() => {
        if (onSort && sortField) {
            onSort(sortField, sortDirection);
        }
    }, [sortField, sortDirection, onSort]);
    const hasActions = rowActions.length > 0;
    const showPagination = totalItems > (pagination.pageSize || 10);
    const hasSortableColumns = columns.some((col) => col.sortable);
    return (_jsxs("div", { className: cn("w-full space-y-6", className), ...props, children: [(title || description) && (_jsxs("div", { className: "space-y-2", children: [title && (_jsx("h1", { className: "text-2xl font-bold text-[var(--color-navy-500)]", children: title })), description && (_jsx("p", { className: "text-[var(--color-charcoal-500)] max-w-3xl", children: description }))] })), (searchable || hasSortableColumns || toolbarActions.length > 0) && (_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center", children: [searchable && (_jsx("div", { className: "w-full sm:w-auto sm:min-w-[300px]", children: _jsx(Input, { placeholder: searchPlaceholder, value: searchQuery, onChange: (e) => handleSearch(e.target.value), leftIcon: _jsx(SearchIcon, {}), className: "w-full" }) })), hasSortableColumns && (_jsx(ColumnSortControls, { columns: columns, currentColumn: sortField, currentDirection: sortDirection, onColumnChange: handleSortColumnChange, onDirectionChange: handleSortDirectionChange }))] }), toolbarActions.length > 0 && (_jsx("div", { className: "flex gap-3", children: toolbarActions.map((action, index) => (_jsx(Button, { variant: action.variant || "outline", onClick: action.onClick, leftIcon: action.icon, className: action.className, children: action.label }, index))) }))] })), _jsx("div", { className: "border border-[var(--color-border)] rounded-lg overflow-hidden", children: loading ? (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "text-[var(--color-charcoal-500)]", children: "Loading..." }) })) : paginatedData.length === 0 ? (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "text-[var(--color-charcoal-500)]", children: emptyMessage }) })) : (_jsxs(Table, { variant: striped ? "striped" : "default", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [columns.map((column) => (_jsx(TableHead, { className: cn(column.className), style: column.width ? { width: column.width } : undefined, children: column.header }, column.key))), hasActions && (_jsx(TableHead, { className: "text-center", children: "Action" }))] }) }), _jsx(TableBody, { children: paginatedData.map((row, index) => (_jsxs(TableRow, { variant: striped ? "striped" : "default", children: [columns.map((column) => (_jsx(TableCell, { className: cn(column.className), children: column.render
                                            ? column.render(row[column.key], row, index)
                                            : String(row[column.key] || "") }, column.key))), hasActions && (_jsx(TableCell, { children: _jsx("div", { className: "flex justify-center gap-2", children: rowActions.map((action, actionIndex) => (_jsx(Button, { variant: action.variant || "ghost", size: "sm", onClick: () => action.onClick(row, index), className: action.className, disabled: action.disabled ? action.disabled(row) : false, "aria-label": `${action.label} row ${index + 1}`, children: action.icon || action.label }, actionIndex))) }) }))] }, getRowKey
                                ? getRowKey(row, index)
                                : `row-${currentPage}-${index}`))) })] })) }), showPagination && (_jsx(Pagination, { totalItems: totalItems, currentPage: currentPage, itemsPerPage: pagination.pageSize || 10, onPageChange: handlePageChange, showResults: pagination.showResults, maxVisiblePages: pagination.maxVisiblePages })), footerActions.length > 0 && (_jsx("div", { className: "flex justify-end gap-3", children: footerActions.map((action, index) => (_jsx(Button, { variant: action.variant || "primary", onClick: action.onClick, leftIcon: action.icon, className: action.className, children: action.label }, index))) }))] }));
};
// Export default row actions for common use cases
export const createDefaultRowActions = (onEdit, onDelete) => {
    const actions = [];
    if (onEdit) {
        actions.push({
            label: "Edit",
            icon: _jsx(EditIcon, {}),
            onClick: onEdit,
            variant: "ghost",
        });
    }
    if (onDelete) {
        actions.push({
            label: "Delete",
            icon: _jsx(DeleteIcon, {}),
            onClick: onDelete,
            variant: "ghost",
            className: "text-destructive hover:text-destructive",
        });
    }
    return actions;
};
// Export the hook for advanced use cases
export { useDataTable };
