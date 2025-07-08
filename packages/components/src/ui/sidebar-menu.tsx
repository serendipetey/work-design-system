// packages/components/src/ui/sidebar-menu.tsx
// 🎯 ENHANCED SIDEBAR MENU: Supports multiple usage patterns

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { sidebarVariants, sidebarContainerVariants } from "./sidebar";

// 🎯 Enhanced TypeScript Interface
export interface SidebarMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  children: React.ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: (open: boolean) => void;

  // 🎯 NEW: Usage pattern control
  asContainer?: boolean; // Whether to render as a complete container
}

// 🎯 Enhanced Sidebar Menu Component
const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(
  (
    {
      className,
      size = "md",
      variant = "standalone",
      container = false,
      asContainer = false,
      collapsed = false,
      onToggleCollapse,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // 🎯 Smart variant selection based on usage
    const finalVariant = asContainer ? "borderless" : variant;
    const finalContainer = asContainer ? true : container;

    // Build final className using centralized utilities
    const finalClassName = cn(
      sidebarVariants({
        size,
        variant: finalVariant,
        container: finalContainer,
      }),
      collapsed && "w-16", // Collapsed width override
      className
    );

    // 🎯 Container Pattern: Wrap in styled container if needed
    if (asContainer) {
      return (
        <div
          className={cn(
            sidebarContainerVariants({ styled: true, position: "standalone" }),
            "w-64" // Container controls width
          )}
        >
          <div
            {...props}
            ref={ref}
            className={finalClassName}
            style={style}
            role="navigation"
            aria-label="Main navigation"
          >
            {children}
          </div>
        </div>
      );
    }

    // 🎯 Direct Pattern: Render as complete component
    return (
      <div
        {...props}
        ref={ref}
        className={finalClassName}
        style={style}
        role="navigation"
        aria-label="Main navigation"
      >
        {children}
      </div>
    );
  }
);

SidebarMenu.displayName = "SidebarMenu";

// 🎯 Enhanced Sidebar Toggle Component
export interface SidebarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarVariants> {
  open: boolean;
  onToggle: (open: boolean) => void;
}

const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, open, onToggle, size = "md", ...props }, ref) => {
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
          size === "sm" && "p-1.5",
          size === "lg" && "p-2.5",
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

export { SidebarMenu, SidebarToggle };
