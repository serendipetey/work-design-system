import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
declare const sidebarMenuItemVariants: (props?: ({
    active?: boolean | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SidebarMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof sidebarMenuItemVariants> {
    icon?: LucideIcon;
    children: React.ReactNode;
    href?: string;
    active?: boolean;
    badge?: string | number;
    asChild?: boolean;
    onNavigate?: (href: string) => void;
    disabled?: boolean;
}
declare const SidebarMenuItem: React.ForwardRefExoticComponent<SidebarMenuItemProps & React.RefAttributes<HTMLButtonElement>>;
export { SidebarMenuItem, sidebarMenuItemVariants };
//# sourceMappingURL=sidebar-menu-item.d.ts.map