// packages/components/src/ui/sidebar-business-logo.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
const sidebarBusinessLogoVariants = cva([
    "flex items-center justify-center p-6",
    "border-b border-[var(--color-border)]",
    "bg-[var(--color-surface)]",
]);
const SidebarBusinessLogo = React.forwardRef(({ className, businessName = "Your Business", logoUrl, width = 120, height = 40, onClick, ...props }, ref) => {
    const isClickable = !!onClick;
    const logoContent = logoUrl ? (_jsx("img", { src: logoUrl, alt: `${businessName} logo`, width: width, height: height, className: "max-w-full h-auto object-contain", style: { maxHeight: height } })) : (
    // Placeholder when no logo provided
    _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded bg-[var(--color-navy-500)] flex items-center justify-center", children: _jsx(Building2, { className: "w-5 h-5 text-[var(--color-white)]" }) }), _jsx("span", { className: "text-lg font-bold text-[var(--color-navy-500)] truncate max-w-[140px]", children: businessName })] }));
    const commonClassName = cn(sidebarBusinessLogoVariants(), isClickable && [
        "cursor-pointer",
        "hover:bg-[var(--color-navy-100)]",
        "transition-colors duration-150",
        "focus-visible:outline-none",
        "focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-1",
        "focus:ring-offset-[var(--color-surface)]",
    ], className);
    if (isClickable) {
        return (_jsx("button", { ref: ref, onClick: onClick, "aria-label": `${businessName} home`, className: commonClassName, ...props, children: logoContent }));
    }
    return (_jsx("div", { ref: ref, className: commonClassName, ...props, children: logoContent }));
});
SidebarBusinessLogo.displayName = "SidebarBusinessLogo";
export { SidebarBusinessLogo, sidebarBusinessLogoVariants };
