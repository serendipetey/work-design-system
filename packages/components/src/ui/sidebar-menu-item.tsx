// packages/components/src/ui/sidebar-menu-item.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses centralized sidebar utilities for consistent styling.

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  sidebarMenuItemVariants,
  sidebarBadgeVariants,
  getSidebarIconSize,
  getSidebarItemAriaLabel,
} from "./sidebar";
import { LucideIcon } from "lucide-react";

// 🎯 TypeScript Interface
export interface SidebarMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuItemVariants> {
  icon?: LucideIcon;
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  badge?: string | number;
  disabled?: boolean;
  onNavigate?: (href: string) => void;
}

// 🎯 Sidebar Menu Item Component
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
      active = false,
      size = "md",
      badge,
      disabled = false,
      onNavigate,
      style,
      ...props
    },
    ref
  ) => {
    // Handle click events
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (href && onNavigate) {
        e.preventDefault();
        onNavigate(href);
      }
      props.onClick?.(e);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if ((e.key === "Enter" || e.key === " ") && href && onNavigate) {
        e.preventDefault();
        onNavigate(href);
      }
      props.onKeyDown?.(e);
    };

    // Generate accessible label for screen readers
    const ariaLabel = getSidebarItemAriaLabel(
      typeof children === "string" ? children : "",
      badge,
      active
    );

    // 🎯 Build content with icon, text, and badge
    const content = (
      <>
        {Icon && (
          <Icon
            className={cn("flex-shrink-0", getSidebarIconSize(size || "md"))}
            aria-hidden="true"
          />
        )}
        <span className="truncate flex-1 min-w-0">{children}</span>
        {badge && (
          <span
            className={cn(sidebarBadgeVariants({ size }))}
            aria-label={`${badge} pending items`}
          >
            {badge}
          </span>
        )}
      </>
    );

    // 🎯 Combine styles: Base + Variant + Custom
    const combinedStyles = {
      // Apply any additional inline styles if needed
      ...style,
    };

    // Common props for both button and anchor variants
    const commonProps = {
      className: cn(sidebarMenuItemVariants({ active, size }), className),
      style: combinedStyles,
      "aria-label": ariaLabel,
      "aria-current": active ? ("page" as const) : undefined,
      disabled,
    };

    // 🎯 Render as anchor if href provided without onNavigate
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

    // 🎯 Render as button (default)
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
