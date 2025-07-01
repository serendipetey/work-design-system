// packages/components/src/ui/table.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// INHERIT FROM INPUT! - DRY Principle
// Table sizing inherits from Input sizing system (sm/md/lg/xl)
const tableSizeVariants = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
} as const;

const tableCellPadding = {
  sm: "px-2 py-1",
  md: "px-3 py-2",
  lg: "px-4 py-3",
  xl: "px-5 py-4",
} as const;

// Table container - uses existing design tokens
const tableVariants = cva(
  [
    "w-full border-collapse",
    "border border-[var(--color-border)]",
    "bg-[var(--color-surface)]",
    "rounded-md overflow-hidden",
  ],
  {
    variants: {
      size: tableSizeVariants,
      variant: {
        default: "",
        striped:
          "[&_tbody_tr:nth-child(even)]:bg-[var(--color-surface-subtle)]",
        bordered: "[&_td]:border-b [&_td]:border-[var(--color-border)]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

// Table header - inherits focus system and typography tokens
const tableHeaderVariants = cva(
  [
    "border-b border-[var(--color-border)]",
    "bg-[var(--color-surface)]",
    "text-[var(--color-text-heading)]", // Uses navy-500 for headers
    "font-medium",
    "[&_th]:text-left",
  ],
  {
    variants: {
      size: tableSizeVariants,
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Table head cell - follows Input sizing system
const tableHeadVariants = cva(
  [
    "font-medium text-left",
    "text-[var(--color-text-heading)]", // Uses navy-500 for headers
    "border-b border-[var(--color-border)]",
    // Sortable headers get hover state
    "group-hover/sortable:bg-[var(--color-accent)]",
    "group-hover/sortable:text-[var(--color-accent-foreground)]",
  ],
  {
    variants: {
      size: tableCellPadding,
      sortable: {
        true: "cursor-pointer transition-colors duration-200",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      sortable: false,
    },
  }
);

// Table body - uses existing surface tokens
const tableBodyVariants = cva([
  "bg-[var(--color-surface)]",
  "[&_tr:hover]:bg-[var(--color-accent)]",
  "[&_tr:hover]:text-[var(--color-accent-foreground)]",
]);

// Table row - inherits Input's focus states
const tableRowVariants = cva(
  [
    "transition-colors duration-200",
    "border-b border-[var(--color-border)]",
    // Focus states inherit from Input's design token system
    "focus-visible:outline-none",
    "focus-visible:ring-0",
    "focus-visible:shadow-[var(--table-row-focus-shadow-default)]",
    "focus:shadow-[var(--table-row-focus-shadow-default)]",
  ],
  {
    variants: {
      variant: {
        default: "",
        selected:
          "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]",
        error: [
          "bg-[var(--color-surface-error)]",
          "border-[var(--color-border-error)]",
          "focus-visible:shadow-[var(--table-row-focus-shadow-error)]",
          "focus:shadow-[var(--table-row-focus-shadow-error)]",
        ],
        success: [
          "bg-[var(--color-surface-success)]",
          "border-[var(--color-border-success)]",
          "focus-visible:shadow-[var(--table-row-focus-shadow-success)]",
          "focus:shadow-[var(--table-row-focus-shadow-success)]",
        ],
        warning: [
          "bg-[var(--color-surface-warning)]",
          "border-[var(--color-border-warning)]",
          "focus-visible:shadow-[var(--table-row-focus-shadow-warning)]",
          "focus:shadow-[var(--table-row-focus-shadow-warning)]",
        ],
      },
      clickable: {
        true: "cursor-pointer hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      clickable: false,
    },
  }
);

// Table cell - inherits Input sizing exactly
const tableCellVariants = cva(
  [
    "text-[var(--color-text-primary)]",
    "border-b border-[var(--color-border)]",
    "align-middle",
  ],
  {
    variants: {
      size: tableCellPadding,
      textAlign: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "md",
      textAlign: "left",
    },
  }
);

// TypeScript Interfaces - following Input component pattern
export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  containerClassName?: string;
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableHeaderVariants> {}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {
  onClick?: () => void;
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {
  sortable?: boolean;
  onSort?: () => void;
}

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align">,
    VariantProps<typeof tableCellVariants> {
  textAlign?: "left" | "center" | "right";
}

// Table Container - Primary component
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, variant, size, ...props }, ref) => (
    <div className={cn("relative w-full overflow-auto", containerClassName)}>
      <table
        ref={ref}
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

// Table Header
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants({ size }), className)}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

// Table Body
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

// Table Row - with Input-inherited focus states
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, clickable, onClick, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        tableRowVariants({
          variant,
          clickable: clickable || !!onClick,
        }),
        className
      )}
      onClick={onClick}
      tabIndex={clickable || onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

// Table Head - with sortable functionality
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, size, sortable, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        tableHeadVariants({ size, sortable }),
        sortable && "group/sortable",
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      {children}
      {sortable && (
        <span className="ml-2 inline-flex items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-50 group-hover/sortable:opacity-100"
          >
            <path d="M7 10l5-5 5 5M7 14l5 5 5-5" />
          </svg>
        </span>
      )}
    </th>
  )
);
TableHead.displayName = "TableHead";

// Table Cell - inherits Input sizing system
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, textAlign, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size, textAlign }), className)}
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
  tableRowVariants,
  tableCellVariants,
  tableHeadVariants,
};
