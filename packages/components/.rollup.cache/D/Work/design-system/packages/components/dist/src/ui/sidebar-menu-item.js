import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/sidebar-menu-item.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses centralized sidebar utilities for consistent styling.
import React from "react";
import { cn } from "@/lib/utils";
import { sidebarMenuItemVariants, sidebarBadgeVariants, getSidebarIconSize, getSidebarItemAriaLabel, } from "./sidebar";
// 🎯 Sidebar Menu Item Component
const SidebarMenuItem = React.forwardRef(({ className, icon: Icon, children, href, active = false, size = "md", badge, disabled = false, onNavigate, style, ...props }, ref) => {
    // Handle click events
    const handleClick = (e) => {
        if (disabled)
            return;
        if (href && onNavigate) {
            e.preventDefault();
            onNavigate(href);
        }
        props.onClick?.(e);
    };
    // Handle keyboard navigation
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
    const ariaLabel = getSidebarItemAriaLabel(typeof children === "string" ? children : "", badge, active);
    // 🎯 Build content with icon, text, and badge
    const content = (_jsxs(_Fragment, { children: [Icon && (_jsx(Icon, { className: cn("flex-shrink-0", getSidebarIconSize(size || "md")), "aria-hidden": "true" })), _jsx("span", { className: "truncate flex-1 min-w-0", children: children }), badge && (_jsx("span", { className: cn(sidebarBadgeVariants({ size })), "aria-label": `${badge} pending items`, children: badge }))] }));
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
        "aria-current": active ? "page" : undefined,
        disabled,
    };
    // 🎯 Render as anchor if href provided without onNavigate
    if (href && !onNavigate) {
        return (_jsx("a", { ref: ref, href: href, ...commonProps, ...props, children: content }));
    }
    // 🎯 Render as button (default)
    return (_jsx("button", { ref: ref, onClick: handleClick, onKeyDown: handleKeyDown, ...commonProps, ...props, children: content }));
});
SidebarMenuItem.displayName = "SidebarMenuItem";
export { SidebarMenuItem, sidebarMenuItemVariants };
