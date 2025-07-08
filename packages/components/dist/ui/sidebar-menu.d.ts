import React from "react";
import { type VariantProps } from "class-variance-authority";
import { sidebarVariants } from "./sidebar";
export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
    children: React.ReactNode;
    collapsed?: boolean;
    onToggleCollapse?: (open: boolean) => void;
}
declare const SidebarMenu: React.ForwardRefExoticComponent<SidebarMenuProps & React.RefAttributes<HTMLDivElement>>;
export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    open: boolean;
    onToggle: (open: boolean) => void;
}
declare const SidebarToggle: React.ForwardRefExoticComponent<SidebarToggleProps & React.RefAttributes<HTMLButtonElement>>;
export { SidebarMenu, SidebarToggle, sidebarVariants };
