// packages/components/src/ui/sidebar-menu.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses centralized sidebar utilities for consistent styling
// across all sidebar components with reliable fallback values.

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { sidebarVariants } from "./sidebar";

// 🎯 TypeScript Interface
export interface SidebarMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  children: React.ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: (open: boolean) => void;
}

// 🎯 Main Sidebar Menu Container Component
const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(
  (
    {
      className,
      size = "md",
      collapsed = false,
      onToggleCollapse,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // 🎯 Combine styles: Base + Variant + Custom
    const combinedStyles = {
      // Apply any additional inline styles if needed
      ...style,
    };

    // Build final className using centralized utilities
    const finalClassName = cn(
      sidebarVariants({ size }),
      // Handle collapsed state if implemented
      collapsed && "w-16", // Collapsed width override
      className
    );

    return (
      <div
        {...props}
        ref={ref}
        className={finalClassName}
        style={combinedStyles}
        role="navigation"
        aria-label="Main navigation"
      >
        {children}
      </div>
    );
  }
);

SidebarMenu.displayName = "SidebarMenu";

// 🎯 Sidebar Toggle Component (Mobile)
export interface SidebarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
  onToggle: (open: boolean) => void;
}

const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, open, onToggle, ...props }, ref) => {
    const handleClick = () => {
      onToggle(!open);
    };

    return (
      <button
        {...props}
        ref={ref}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center p-2 rounded-md",
          "text-[var(--color-text-body,#374151)]",
          "hover:bg-[var(--color-surface-subtle,#f8fafc)] hover:text-[var(--color-text-heading,#111827)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-500,#3b82f6)] focus:ring-offset-2",
          "transition-colors duration-150",
          className
        )}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    );
  }
);

SidebarToggle.displayName = "SidebarToggle";

export { SidebarMenu, SidebarToggle, sidebarVariants };
