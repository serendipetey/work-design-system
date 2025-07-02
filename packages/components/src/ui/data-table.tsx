// packages/components/src/ui/data-table.tsx
import * as React from "react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table";
import { Pagination } from "./pagination";
import { SortingDropdown, type SortDirection } from "./sorting-dropdown";
import { cn } from "@/lib/utils";

// Default icons - replace with your icon system
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M7.333 2.667H2.667A1.333 1.333 0 0 0 1.333 4v9.333A1.333 1.333 0 0 0 2.667 14.667H12a1.333 1.333 0 0 0 1.333-1.334V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.333 1.667a1.414 1.414 0 1 1 2 2L8 10l-2.667.667L6 8l6.333-6.333Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h8.667Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Types
export interface DataTableColumn<TData = any> {
  key: string;
  header: string;
  sortable?: boolean;

  // NEW: Add sorting method configuration
  sortingMethod?: "arrows" | "dropdown" | "both";

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
  // Data
  data: TData[];
  columns: DataTableColumn<TData>[];

  // Table configuration
  title?: string;
  description?: string;
  className?: string;

  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;

  // Sorting
  defaultSort?: {
    key: string;
    direction: "asc" | "desc";
  };
  onSort?: (key: string, direction: "asc" | "desc") => void;

  // Pagination
  pagination?: {
    pageSize?: number;
    showResults?: boolean;
    maxVisiblePages?: number;
  };

  // Actions
  rowActions?: DataTableAction<TData>[];
  toolbarActions?: DataTableToolbarAction[];

  // Footer actions
  footerActions?: DataTableToolbarAction[];

  // Loading and empty states
  loading?: boolean;
  emptyMessage?: string;

  // Row configuration
  striped?: boolean;
  hoverable?: boolean;

  // Custom row key
  getRowKey?: (row: TData, index: number) => string;
}

// Hook for data table state management
function useDataTable<TData>(
  data: TData[],
  options: {
    searchable?: boolean;
    defaultSort?: { key: string; direction: "asc" | "desc" };
    pageSize?: number;
  } = {}
) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortField, setSortField] = React.useState<string | null>(
    options.defaultSort?.key || null
  );
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    options.defaultSort?.direction || "asc"
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!options.searchable || !searchQuery) return data;

    return data.filter((item) =>
      Object.values(item as any).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, options.searchable]);

  // Sort filtered data
  const sortedData = React.useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortField];
      const bValue = (b as any)[sortField];
      const multiplier = sortDirection === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * multiplier;
      }

      if (aValue < bValue) return -1 * multiplier;
      if (aValue > bValue) return 1 * multiplier;
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginate sorted data
  const pageSize = options.pageSize || 10;
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handle sort
  const handleSort = React.useCallback(
    (key: string) => {
      if (sortField === key) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(key);
        setSortDirection("asc");
      }
    },
    [sortField, sortDirection]
  );

  // Handle search
  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Handle page change
  const handlePageChange = React.useCallback((page: number) => {
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
    handleSort,
    handlePageChange,
  };
}

// Enhanced TableHead component to handle different sorting methods
interface EnhancedTableHeadProps {
  column: DataTableColumn;
  sortField: string | null;
  sortDirection: "asc" | "desc";
  onSort: (key: string) => void;
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
  column,
  sortField,
  sortDirection,
  onSort,
}) => {
  const sortingMethod = column.sortingMethod || "both"; // Default to both
  const isCurrentSort = sortField === column.key;
  const currentDirection = isCurrentSort ? sortDirection : false;

  // Handle dropdown sort changes
  const handleDropdownSort = (direction: SortDirection) => {
    if (direction === null) {
      // Reset sorting - this would need more complex logic to handle "no sort"
      return;
    }

    if (sortField !== column.key || sortDirection !== direction) {
      onSort(column.key);
      // The useDataTable hook will handle direction logic
    }
  };

  const renderSortingControls = () => {
    if (!column.sortable) return null;

    switch (sortingMethod) {
      case "arrows":
        return null; // TableHead will render the arrow

      case "dropdown":
        return (
          <SortingDropdown
            value={isCurrentSort ? sortDirection : null}
            onValueChange={handleDropdownSort}
            size="sm"
            className="ml-2"
          />
        );

      case "both":
      default:
        return (
          <div className="flex items-center gap-2 ml-2">
            <SortingDropdown
              value={isCurrentSort ? sortDirection : null}
              onValueChange={handleDropdownSort}
              size="sm"
            />
          </div>
        );
    }
  };

  return (
    <TableHead
      sortable={
        column.sortable &&
        (sortingMethod === "arrows" || sortingMethod === "both")
      }
      sortDirection={currentDirection}
      onSort={column.sortable ? () => onSort(column.key) : undefined}
      className={cn(column.className)}
      style={column.width ? { width: column.width } : undefined}
    >
      <div className="flex items-center justify-between">
        <span>{column.header}</span>
        {renderSortingControls()}
      </div>
    </TableHead>
  );
};

// Main DataTable component
export const DataTable = <TData,>({
  data,
  columns,
  title,
  description,
  className,
  searchable = true,
  searchPlaceholder = "Search",
  onSearch,
  defaultSort,
  onSort,
  pagination = {},
  rowActions = [],
  toolbarActions = [],
  footerActions = [],
  loading = false,
  emptyMessage = "No data available",
  striped = false,
  hoverable = true,
  getRowKey,
  ...props
}: DataTableProps<TData>) => {
  const {
    paginatedData,
    totalItems,
    searchQuery,
    sortField,
    sortDirection,
    currentPage,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useDataTable(data, {
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

  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h1 className="text-2xl font-bold text-[var(--color-navy-500)]">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-[var(--color-charcoal-500)] max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Toolbar */}
      {(searchable || toolbarActions.length > 0) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Search */}
          {searchable && (
            <div className="w-full sm:w-auto sm:min-w-[300px]">
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<SearchIcon />}
                className="w-full"
              />
            </div>
          )}

          {/* Toolbar actions */}
          {toolbarActions.length > 0 && (
            <div className="flex gap-3">
              {toolbarActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "outline"}
                  onClick={action.onClick}
                  leftIcon={action.icon}
                  className={action.className}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-[var(--color-charcoal-500)]">Loading...</div>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-[var(--color-charcoal-500)]">
              {emptyMessage}
            </div>
          </div>
        ) : (
          <Table variant={striped ? "striped" : "default"}>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <EnhancedTableHead
                    key={column.key}
                    column={column}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                ))}
                {hasActions && (
                  <TableHead className="text-center">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={
                    getRowKey
                      ? getRowKey(row, index)
                      : `row-${currentPage}-${index}`
                  }
                  variant={striped ? "striped" : "default"}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(column.className)}
                    >
                      {column.render
                        ? column.render((row as any)[column.key], row, index)
                        : String((row as any)[column.key] || "")}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {rowActions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant={action.variant || "ghost"}
                            size="sm"
                            onClick={() => action.onClick(row, index)}
                            className={action.className}
                            disabled={
                              action.disabled ? action.disabled(row) : false
                            }
                            aria-label={`${action.label} row ${index + 1}`}
                          >
                            {action.icon || action.label}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {showPagination && (
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={pagination.pageSize || 10}
          onPageChange={handlePageChange}
          showResults={pagination.showResults}
          maxVisiblePages={pagination.maxVisiblePages}
        />
      )}

      {/* Footer actions */}
      {footerActions.length > 0 && (
        <div className="flex justify-end gap-3">
          {footerActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "primary"}
              onClick={action.onClick}
              leftIcon={action.icon}
              className={action.className}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

// Export default row actions for common use cases
export const createDefaultRowActions = <TData,>(
  onEdit?: (row: TData) => void,
  onDelete?: (row: TData) => void
): DataTableAction<TData>[] => {
  const actions: DataTableAction<TData>[] = [];

  if (onEdit) {
    actions.push({
      label: "Edit",
      icon: <EditIcon />,
      onClick: onEdit,
      variant: "ghost",
    });
  }

  if (onDelete) {
    actions.push({
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: onDelete,
      variant: "ghost",
    });
  }

  return actions;
};

// Export the hook for advanced use cases
export { useDataTable };
