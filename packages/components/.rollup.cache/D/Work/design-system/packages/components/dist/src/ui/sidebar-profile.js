import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/sidebar-profile.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses centralized sidebar utilities for consistent styling.
import React from "react";
import { User, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarProfileVariants } from "./sidebar";
import { Button } from "./button";
// 🎯 Sidebar Profile Component
const SidebarProfile = React.forwardRef(({ className, user, onSwitchEntity, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn(sidebarProfileVariants(), className), ...props, children: [_jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: "flex-shrink-0 mt-1", children: _jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--color-primary,#1e40af)] flex items-center justify-center", children: _jsx(User, { className: "w-4 h-4 text-[var(--color-white,#ffffff)]" }) }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--color-text-heading,#111827)] truncate", children: user.entity.name }), _jsx("p", { className: "text-sm text-[var(--color-text-body,#374151)] truncate", children: user.contact.name }), _jsx("p", { className: "text-xs text-[var(--color-text-muted,#6b7280)] truncate", children: user.contact.role })] })] }), onSwitchEntity && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onSwitchEntity, leftIcon: _jsx(ArrowUpDown, { className: "w-4 h-4" }), className: "justify-start text-[var(--color-text-link,#2563eb)] hover:text-[var(--color-text-link-hover,#1d4ed8)]", children: "Switch Entity" }))] }));
});
SidebarProfile.displayName = "SidebarProfile";
export { SidebarProfile, sidebarProfileVariants };
