// packages/components/src/ui/sidebar.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// Single source of truth for ALL sidebar component styling.
// Used by SidebarMenu, SidebarMenuItem, SidebarMenuSection, etc.

import { cva } from "class-variance-authority";

/**
 * 🎯 CENTRALIZED SIDEBAR UTILITIES
 *
 * Single source of truth for ALL sidebar component styling.
 * Benefits:
 * ✅ No artificial dependencies between components
 * ✅ Consistent styling across all sidebar elements
 * ✅ Better performance (CVA vs inline styles)
 * ✅ Single place to update sidebar styling
 * ✅ Maintains all existing design tokens
 */

// 🎯 Main Sidebar Container Variants
export const sidebarVariants = cva(
  [
    "flex flex-col h-full bg-[var(--color-surface,#ffffff)]",
    "border-r border-[var(--color-border,#e5e7eb)]",
    "font-[var(--font-family-sans,'Poppins',system-ui,sans-serif)]",
  ],
  {
    variants: {
      size: {
        sm: "w-60",
        md: "w-72",
        lg: "w-80",
        xl: "w-96",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// 🎯 Sidebar Menu Item Variants
export const sidebarMenuItemVariants = cva(
  [
    "flex items-center gap-3 px-4 py-3 w-full text-left",
    "text-sm font-medium transition-colors duration-150",
    "rounded-md", // Added rounded corners for consistency
    "hover:bg-[var(--color-navy-200,#e0e7ff)] hover:text-[var(--color-navy-600,#1e40af)]",
    "focus-visible:outline-none",
    "focus-visible:bg-[var(--color-focus-500,#3b82f6)] focus-visible:text-[var(--color-navy-500,#1e40af)]",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus:ring-2 focus:ring-[var(--color-focus-500,#3b82f6)] focus:ring-offset-2",
    "aria-[current=page]:bg-[var(--color-navy-600,#1e40af)] aria-[current=page]:text-[var(--color-white,#ffffff)]",
    "aria-[current=page]:font-semibold",
  ],
  {
    variants: {
      active: {
        true: "bg-[var(--color-navy-600,#1e40af)] text-[var(--color-white,#ffffff)] font-semibold rounded-md",
        false: "text-[var(--color-text-body,#374151)]",
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

// 🎯 Sidebar Menu Section Root Variants (Accordion Root)
export const sidebarMenuSectionRootVariants = cva("w-full", {
  variants: {},
  defaultVariants: {},
});

// 🎯 Sidebar Menu Section Variants (Accordion Item)
export const sidebarMenuSectionVariants = cva("border-0 bg-transparent", {
  variants: {},
  defaultVariants: {},
});

// 🎯 Sidebar Menu Section Trigger Variants (Accordion Trigger)
export const sidebarMenuSectionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-4 py-3",
    "text-sm font-medium transition-colors duration-150",
    "rounded-md", // Added rounded corners for consistency
    "hover:bg-[var(--color-navy-100,#f1f5f9)] hover:text-[var(--color-navy-600,#1e40af)]",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--color-focus-500,#3b82f6)] focus-visible:ring-offset-2",
    "text-[var(--color-text-heading,#111827)] group",
    "[&[data-state=open]>svg]:rotate-180",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

// 🎯 Sidebar Menu Section Content Variants (Accordion Content)
export const sidebarMenuSectionContentVariants = cva(
  [
    "overflow-hidden transition-all duration-200",
    "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    "bg-[var(--color-navy-100,#f1f5f9)]", // Subtle navy background for expanded sections
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

// 🎯 Sidebar Profile Variants
export const sidebarProfileVariants = cva(
  [
    "flex flex-col p-4 border-b border-[var(--color-border,#e5e7eb)]",
    "bg-[var(--color-surface-subtle,#f8fafc)]",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

// 🎯 Sidebar Business Logo Variants
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

// 🎯 Sidebar Toggle Variants (Mobile)
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
        sm: "p-1",
        md: "p-2",
        lg: "p-3",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// 🎯 Badge Variants (for notifications)
export const sidebarBadgeVariants = cva(
  [
    "flex-shrink-0 ml-auto px-1.5 py-0.5 text-xs font-medium rounded-full",
    "bg-[var(--color-red-500,#ef4444)] text-[var(--color-white,#ffffff)]",
  ],
  {
    variants: {
      size: {
        sm: "text-xs px-1 py-0.5",
        md: "text-xs px-1.5 py-0.5",
        lg: "text-sm px-2 py-1",
      },
      variant: {
        default:
          "bg-[var(--color-red-500,#ef4444)] text-[var(--color-white,#ffffff)]",
        primary:
          "bg-[var(--color-primary-500,#1e40af)] text-[var(--color-white,#ffffff)]",
        warning:
          "bg-[var(--color-warning-500,#f59e0b)] text-[var(--color-white,#ffffff)]",
        success:
          "bg-[var(--color-success-500,#10b981)] text-[var(--color-white,#ffffff)]",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

/**
 * 🎯 SHARED SIDEBAR LOGIC UTILITIES
 */

// Icon size utility based on component size
export const getSidebarIconSize = (size: "sm" | "md" | "lg" = "md") => {
  const sizeMap = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };
  return sizeMap[size];
};

// Generate accessible label for menu items
export const getSidebarItemAriaLabel = (
  label: string,
  badge?: string | number,
  active?: boolean
) => {
  let ariaLabel = typeof label === "string" ? label : "";
  if (badge) {
    ariaLabel += `, ${badge} items pending`;
  }
  if (active) {
    ariaLabel += ", current page";
  }
  return ariaLabel;
};

// Generate accessible label for menu sections
export const getSidebarSectionAriaLabel = (
  title: string,
  expanded: boolean,
  badge?: string | number
) => {
  let label = `${title} section`;
  if (badge) {
    label += `, ${badge} items`;
  }
  label += expanded ? ", expanded" : ", collapsed";
  return label;
};

/**
 * 🎯 SIDEBAR NAVIGATION UTILITIES
 */

// Check if a menu item should be active based on current path
export const isSidebarItemActive = (
  itemHref: string,
  currentPath: string
): boolean => {
  if (!itemHref || !currentPath) return false;

  // Exact match for root paths
  if (itemHref === "/" && currentPath === "/") return true;
  if (itemHref === "/" && currentPath !== "/") return false;

  // Prefix match for sub-paths
  return currentPath.startsWith(itemHref);
};

// Find which sections should be expanded based on current active item
export const getExpandedSectionsForPath = (
  navigationConfig: any,
  currentPath: string
): string[] => {
  const expandedSections: string[] = [];

  navigationConfig.sections?.forEach((section: any) => {
    const hasActiveItem = section.items?.some((item: any) =>
      isSidebarItemActive(item.href, currentPath)
    );

    if (hasActiveItem) {
      expandedSections.push(section.id);
    }
  });

  return expandedSections;
};
