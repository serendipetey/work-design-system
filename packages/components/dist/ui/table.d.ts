import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const tableVariants: (props?: {
    variant?: "default" | "striped" | "minimal";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
declare const tableHeaderVariants: (props?: import("class-variance-authority/types").ClassProp) => string;
declare const tableBodyVariants: (props?: import("class-variance-authority/types").ClassProp) => string;
declare const tableRowVariants: (props?: {
    variant?: "default" | "striped";
} & import("class-variance-authority/types").ClassProp) => string;
declare const tableHeadVariants: (props?: {
    sortable?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
declare const tableCellVariants: (props?: {
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface TableProps extends React.HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {
}
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof tableHeaderVariants> {
}
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof tableBodyVariants> {
}
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof tableRowVariants> {
}
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof tableHeadVariants> {
    sortDirection?: "asc" | "desc" | false;
    onSort?: () => void;
}
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof tableCellVariants> {
}
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<TableHeaderProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, tableVariants, tableHeaderVariants, tableBodyVariants, tableRowVariants, tableHeadVariants, tableCellVariants, };
