// packages/components/src/ui/sidebar-menu.tsx
// 🎯 SMART SIDEBAR MENU COMPONENT
// Simple API with intelligent layout adaptation

import React from "react";
import { cn } from "@/lib/utils";
import { createSidebarClasses, useLayoutDetection } from "./sidebar";

// 🎯 Clean Interface - Keep it Simple
export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  // Primary API - simple and intuitive
  size?: "sm" | "md" | "lg" | "xl";

  // Advanced usage (optional) - only two variants to match our implementation
  variant?: "standalone" | "layout";

  // Collapse state
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

// 🎯 Smart Sidebar Menu Component
const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(
  (
    {
      className,
      size = "md",
      variant,
      collapsed = false,
      onToggleCollapse,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // 🎯 Smart layout detection using a state-based approach
    const [containerElement, setContainerElement] =
      React.useState<HTMLDivElement | null>(null);
    const isInContainer = useLayoutDetection({ current: containerElement });

    // Ref callback that updates our state and forwards the ref
    const refCallback = React.useCallback(
      (node: HTMLDivElement | null) => {
        // Update our state for layout detection
        setContainerElement(node);

        // Forward to the external ref
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // 🎯 Build classes with smart detection
    const finalClassName = cn(
      createSidebarClasses({
        size,
        variant,
        isInContainer,
        className,
      }),
      collapsed && "w-16", // Override width when collapsed
      className
    );

    return (
      <div
        {...props}
        ref={refCallback}
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

// 🎯 Sidebar Toggle Component (unchanged but simplified)
export interface SidebarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
  onToggle: (open: boolean) => void;
  size?: "sm" | "md" | "lg";
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
