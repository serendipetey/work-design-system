// packages/components/src/ui/sidebar.tsx
// 🎯 SMART SIDEBAR ARCHITECTURE WITH AUTO-LAYOUT DETECTION
// Combines simple API with intelligent layout adaptation

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * 🎯 SMART SIDEBAR DESIGN SYSTEM
 *
 * Key Features:
 * - Simple API: <SidebarMenu size="md"> just works
 * - Auto-detection: Adapts to container constraints automatically
 * - Layout compatibility: Works with flex layouts without conflicts
 * - Backward compatible: All existing usage patterns continue to work
 *
 * How it works:
 * 1. Standalone usage: Full styling + width (rounded corners, shadow, borders)
 * 2. Container usage: Auto-detects width constraints, adapts styling
 * 3. No API complexity: Same component, smart behavior
 */

// 🎯 Core Sidebar Variants - Simplified and Smart
export const sidebarVariants = cva(
  [
    "flex flex-col h-full",
    "bg-[var(--color-surface,#ffffff)]",
    "font-[var(--font-family-sans,'Poppins',system-ui,sans-serif)]",
  ],
  {
    variants: {
      // Size provides both width and behavior context
      size: {
        sm: "w-60", // 240px
        md: "w-64", // 256px
        lg: "w-72", // 288px
        xl: "w-80", // 320px
      },
      // Styling variant - auto-selected based on layout context
      variant: {
        // Complete standalone component (default for simple usage)
        standalone: [
          "rounded-lg shadow-sm border border-[var(--color-border,#e5e7eb)]",
          "overflow-hidden",
        ],
        // Layout-adapted - no width conflicts with containers
        layout: ["border-r border-[var(--color-border,#e5e7eb)]"],
      },
      // Internal: Used by smart detection logic
      _internal_layout_detected: {
        true: "",
        false: "",
      },
    },
    // Smart defaults based on usage context
    defaultVariants: {
      size: "md",
      variant: "standalone", // Default to complete styling
      _internal_layout_detected: false,
    },
    // Compound variants for smart behavior
    compoundVariants: [
      {
        _internal_layout_detected: true,
        variant: "standalone",
        class: [
          // When layout detected, remove width to prevent conflicts
          "!w-auto",
          // Keep styling but remove rounded corners (handled by container)
          "!rounded-none !shadow-none !border-l-0 !border-r !border-t-0 !border-b-0",
          "border-r-[var(--color-border,#e5e7eb)]",
        ],
      },
    ],
  }
);

// 🎯 Utility: Smart Layout Detection Class Builder
export function createSidebarClasses({
  size = "md",
  variant,
  className,
  isInContainer = false,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "standalone" | "layout";
  className?: string;
  isInContainer?: boolean;
}) {
  // Smart variant selection
  const effectiveVariant = variant || (isInContainer ? "layout" : "standalone");

  return cn(
    sidebarVariants({
      size,
      variant: effectiveVariant,
      _internal_layout_detected: isInContainer,
    }),
    className
  );
}

// 🎯 Layout Detection Hook (for React components)
export function useLayoutDetection(ref: { current: HTMLElement | null }) {
  const [isInContainer, setIsInContainer] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      setIsInContainer(false);
      return;
    }

    const parent = element.parentElement;

    if (!parent) {
      setIsInContainer(false);
      return;
    }

    // Check if parent has width constraints
    const parentStyles = getComputedStyle(parent);
    const hasWidthConstraint =
      parentStyles.width !== "auto" &&
      parentStyles.width !== "" &&
      !parentStyles.width.includes("100%") &&
      !parentStyles.width.includes("100vw");

    // Check if parent is flex container
    const isFlexContainer = parentStyles.display === "flex";

    // Check for explicit width classes on parent
    const hasWidthClass = Boolean(
      parent.className.match(/w-\d+|w-\[.*?\]|width:/)
    );

    const inContainer =
      hasWidthConstraint || (isFlexContainer && hasWidthClass);
    setIsInContainer(inContainer);
  }, [ref.current]); // Re-run when the element changes

  return isInContainer;
}

// 🎯 Keep existing menu item variants (unchanged)
export const sidebarMenuItemVariants = cva(
  [
    "flex items-center gap-3 px-4 py-3 w-full text-left",
    "text-sm font-medium transition-colors duration-150",
    "rounded-md",
    "focus-visible:outline-none",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      active: {
        true: [
          "bg-[var(--color-navy-600,#1e40af)] text-[var(--color-white,#ffffff)] font-semibold",
          "hover:bg-[var(--color-navy-600,#1e40af)] hover:text-[var(--color-white,#ffffff)]",
          "focus-visible:bg-[var(--color-navy-600,#1e40af)] focus-visible:text-[var(--color-white,#ffffff)]",
          "focus-visible:border-b-[3px] focus-visible:border-b-orange-500",
          "focus-visible:rounded-b-none",
        ],
        false: [
          "text-[var(--color-text-body,#374151)]",
          "hover:bg-[var(--color-navy-200,#e0e7ff)] hover:text-[var(--color-navy-600,#1e40af)]",
          "focus-visible:bg-[var(--button-unified-focus-bg,var(--color-focus-500,#ff9900))]",
          "focus-visible:text-[var(--button-unified-focus-text,var(--color-navy-500,#0e3a6c))]",
          "focus-visible:border-b-[3px] focus-visible:border-b-blue-600",
          "focus-visible:rounded-b-none",
        ],
      },
      size: {
        sm: "px-3 py-2 text-xs rounded-md",
        md: "px-4 py-3 text-sm rounded-md",
        lg: "px-5 py-4 text-base rounded-md",
      },
    },
    defaultVariants: { active: false, size: "md" },
  }
);

// 🎯 Keep existing section variants (unchanged for backward compatibility)
export const sidebarMenuSectionRootVariants = cva("w-full", {
  variants: {},
  defaultVariants: {},
});

export const sidebarMenuSectionVariants = cva("w-full", {
  variants: {},
  defaultVariants: {},
});

export const sidebarMenuSectionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-4 py-3",
    "text-sm font-medium transition-colors duration-150",
    "rounded-md",
    "hover:bg-[var(--color-navy-100,#f1f5f9)] hover:text-[var(--color-navy-600,#1e40af)]",
    "data-[state=open]:bg-[var(--color-navy-200,#e0e7ff)] data-[state=open]:text-[var(--color-navy-700,#07203c)]",
    "focus-visible:outline-none",
    "focus-visible:bg-[var(--button-unified-focus-bg,var(--color-focus-500,#ff9900))] focus-visible:text-[var(--button-unified-focus-text,var(--color-navy-500,#0e3a6c))]",
    "focus-visible:border focus-visible:border-transparent focus-visible:border-b-[3px] focus-visible:border-b-[var(--button-unified-focus-border,var(--color-navy-500,#0e3a6c))]",
    "focus-visible:rounded-b-none",
    "text-[var(--color-text-heading,#111827)] group",
    "[&[data-state=open]>svg]:rotate-180",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export const sidebarMenuSectionContentVariants = cva(
  [
    "overflow-hidden transition-all duration-200",
    "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    "bg-[var(--color-navy-100,#f1f5f9)]",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export const sidebarProfileVariants = cva(
  ["flex flex-col p-4", "bg-[var(--color-surface-subtle,#f8fafc)]"],
  {
    variants: {
      position: {
        top: "border-b border-[var(--color-border,#e5e7eb)]",
        middle: "border-b border-[var(--color-border,#e5e7eb)]",
        bottom: "border-t border-[var(--color-border,#e5e7eb)]",
      },
    },
    defaultVariants: { position: "middle" },
  }
);

export const sidebarBusinessLogoVariants = cva(
  [
    "flex items-center gap-3 p-4 border-b border-[var(--color-border,#e5e7eb)]",
    "bg-[var(--color-surface,#ffffff)]",
  ],
  {
    variants: {
      clickable: {
        true: "cursor-pointer hover:bg-[var(--color-surface-subtle,#f8fafc)] transition-colors",
        false: "",
      },
    },
    defaultVariants: { clickable: false },
  }
);

export const sidebarToggleVariants = cva(
  [
    "inline-flex items-center justify-center p-2 rounded-md",
    "text-[var(--color-text-body,#374151)]",
    "hover:bg-[var(--color-surface-subtle,#f8fafc)] hover:text-[var(--color-text-heading,#111827)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-500,#3b82f6)] focus:ring-offset-2",
    "transition-colors duration-150",
  ],
  {
    variants: {
      size: {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2.5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const sidebarBadgeVariants = cva(
  [
    "inline-flex items-center justify-center min-w-[1.25rem] h-5",
    "text-xs font-medium rounded-full",
    "bg-[var(--color-cta,#a30134)] text-[var(--color-white,#ffffff)]",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-cta,#a30134)] text-[var(--color-white,#ffffff)]",
        primary:
          "bg-[var(--color-primary-500,#3b82f6)] text-[var(--color-white,#ffffff)]",
        success:
          "bg-[var(--color-success-500,#10b981)] text-[var(--color-white,#ffffff)]",
        warning:
          "bg-[var(--color-warning-500,#f59e0b)] text-[var(--color-white,#ffffff)]",
      },
      size: {
        sm: "text-xs min-w-[1rem] h-4 px-1",
        md: "text-xs min-w-[1.25rem] h-5 px-1.5",
        lg: "text-sm min-w-[1.5rem] h-6 px-2",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

// 🎯 Utility Functions (keep existing)
export const getSidebarIconSize = (size: "sm" | "md" | "lg" = "md"): string => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };
  return sizes[size];
};

export const getSidebarItemAriaLabel = (
  label: string,
  badge?: string | number,
  active?: boolean
): string => {
  let ariaLabel = label;
  if (badge) ariaLabel += ` (${badge} items)`;
  if (active) ariaLabel += " - currently selected";
  return ariaLabel;
};

export const getSidebarSectionAriaLabel = (
  title: string,
  expanded: boolean,
  badge?: string | number
): string => {
  let ariaLabel = `${title} section, ${expanded ? "expanded" : "collapsed"}`;
  if (badge) ariaLabel += ` (${badge} items)`;
  return ariaLabel;
};

export const isSidebarItemActive = (
  itemHref: string,
  currentPath: string
): boolean => {
  return currentPath === itemHref || currentPath.startsWith(itemHref + "/");
};

export const getExpandedSectionsForPath = (
  navigationConfig: any,
  currentPath: string
): string[] => {
  const expandedSections: string[] = [];

  if (navigationConfig?.sections) {
    navigationConfig.sections.forEach((section: any) => {
      if (
        section.items?.some((item: any) =>
          isSidebarItemActive(item.href, currentPath)
        )
      ) {
        expandedSections.push(section.id);
      }
    });
  }

  return expandedSections;
};
