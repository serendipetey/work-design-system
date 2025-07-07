import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/sidebar-menu-section.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses centralized sidebar utilities for consistent styling.
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarMenuSectionRootVariants, sidebarMenuSectionVariants, sidebarMenuSectionTriggerVariants, sidebarMenuSectionContentVariants, sidebarBadgeVariants, getSidebarSectionAriaLabel, } from "./sidebar";
// 🎯 Sidebar Menu Section Root Component
const SidebarMenuSectionRootComponent = React.forwardRef(({ className, children, value, onValueChange, ...props }, ref) => {
    return (_jsx(AccordionPrimitive.Root, { ref: ref, className: cn(sidebarMenuSectionRootVariants(), className), type: "multiple", value: value, onValueChange: onValueChange, ...props, children: children }));
});
SidebarMenuSectionRootComponent.displayName = "SidebarMenuSectionRoot";
// 🎯 Sidebar Menu Section Component (Accordion Item)
const SidebarMenuSection = React.forwardRef(({ title, icon: Icon, children, value, className, expanded = false, onToggle, badge, ...props }, ref) => {
    // Use title as value if not provided
    const sectionValue = value || title.toLowerCase().replace(/\s+/g, "-");
    // Generate accessible label for screen readers
    const getAriaLabel = () => {
        return getSidebarSectionAriaLabel(title, expanded, badge);
    };
    return (_jsxs(AccordionPrimitive.Item, { ref: ref, className: cn(sidebarMenuSectionVariants(), className), value: sectionValue, ...props, children: [_jsx(AccordionPrimitive.Header, { children: _jsxs(AccordionPrimitive.Trigger, { className: cn(sidebarMenuSectionTriggerVariants()), onClick: () => onToggle?.(!expanded), "aria-label": getAriaLabel(), "aria-expanded": expanded, children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [Icon && (_jsx(Icon, { className: "w-4 h-4 flex-shrink-0", "aria-hidden": "true" })), _jsx("span", { className: "truncate font-semibold", children: title }), badge && (_jsx("span", { className: cn(sidebarBadgeVariants()), "aria-label": `${badge} items in ${title} section`, children: badge }))] }), _jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180", "aria-hidden": "true" })] }) }), _jsx(AccordionPrimitive.Content, { className: cn(sidebarMenuSectionContentVariants()), role: "region", "aria-labelledby": `section-${sectionValue}`, children: _jsx("div", { className: "pt-1 pb-3 px-2", children: children }) })] }));
});
SidebarMenuSection.displayName = "SidebarMenuSection";
// Export components
export { SidebarMenuSectionRootComponent as SidebarMenuSectionRoot };
export { SidebarMenuSection, sidebarMenuSectionVariants, sidebarMenuSectionTriggerVariants, sidebarMenuSectionContentVariants, };
