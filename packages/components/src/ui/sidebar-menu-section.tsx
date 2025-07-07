// packages/components/src/ui/sidebar-menu-section.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses centralized sidebar utilities for consistent styling.

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  sidebarMenuSectionRootVariants,
  sidebarMenuSectionVariants,
  sidebarMenuSectionTriggerVariants,
  sidebarMenuSectionContentVariants,
  sidebarBadgeVariants,
  getSidebarSectionAriaLabel,
} from "./sidebar";
import { LucideIcon } from "lucide-react";

// 🎯 TypeScript Interfaces
export interface SidebarMenuSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  value?: string;
  className?: string;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  badge?: string | number;
}

// Simplified props focused on "multiple" type (most common use case)
export interface SidebarMenuSectionRootProps {
  children: React.ReactNode;
  className?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

// 🎯 Sidebar Menu Section Root Component
const SidebarMenuSectionRootComponent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  SidebarMenuSectionRootProps
>(({ className, children, value, onValueChange, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(sidebarMenuSectionRootVariants(), className)}
      type="multiple"
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  );
});

SidebarMenuSectionRootComponent.displayName = "SidebarMenuSectionRoot";

// 🎯 Sidebar Menu Section Component (Accordion Item)
const SidebarMenuSection = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  SidebarMenuSectionProps
>(
  (
    {
      title,
      icon: Icon,
      children,
      value,
      className,
      expanded = false,
      onToggle,
      badge,
      ...props
    },
    ref
  ) => {
    // Use title as value if not provided
    const sectionValue = value || title.toLowerCase().replace(/\s+/g, "-");

    // Generate accessible label for screen readers
    const getAriaLabel = () => {
      return getSidebarSectionAriaLabel(title, expanded, badge);
    };

    return (
      <AccordionPrimitive.Item
        ref={ref}
        className={cn(sidebarMenuSectionVariants(), className)}
        value={sectionValue}
        {...props}
      >
        {/* Accordion Header with Trigger */}
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger
            className={cn(sidebarMenuSectionTriggerVariants())}
            onClick={() => onToggle?.(!expanded)}
            aria-label={getAriaLabel()}
            aria-expanded={expanded}
          >
            {/* Left section: Icon + Title + Badge */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {Icon && (
                <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              )}
              <span className="truncate font-semibold">{title}</span>
              {badge && (
                <span
                  className={cn(sidebarBadgeVariants())}
                  aria-label={`${badge} items in ${title} section`}
                >
                  {badge}
                </span>
              )}
            </div>

            {/* Right section: Chevron indicator */}
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>

        {/* Accordion Content */}
        <AccordionPrimitive.Content
          className={cn(sidebarMenuSectionContentVariants())}
          role="region"
          aria-labelledby={`section-${sectionValue}`}
        >
          {/* Content wrapper with proper padding */}
          <div className="pt-1 pb-3 px-2">{children}</div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  }
);

SidebarMenuSection.displayName = "SidebarMenuSection";

// Export components
export { SidebarMenuSectionRootComponent as SidebarMenuSectionRoot };
export {
  SidebarMenuSection,
  sidebarMenuSectionVariants,
  sidebarMenuSectionTriggerVariants,
  sidebarMenuSectionContentVariants,
};
