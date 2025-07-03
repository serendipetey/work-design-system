import * as React from "react";
export interface DataTableColumn<TData = any> {
    key: string;
    header: string;
    sortable?: boolean;
    width?: string;
    render?: (value: any, row: TData, index: number) => React.ReactNode;
    className?: string;
}
export interface DataTableAction<TData = any> {
    label: string;
    icon?: React.ReactNode;
    onClick: (row: TData, index: number) => void;
    variant?: "ghost" | "outline" | "primary" | "destructive";
    className?: string;
    disabled?: (row: TData) => boolean;
}
export interface DataTableToolbarAction {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "primary" | "outline" | "ghost";
    className?: string;
}
export interface DataTableProps<TData = any> {
    data: TData[];
    columns: DataTableColumn<TData>[];
    title?: string;
    description?: string;
    className?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    defaultSort?: {
        key: string;
        direction: "asc" | "desc";
    };
    onSort?: (key: string, direction: "asc" | "desc") => void;
    pagination?: {
        pageSize?: number;
        showResults?: boolean;
        maxVisiblePages?: number;
    };
    rowActions?: DataTableAction<TData>[];
    toolbarActions?: DataTableToolbarAction[];
    footerActions?: DataTableToolbarAction[];
    loading?: boolean;
    emptyMessage?: string;
    striped?: boolean;
    hoverable?: boolean;
    getRowKey?: (row: TData, index: number) => string;
}
declare function useDataTable<TData>(data: TData[], options?: {
    searchable?: boolean;
    defaultSort?: {
        key: string;
        direction: "asc" | "desc";
    };
    pageSize?: number;
}): {
    paginatedData: TData[];
    totalItems: number;
    searchQuery: string;
    sortField: string | null;
    sortDirection: "asc" | "desc";
    currentPage: number;
    handleSearch: (query: string) => void;
    handleSortColumnChange: (key: string | null) => void;
    handleSortDirectionChange: (direction: "asc" | "desc") => void;
    handlePageChange: (page: number) => void;
};
export declare const DataTable: <TData>({ data, columns, title, description, className, searchable, searchPlaceholder, onSearch, defaultSort, onSort, pagination, rowActions, toolbarActions, footerActions, loading, emptyMessage, striped, hoverable, getRowKey, ...props }: DataTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
export declare const createDefaultRowActions: <TData>(onEdit?: (row: TData) => void, onDelete?: (row: TData) => void) => DataTableAction<TData>[];
export { useDataTable };
//# sourceMappingURL=data-table.d.ts.map