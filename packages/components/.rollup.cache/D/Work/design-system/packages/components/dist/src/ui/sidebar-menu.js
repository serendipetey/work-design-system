// packages/components/src/ui/sidebar-menu.tsx
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const sidebarMenuVariants = cva([
    "flex flex-col h-full bg-[var(--color-surface)]",
    "border-r border-[var(--color-border)]",
    "overflow-y-auto overflow-x-hidden",
    // Responsive width management
    "w-64 sm:w-64 md:w-72 lg:w-80",
    // Mobile responsive - can be controlled by parent
    "min-w-0 flex-shrink-0",
], {
    variants: {
        size: {
            sm: "w-56 sm:w-56 md:w-60 lg:w-64",
            md: "w-64 sm:w-64 md:w-72 lg:w-80",
            lg: "w-72 sm:w-72 md:w-80 lg:w-96",
        },
        mobile: {
            hidden: "hidden sm:flex",
            overlay: "fixed inset-y-0 left-0 z-50 sm:relative sm:inset-auto",
            push: "relative",
        },
    },
    defaultVariants: {
        size: "md",
        mobile: "push",
    },
});
const SidebarMenu = React.forwardRef(({ className, children, size, mobile, mobileOpen = false, onMobileToggle, ...props }, ref) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && mobile === "overlay") {
            onMobileToggle?.(false);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Escape" && mobile === "overlay" && mobileOpen) {
            onMobileToggle?.(false);
        }
    };
    // Mobile overlay backdrop
    if (mobile === "overlay") {
        return (_jsxs(_Fragment, { children: [mobileOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-40 sm:hidden", onClick: handleBackdropClick, onKeyDown: handleKeyDown, role: "button", tabIndex: -1, "aria-label": "Close sidebar" })), _jsx("nav", { ref: ref, className: cn(sidebarMenuVariants({ size, mobile }), mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full sm:translate-x-0", "transition-transform duration-300 ease-in-out", className), role: "navigation", "aria-label": "Main navigation", "aria-hidden": !mobileOpen ? "true" : undefined, onKeyDown: handleKeyDown, ...props, children: children })] }));
    }
    return (_jsx("nav", { ref: ref, className: cn(sidebarMenuVariants({ size, mobile }), className), role: "navigation", "aria-label": "Main navigation", ...props, children: children }));
});
SidebarMenu.displayName = "SidebarMenu";
const SidebarToggle = React.forwardRef(({ className, open, onToggle, ...props }, ref) => {
    return (_jsx("button", { ref: ref, onClick: () => onToggle(!open), className: cn("sm:hidden p-2 rounded-md text-[var(--color-text-body)]", "hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]", "focus-visible:outline-none focus-visible:bg-[var(--color-focus-500)]", "focus-visible:text-[var(--color-navy-500)]", className), "aria-label": open ? "Close navigation menu" : "Open navigation menu", "aria-expanded": open, ...props, children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: open ? (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })) : (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })) }) }));
});
SidebarToggle.displayName = "SidebarToggle";
export { SidebarMenu, SidebarToggle, sidebarMenuVariants };
