// packages/components/src/ui/sidebar-menu-item.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const sidebarMenuItemVariants = cva(
  [
    "flex items-center gap-3 px-4 py-3 w-full text-left",
    "text-sm font-medium transition-colors duration-150",
    "hover:bg-[var(--color-navy-200)] hover:text-[var(--color-navy-600)]",
    "focus-visible:outline-none",
    "focus-visible:bg-[var(--color-focus-500)] focus-visible:text-[var(--color-navy-500)]",
    "disabled:opacity-50 disabled:pointer-events-none",
    // Enhanced accessibility states
    "focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-1",
    "focus:ring-offset-[var(--color-surface)]",
    // Added border radius for softer appearance
    "rounded-[var(--radius-md)]",
    // Improved text contrast
    "group relative",
  ],
  {
    variants: {
      active: {
        true: [
          "bg-[var(--color-navy-500)]",
          "text-[var(--color-white)]",
          "font-semibold",
          // Removed border-r-2 for seamless appearance
        ].join(" "),
        false: "text-[var(--color-text-body)]",
      },
      size: {
        sm: "px-3 py-2 text-xs gap-2",
        md: "px-4 py-3 text-sm gap-3",
        lg: "px-6 py-4 text-base gap-4",
      },
    },
    defaultVariants: {
      active: false,
      size: "md",
    },
  }
);

export interface SidebarMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuItemVariants> {
  icon?: LucideIcon;
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  badge?: string | number;
  asChild?: boolean;
  onNavigate?: (href: string) => void;
  disabled?: boolean;
}

const SidebarMenuItem = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuItemProps
>(
  (
    {
      className,
      icon: Icon,
      children,
      href,
      active,
      size,
      badge,
      onNavigate,
      asChild = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (href && onNavigate) {
        e.preventDefault();
        onNavigate(href);
      }
      props.onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if ((e.key === "Enter" || e.key === " ") && href && onNavigate) {
        e.preventDefault();
        onNavigate(href);
      }
      props.onKeyDown?.(e);
    };

    // Generate accessible label for screen readers
    const getAriaLabel = () => {
      let label = typeof children === "string" ? children : "";
      if (badge) {
        label += `, ${badge} items pending`;
      }
      if (active) {
        label += ", current page";
      }
      return label;
    };

    const content = (
      <>
        {Icon && (
          <Icon
            className={cn(
              "flex-shrink-0",
              size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"
            )}
            aria-hidden="true"
          />
        )}
        <span className="truncate flex-1 min-w-0">{children}</span>
        {badge && (
          <span
            className={cn(
              "flex-shrink-0 ml-auto px-1.5 py-0.5 text-xs font-medium rounded-full",
              "bg-[var(--color-red-500)] text-[var(--color-white)]",
              size === "sm" ? "text-xs px-1 py-0.5" : "text-xs px-1.5 py-0.5"
            )}
            aria-label={`${badge} pending items`}
          >
            {badge}
          </span>
        )}
      </>
    );

    const commonProps = {
      className: cn(sidebarMenuItemVariants({ active, size }), className),
      "aria-label": getAriaLabel(),
      "aria-current": active ? ("page" as const) : undefined,
      disabled,
    };

    if (href && !onNavigate) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          {...commonProps}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...commonProps}
        {...props}
      >
        {content}
      </button>
    );
  }
);
SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem, sidebarMenuItemVariants };
