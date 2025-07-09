import React from "react";
export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "standalone" | "layout";
    collapsed?: boolean;
    onToggleCollapse?: (collapsed: boolean) => void;
}
declare const SidebarMenu: React.ForwardRefExoticComponent<SidebarMenuProps & React.RefAttributes<HTMLDivElement>>;
export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    open: boolean;
    onToggle: (open: boolean) => void;
    size?: "sm" | "md" | "lg";
}
declare const SidebarToggle: React.ForwardRefExoticComponent<SidebarToggleProps & React.RefAttributes<HTMLButtonElement>>;
export { SidebarMenu, SidebarToggle };
