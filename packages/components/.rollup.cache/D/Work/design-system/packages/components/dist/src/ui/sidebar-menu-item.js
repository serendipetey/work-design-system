// packages/components/src/ui/sidebar-menu-item.tsx
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const sidebarMenuItemVariants = cva([
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
], {
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
});
const SidebarMenuItem = React.forwardRef(({ className, icon: Icon, children, href, active, size, badge, onNavigate, asChild = false, disabled, ...props }, ref) => {
    const handleClick = (e) => {
        if (disabled)
            return;
        if (href && onNavigate) {
            e.preventDefault();
            onNavigate(href);
        }
        props.onClick?.(e);
    };
    const handleKeyDown = (e) => {
        if (disabled)
            return;
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
    const content = (_jsxs(_Fragment, { children: [Icon && (_jsx(Icon, { className: cn("flex-shrink-0", size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"), "aria-hidden": "true" })), _jsx("span", { className: "truncate flex-1 min-w-0", children: children }), badge && (_jsx("span", { className: cn("flex-shrink-0 ml-auto px-1.5 py-0.5 text-xs font-medium rounded-full", "bg-[var(--color-red-500)] text-[var(--color-white)]", size === "sm" ? "text-xs px-1 py-0.5" : "text-xs px-1.5 py-0.5"), "aria-label": `${badge} pending items`, children: badge }))] }));
    const commonProps = {
        className: cn(sidebarMenuItemVariants({ active, size }), className),
        "aria-label": getAriaLabel(),
        "aria-current": active ? "page" : undefined,
        disabled,
    };
    if (href && !onNavigate) {
        return (_jsx("a", { ref: ref, href: href, ...commonProps, ...props, children: content }));
    }
    return (_jsx("button", { ref: ref, onClick: handleClick, onKeyDown: handleKeyDown, ...commonProps, ...props, children: content }));
});
SidebarMenuItem.displayName = "SidebarMenuItem";
export { SidebarMenuItem, sidebarMenuItemVariants };
//# sourceMappingURL=sidebar-menu-item.js.map