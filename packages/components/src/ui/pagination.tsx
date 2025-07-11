// File: packages/components/src/ui/pagination.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// Pagination container variants
const paginationVariants = cva(
  ["mx-auto flex w-full justify-center items-center space-x-1"].join(" ")
);

// Pagination item variants - only pagination-specific overrides
const paginationItemVariants = cva(
  [
    // Override padding to make square buttons for page numbers
    "!p-0", // !important to override Button component padding
  ].join(" "),
  {
    variants: {
      size: {
        sm: "!h-6 !w-6 !text-xs",
        md: "!h-8 !w-8 !text-sm",
        lg: "!h-10 !w-10 !text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Navigation button variants - only pagination-specific sizing
const paginationNavVariants = cva(
  [
    // Override height for pagination navigation
    "!h-8 !px-3", // !important to override Button component sizing
  ].join(" ")
);

// Results text variants
const paginationResultsVariants = cva(
  ["text-sm text-[var(--color-charcoal-500)]", "flex items-center gap-1"].join(
    " "
  )
);

// Component Interfaces
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showResults?: boolean;
  maxVisiblePages?: number;
}

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {
  isActive?: boolean;
  page: number;
}

export interface PaginationNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export interface PaginationResultsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

// Helper function to generate page numbers
const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | "ellipsis")[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const halfVisible = Math.floor(maxVisible / 2);
  const pages: (number | "ellipsis")[] = [];

  if (currentPage <= halfVisible + 1) {
    // Show: 1, 2, 3, 4, ..., last
    for (let i = 1; i <= maxVisible - 2; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - halfVisible) {
    // Show: 1, ..., last-3, last-2, last-1, last
    pages.push(1);
    pages.push("ellipsis");
    for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
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
const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      totalItems,
      currentPage,
      itemsPerPage,
      onPageChange,
      showResults = true,
      maxVisiblePages = 7,
      ...props
    },
    ref
  ) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = generatePageNumbers(currentPage, totalPages, maxVisiblePages);

    if (totalPages <= 1) return null;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        className={cn("flex flex-col space-y-4", className)}
        {...props}
      >
        {/* Results count */}
        {showResults && (
          <PaginationResults
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        )}

        {/* Pagination controls */}
        <div className={cn(paginationVariants())}>
          {/* Previous button */}
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {/* Page numbers */}
          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <PaginationItem
                key={page}
                page={page}
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              />
            )
          )}

          {/* Next button */}
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </div>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, isActive, page, size, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={isActive ? "primary" : "outline"}
        appearance={isActive ? "solid" : "ghost"}
        size={size}
        className={cn(paginationItemVariants({ size }), className)}
        aria-label={`Go to page ${page}`}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {page}
      </Button>
    );
  }
);
PaginationItem.displayName = "PaginationItem";

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationNavProps
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    appearance="ghost"
    size="md"
    className={cn(paginationNavVariants(), className)}
    aria-label="Go to previous page"
    {...props}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mr-1"
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Previous
  </Button>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNavProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      appearance="ghost"
      size="md"
      className={cn(paginationNavVariants(), className)}
      aria-label="Go to next page"
      {...props}
    >
      Next
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="ml-1"
      >
        <path
          d="M6 4L10 8L6 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  )
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn(
      "flex h-8 w-8 items-center justify-center text-[var(--color-charcoal-500)]",
      className
    )}
    {...props}
  >
    …
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationResults = React.forwardRef<
  HTMLDivElement,
  PaginationResultsProps
>(({ className, currentPage, itemsPerPage, totalItems, ...props }, ref) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      ref={ref}
      className={cn(paginationResultsVariants(), className)}
      {...props}
    >
      <span>Showing</span>
      <strong>{startItem}</strong>
      <span>to</span>
      <strong>{endItem}</strong>
      <span>of</span>
      <strong>{totalItems}</strong>
      <span>results</span>
    </div>
  );
});
PaginationResults.displayName = "PaginationResults";

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationResults,
  paginationVariants,
  paginationItemVariants,
  paginationNavVariants,
  paginationResultsVariants,
};
