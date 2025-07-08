// packages/components/src/ui/sidebar-menu.tsx
// 🎯 ENHANCED INDUSTRY-STANDARD SIDEBAR MENU COMPONENT
// Layout-first design that eliminates width constraint conflicts

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { sidebarVariants, sidebarContainerVariants } from "./sidebar";

// 🎯 ENHANCED: Layout-First Interface
export interface SidebarMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  children: React.ReactNode;

  // 🎯 NEW: Layout mode for better integration
  mode?: "standalone" | "layout";

  // 🎯 DEPRECATED: size prop (now controlled by container)
  // @deprecated Use container width classes instead: "w-64", "w-72", etc.
  size?: "sm" | "md" | "lg" | "xl";

  // Optional: Collapse state
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;

  // 🎯 NEW: Container integration helper
  asContainer?: boolean;
}

// 🎯 ENHANCED: Industry-Standard Sidebar Menu Component
const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(
  (
    {
      className,
      variant,
      mode = "layout",
      size, // Deprecated but maintained for backward compatibility
      collapsed = false,
      onToggleCollapse,
      asContainer = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // 🎯 Smart variant selection based on mode
    const effectiveVariant = React.useMemo(() => {
      if (mode === "standalone") return "standalone";
      return variant || "layout";
    }, [mode, variant]);

    // 🎯 Handle deprecated size prop with warning in development
    React.useEffect(() => {
      if (size && process.env.NODE_ENV === "development") {
        console.warn(
          `SidebarMenu: The 'size' prop is deprecated. Use container width classes instead:
          
  // ❌ Old way
  <SidebarMenu size="md">
  
  // ✅ New way  
  <div className="w-64">
    <SidebarMenu variant="layout">
  
  See migration guide: https://docs.your-domain.com/sidebar-migration`
        );
      }
    }, [size]);

    // 🎯 Build className with layout-first approach
    const finalClassName = cn(
      sidebarVariants({ variant: effectiveVariant }),
      collapsed && "w-16", // Override width when collapsed
      className
    );

    // 🎯 Container Pattern: Wrap in styled container if needed (legacy support)
    if (asContainer) {
      const containerWidth =
        size === "sm"
          ? "w-60"
          : size === "lg"
          ? "w-72"
          : size === "xl"
          ? "w-80"
          : "w-64"; // Default to md

      return (
        <div
          className={cn(
            sidebarContainerVariants({ styled: true, position: "standalone" }),
            containerWidth,
            "flex-shrink-0"
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

    // 🎯 PRIMARY: Layout-First Pattern (Recommended)
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

// 🎯 Enhanced Sidebar Toggle Component (unchanged interface)
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
