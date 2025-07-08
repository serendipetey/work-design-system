import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const paginationVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const paginationItemVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const paginationNavVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const paginationResultsVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    showResults?: boolean;
    maxVisiblePages?: number;
}
export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof paginationItemVariants> {
    isActive?: boolean;
    page: number;
}
export interface PaginationNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
}
export interface PaginationResultsProps extends React.HTMLAttributes<HTMLDivElement> {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
declare const PaginationItem: React.ForwardRefExoticComponent<PaginationItemProps & React.RefAttributes<HTMLButtonElement>>;
declare const PaginationPrevious: React.ForwardRefExoticComponent<PaginationNavProps & React.RefAttributes<HTMLButtonElement>>;
declare const PaginationNext: React.ForwardRefExoticComponent<PaginationNavProps & React.RefAttributes<HTMLButtonElement>>;
declare const PaginationEllipsis: React.ForwardRefExoticComponent<PaginationEllipsisProps & React.RefAttributes<HTMLSpanElement>>;
declare const PaginationResults: React.ForwardRefExoticComponent<PaginationResultsProps & React.RefAttributes<HTMLDivElement>>;
export { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationResults, paginationVariants, paginationItemVariants, paginationNavVariants, paginationResultsVariants, };
//# sourceMappingURL=pagination.d.ts.map