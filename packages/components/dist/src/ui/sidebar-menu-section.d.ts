import React from "react";
import { sidebarMenuSectionVariants, sidebarMenuSectionTriggerVariants, sidebarMenuSectionContentVariants } from "./sidebar";
import { LucideIcon } from "lucide-react";
export interface SidebarMenuSectionProps {
    title: string;
    icon?: LucideIcon;
    children: React.ReactNode;
    value?: string;
    className?: string;
    expanded?: boolean;
    onToggle?: (expanded: boolean) => void;
    badge?: string | number;
}
export interface SidebarMenuSectionRootProps {
    children: React.ReactNode;
    className?: string;
    value?: string[];
    onValueChange?: (value: string[]) => void;
}
declare const SidebarMenuSectionRootComponent: React.ForwardRefExoticComponent<SidebarMenuSectionRootProps & React.RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSection: React.ForwardRefExoticComponent<SidebarMenuSectionProps & React.RefAttributes<HTMLDivElement>>;
export { SidebarMenuSectionRootComponent as SidebarMenuSectionRoot };
export { SidebarMenuSection, sidebarMenuSectionVariants, sidebarMenuSectionTriggerVariants, sidebarMenuSectionContentVariants, };
//# sourceMappingURL=sidebar-menu-section.d.ts.map