// File: packages/components/src/ui/table.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Table variants following existing design token patterns
const tableVariants = cva(
  ["w-full caption-bottom text-sm", "border-collapse border-spacing-0"].join(
    " "
  ),
  {
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
  }
);

const tableHeaderVariants = cva(
  ["border-b border-[var(--color-border)]", "bg-[var(--color-gray-50)]"].join(
    " "
  )
);

const tableBodyVariants = cva("");

const tableRowVariants = cva(
  [
    "transition-colors duration-150",
    "border-b border-[var(--color-border)] last:border-0",
  ].join(" "),
  {
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
  }
);

const tableHeadVariants = cva(
  [
    "h-12 px-4 text-left align-middle",
    "font-medium text-[var(--color-navy-500)]",
    "text-sm font-semibold",
    "[&:has([role=checkbox])]:pr-0",
  ].join(" "),
  {
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
  }
);

const tableCellVariants = cva(
  [
    "px-4 py-3 align-middle",
    "text-[var(--color-charcoal-500)]",
    "[&:has([role=checkbox])]:pr-0",
  ].join(" "),
  {
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
  }
);

// Table Component Interfaces
export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableHeaderVariants> {}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {
  sortDirection?: "asc" | "desc" | false;
  onSort?: () => void;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {}

// Table Components
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants(), className)}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(tableBodyVariants(), className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ variant }), className)}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, onSort, children, ...props }, ref) => {
    const handleSort = () => {
      if (sortable && onSort) {
        onSort();
      }
    };

    return (
      <th
        ref={ref}
        className={cn(tableHeadVariants({ sortable }), className)}
        onClick={handleSort}
        {...props}
      >
        <div className="flex items-center space-x-2">
          <span>{children}</span>
          {sortable && (
            <span className="ml-2 flex flex-col">
              {/* Up Arrow - Larger and more accessible */}
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                className={cn(
                  "fill-[var(--color-navy-500)] transition-opacity", // Fixed: use navy color
                  sortDirection === "asc" ? "opacity-100" : "opacity-40"
                )}
              >
                <path d="M6 0L0 8h12L6 0z" />
              </svg>
              {/* Down Arrow - Larger and more accessible */}
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                className={cn(
                  "fill-[var(--color-navy-500)] transition-opacity", // Fixed: use navy color
                  sortDirection === "desc" ? "opacity-100" : "opacity-40"
                )}
              >
                <path d="M6 8L12 0H0l6 8z" />
              </svg>
            </span>
          )}
        </div>
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size }), className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
};
