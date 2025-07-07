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
export declare const sidebarVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuItemVariants: (props?: ({
    active?: boolean | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionRootVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionTriggerVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionContentVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarProfileVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarBusinessLogoVariants: (props?: ({
    clickable?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarToggleVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarBadgeVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    variant?: "default" | "primary" | "warning" | "success" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 🎯 SHARED SIDEBAR LOGIC UTILITIES
 */
export declare const getSidebarIconSize: (size?: "sm" | "md" | "lg") => string;
export declare const getSidebarItemAriaLabel: (label: string, badge?: string | number, active?: boolean) => string;
export declare const getSidebarSectionAriaLabel: (title: string, expanded: boolean, badge?: string | number) => string;
/**
 * 🎯 SIDEBAR NAVIGATION UTILITIES
 */
export declare const isSidebarItemActive: (itemHref: string, currentPath: string) => boolean;
export declare const getExpandedSectionsForPath: (navigationConfig: any, currentPath: string) => string[];
