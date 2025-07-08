// packages/components/src/ui/sidebar-layout.tsx
// 🎯 PRE-BUILT LAYOUT SOLUTIONS for common sidebar patterns
// Eliminates boilerplate and ensures correct implementation

import React from "react";
import { cn } from "@/lib/utils";
import { SidebarMenu } from "./sidebar-menu";
import { createSidebarContainer } from "./sidebar";

// 🎯 Complete Sidebar Layout Solution
export interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  sidebarWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  sidebarVariant?: "standalone" | "layout" | "unstyled";
  className?: string;
  sidebarClassName?: string;
  mainClassName?: string;

  // Layout customization
  direction?: "horizontal" | "vertical";
  fullHeight?: boolean;

  // Advanced options
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const SidebarLayout = ({
  children,
  sidebarContent,
  sidebarWidth = "md",
  sidebarVariant = "layout",
  className,
  sidebarClassName,
  mainClassName,
  direction = "horizontal",
  fullHeight = true,
  collapsible = false,
  collapsed = false,
  onCollapsedChange,
}: SidebarLayoutProps) => {
  const [internalCollapsed, setInternalCollapsed] = React.useState(collapsed);

  // Handle controlled vs uncontrolled collapse state
  const isCollapsed = collapsible
    ? onCollapsedChange
      ? collapsed
      : internalCollapsed
    : false;
  const handleCollapse = collapsible
    ? onCollapsedChange || setInternalCollapsed
    : undefined;

  const containerClasses = cn(
    "flex bg-gray-50",
    direction === "horizontal" ? "flex-row" : "flex-col",
    fullHeight ? "h-screen" : "",
    className
  );

  const sidebarContainerClasses = cn(
    createSidebarContainer(isCollapsed ? "sm" : sidebarWidth),
    sidebarClassName
  );

  const mainContentClasses = cn(
    "flex-1 flex flex-col overflow-hidden",
    mainClassName
  );

  return (
    <div className={containerClasses}>
      {/* Sidebar Container */}
      <div className={sidebarContainerClasses}>
        <SidebarMenu
          variant={sidebarVariant}
          className="h-full"
          collapsed={isCollapsed}
          onToggleCollapse={handleCollapse}
        >
          {sidebarContent}
        </SidebarMenu>
      </div>

      {/* Main Content */}
      <div className={mainContentClasses}>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

// 🎯 Specialized Layout: Dashboard with Header
export interface DashboardLayoutProps
  extends Omit<SidebarLayoutProps, "children"> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const DashboardLayout = ({
  children,
  header,
  footer,
  ...sidebarLayoutProps
}: DashboardLayoutProps) => {
  return (
    <SidebarLayout {...sidebarLayoutProps}>
      <div className="flex flex-col h-full">
        {/* Header */}
        {header && (
          <header className="flex-shrink-0 bg-white border-b border-gray-200">
            {header}
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>

        {/* Footer */}
        {footer && (
          <footer className="flex-shrink-0 bg-white border-t border-gray-200">
            {footer}
          </footer>
        )}
      </div>
    </SidebarLayout>
  );
};

// 🎯 Simple Layout: Just Sidebar + Content (Most Common)
export interface SimpleSidebarLayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  sidebarWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export const SimpleSidebarLayout = ({
  children,
  sidebarContent,
  sidebarWidth = "md",
  className,
}: SimpleSidebarLayoutProps) => {
  return (
    <div className={cn("flex h-screen bg-gray-50", className)}>
      {/* ✅ CORRECT PATTERN: Container controls width */}
      <div className={createSidebarContainer(sidebarWidth)}>
        <SidebarMenu variant="layout" className="h-full">
          {sidebarContent}
        </SidebarMenu>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </div>
  );
};

// 🎯 Export all layout components
export default SidebarLayout;
