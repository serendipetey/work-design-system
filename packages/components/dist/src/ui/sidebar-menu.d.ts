import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const sidebarMenuVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    mobile?: "hidden" | "push" | "overlay" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarMenuVariants> {
    children: React.ReactNode;
    mobileOpen?: boolean;
    onMobileToggle?: (open: boolean) => void;
}
declare const SidebarMenu: React.ForwardRefExoticComponent<SidebarMenuProps & React.RefAttributes<HTMLDivElement>>;
export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    open: boolean;
    onToggle: (open: boolean) => void;
}
declare const SidebarToggle: React.ForwardRefExoticComponent<SidebarToggleProps & React.RefAttributes<HTMLButtonElement>>;
export { SidebarMenu, SidebarToggle, sidebarMenuVariants };
