import React from "react";
import { type VariantProps } from "class-variance-authority";
import { sidebarMenuItemVariants } from "./sidebar";
import { LucideIcon } from "lucide-react";
export interface SidebarMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof sidebarMenuItemVariants> {
    icon?: LucideIcon;
    children: React.ReactNode;
    href?: string;
    active?: boolean;
    badge?: string | number;
    disabled?: boolean;
    onNavigate?: (href: string) => void;
}
declare const SidebarMenuItem: React.ForwardRefExoticComponent<SidebarMenuItemProps & React.RefAttributes<HTMLButtonElement>>;
export { SidebarMenuItem, sidebarMenuItemVariants };
