// packages/components/src/ui/table.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
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
    hover: "var(--color-gray-100, #f3f4f6)",
    selected: "var(--color-primary-50, #eff6ff)",
    stripedRow: "var(--color-gray-50, #f9fafb)",
    stripedHover: "var(--color-gray-200, #e5e7eb)",
  },
};

// Table variants with design tokens + fallbacks
const tableVariants = cva(
  ["w-full caption-bottom text-sm", "border-collapse border-spacing-0"].join(
    " "
  ),
  {
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
  }
);

const tableHeaderVariants = cva(
  [
    "border-b border-[var(--color-border, #d1d5db)]",
    "bg-[var(--color-surface-subtle, #f9fafb)]",
  ].join(" ")
);

const tableBodyVariants = cva("");

const tableRowVariants = cva(
  [
    "transition-colors duration-150",
    "border-b border-[var(--color-border, #d1d5db)] last:border-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: ["hover:bg-gray-100", "data-[state=selected]:bg-blue-50"].join(
          " "
        ),
        striped: [
          "even:bg-gray-50",
          "hover:bg-gray-100",
          "even:hover:bg-gray-200",
          "data-[state=selected]:bg-blue-50",
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
    "font-medium text-[var(--color-text-heading, #1f2937)]",
    "text-sm font-semibold",
    "[&:has([role=checkbox])]:pr-0",
  ].join(" "),
  {
    variants: {
      sortable: {
        true: [
          "cursor-pointer select-none",
          "hover:text-blue-600",
          "hover:bg-gray-100",
          "transition-all duration-150",
          "active:bg-gray-200",
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
    "text-[var(--color-text-body, #374151)]",
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

// 🎯 Table Components with Token + Fallback Architecture
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = "default", size = "md", style, ...props }, ref) => {
    // 🎯 Combine styles: Base + Variant + Size + Custom
    const combinedStyles = {
      ...tableStyles.base,
      ...(variant && tableStyles.variants[variant]),
      ...(size && tableStyles.sizes[size]),
      ...style, // Allow style overrides
    };

    return (
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          className={cn(tableVariants({ variant, size }), className)}
          style={combinedStyles}
          {...props}
        />
      </div>
    );
  }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, style, ...props }, ref) => {
    const combinedStyles = {
      ...tableStyles.header,
      ...style,
    };

    return (
      <thead
        ref={ref}
        className={cn(tableHeaderVariants(), className)}
        style={combinedStyles}
        {...props}
      />
    );
  }
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
  ({ className, variant = "default", ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ variant }), className)}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      sortable = false,
      sortDirection,
      onSort,
      children,
      style,
      ...props
    },
    ref
  ) => {
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

    return (
      <th
        ref={ref}
        className={cn(tableHeadVariants({ sortable }), className)}
        onClick={handleSort}
        style={combinedStyles}
        {...props}
      >
        <div className="flex items-center space-x-2">
          <span>{children}</span>
          {sortable && (
            <span className="ml-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className={cn(
                  "fill-[var(--color-text-heading, #1f2937)] transition-transform duration-150",
                  sortDirection === "desc" ? "rotate-180" : "rotate-0",
                  !sortDirection && "opacity-40"
                )}
              >
                <path d="M8 2L6 6h1.5v8h1v-8H10L8 2z" />
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
  ({ className, size = "md", style, ...props }, ref) => {
    const combinedStyles = {
      color: tableStyles.cell.color,
      ...style,
    };

    return (
      <td
        ref={ref}
        className={cn(tableCellVariants({ size }), className)}
        style={combinedStyles}
        {...props}
      />
    );
  }
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
