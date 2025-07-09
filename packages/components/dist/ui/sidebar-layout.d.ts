import React from "react";
export interface SidebarLayoutProps {
    children: React.ReactNode;
    sidebarContent: React.ReactNode;
    sidebarWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
    sidebarVariant?: "standalone" | "layout" | "unstyled";
    className?: string;
    sidebarClassName?: string;
    mainClassName?: string;
    direction?: "horizontal" | "vertical";
    fullHeight?: boolean;
    collapsible?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
}
export declare const SidebarLayout: ({ children, sidebarContent, sidebarWidth, sidebarVariant, className, sidebarClassName, mainClassName, direction, fullHeight, collapsible, collapsed, onCollapsedChange, }: SidebarLayoutProps) => import("react/jsx-runtime").JSX.Element;
export interface DashboardLayoutProps extends Omit<SidebarLayoutProps, "children"> {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}
export declare const DashboardLayout: ({ children, header, footer, ...sidebarLayoutProps }: DashboardLayoutProps) => import("react/jsx-runtime").JSX.Element;
export interface SimpleSidebarLayoutProps {
    children: React.ReactNode;
    sidebarContent: React.ReactNode;
    sidebarWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
    className?: string;
}
export declare const SimpleSidebarLayout: ({ children, sidebarContent, sidebarWidth, className, }: SimpleSidebarLayoutProps) => import("react/jsx-runtime").JSX.Element;
export default SidebarLayout;
