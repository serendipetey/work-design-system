// packages/components/src/ui/sidebar-profile.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { User, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
const sidebarProfileVariants = cva([
    "flex flex-col p-4 border-b border-[var(--color-border)]",
    "bg-[var(--color-surface-subtle)]",
]);
const SidebarProfile = React.forwardRef(({ className, user, onSwitchEntity, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn(sidebarProfileVariants(), className), ...props, children: [_jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: "flex-shrink-0 mt-1", children: _jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center", children: _jsx(User, { className: "w-4 h-4 text-[var(--color-white)]" }) }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--color-text-heading)] truncate", children: user.entity.name }), _jsx("p", { className: "text-sm text-[var(--color-text-body)] truncate", children: user.contact.name }), _jsx("p", { className: "text-xs text-[var(--color-text-muted)] truncate", children: user.contact.role })] })] }), onSwitchEntity && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onSwitchEntity, leftIcon: _jsx(ArrowUpDown, { className: "w-4 h-4" }), className: "justify-start text-[var(--color-text-link)] hover:text-[var(--color-text-link-hover)]", children: "Switch Entity" }))] }));
});
SidebarProfile.displayName = "SidebarProfile";
export { SidebarProfile, sidebarProfileVariants };
//# sourceMappingURL=sidebar-profile.js.map