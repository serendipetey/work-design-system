// packages/components/src/ui/sidebar-menu-section.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
const sidebarMenuSectionVariants = cva([
    "border-b border-[var(--color-border-subtle)] last:border-b-0",
]);
const sidebarMenuSectionTriggerVariants = cva([
    "flex items-center justify-between w-full px-4 py-3",
    "text-sm font-semibold text-[var(--color-text-heading)]",
    "hover:bg-[var(--color-accent)] transition-colors duration-150",
    "focus-visible:outline-none",
    "focus-visible:bg-[var(--color-focus-500)] focus-visible:text-[var(--color-navy-500)]",
    "focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-1",
    "focus:ring-offset-[var(--color-surface)]",
    "group relative",
    "min-h-[44px] sm:min-h-[40px]",
    // Added Option A expanded state styling
    "data-[state=open]:bg-[var(--color-navy-100)]",
]);
const sidebarMenuSectionContentVariants = cva([
    "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
    "overflow-hidden",
    // Option A: Expanded section gets navy-100 background
    "data-[state=open]:bg-[var(--color-navy-100)]",
]);
// Component implementations
const SidebarMenuSectionRoot = React.forwardRef(({ className, type = "multiple", collapsible = true, children, value, onValueChange, ...props }, ref) => {
    if (type === "single") {
        return (_jsx(AccordionPrimitive.Root, { ref: ref, type: "single", collapsible: collapsible, value: typeof value === "string" ? value : undefined, onValueChange: onValueChange, className: cn("w-full", className), ...props, children: children }));
    }
    return (_jsx(AccordionPrimitive.Root, { ref: ref, type: "multiple", value: Array.isArray(value) ? value : [], onValueChange: onValueChange, className: cn("w-full", className), ...props, children: children }));
});
SidebarMenuSectionRoot.displayName = "SidebarMenuSectionRoot";
const SidebarMenuSection = React.forwardRef(({ className, title, icon: Icon, children, value, expanded, onToggle, badge, }, ref) => {
    const sectionValue = value || title.toLowerCase().replace(/\s+/g, "-");
    // Generate accessible label for screen readers
    const getAriaLabel = () => {
        let label = `${title} section`;
        if (badge) {
            label += `, ${badge} items`;
        }
        label += expanded ? ", expanded" : ", collapsed";
        return label;
    };
    return (_jsxs(AccordionPrimitive.Item, { ref: ref, className: cn(sidebarMenuSectionVariants(), className), value: sectionValue, children: [_jsx(AccordionPrimitive.Header, { children: _jsxs(AccordionPrimitive.Trigger, { className: cn(sidebarMenuSectionTriggerVariants()), onClick: () => onToggle?.(!expanded), "aria-label": getAriaLabel(), "aria-expanded": expanded, children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [Icon && (_jsx(Icon, { className: "w-4 h-4 flex-shrink-0", "aria-hidden": "true" })), _jsx("span", { className: "truncate font-semibold", children: title }), badge && (_jsx("span", { className: "flex-shrink-0 ml-auto px-1.5 py-0.5 text-xs font-medium rounded-full bg-[var(--color-red-500)] text-[var(--color-white)]", "aria-label": `${badge} items in ${title} section`, children: badge }))] }), _jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180", "aria-hidden": "true" })] }) }), _jsx(AccordionPrimitive.Content, { className: cn(sidebarMenuSectionContentVariants()), role: "region", "aria-labelledby": `section-${sectionValue}`, children: _jsx("div", { className: "pt-1 pb-3 px-2", children: children }) })] }));
});
SidebarMenuSection.displayName = "SidebarMenuSection";
export { SidebarMenuSectionRoot, SidebarMenuSection, sidebarMenuSectionVariants, sidebarMenuSectionTriggerVariants, sidebarMenuSectionContentVariants, };
