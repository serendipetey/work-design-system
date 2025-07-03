import * as React from "react";
import { LucideIcon } from "lucide-react";
declare const sidebarMenuSectionVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sidebarMenuSectionTriggerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sidebarMenuSectionContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
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
    type?: "single" | "multiple";
    collapsible?: boolean;
    className?: string;
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
}
declare const SidebarMenuSectionRoot: React.ForwardRefExoticComponent<SidebarMenuSectionRootProps & React.RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSection: React.ForwardRefExoticComponent<SidebarMenuSectionProps & React.RefAttributes<HTMLDivElement>>;
export { SidebarMenuSectionRoot, SidebarMenuSection, sidebarMenuSectionVariants, sidebarMenuSectionTriggerVariants, sidebarMenuSectionContentVariants, };
