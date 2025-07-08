/**
 * 🎯 ENHANCED SIDEBAR DESIGN SYSTEM
 *
 * Supports multiple usage patterns:
 * 1. Complete standalone sidebar (for consuming apps)
 * 2. Layout components (for Storybook/custom layouts)
 * 3. Flexible styling variants (bordered/borderless)
 *
 * ✅ Solves rounded corner + border conflicts
 * ✅ Provides consistent styling across all usage patterns
 * ✅ Maintains backward compatibility
 * ✅ Enables both manual assembly and component-based approaches
 */
export declare const sidebarVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    variant?: "layout" | "standalone" | "borderless" | null | undefined;
    container?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarContainerVariants: (props?: ({
    styled?: boolean | null | undefined;
    position?: "standalone" | "embedded" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuItemVariants: (props?: ({
    active?: boolean | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionRootVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionTriggerVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionContentVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarProfileVariants: (props?: ({
    position?: "bottom" | "top" | "middle" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarBusinessLogoVariants: (props?: ({
    clickable?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarToggleVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarBadgeVariants: (props?: ({
    variant?: "primary" | "success" | "warning" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const getSidebarIconSize: (size?: "sm" | "md" | "lg") => string;
export declare const getSidebarItemAriaLabel: (label: string, badge?: string | number, active?: boolean) => string;
export declare const getSidebarSectionAriaLabel: (title: string, expanded: boolean, badge?: string | number) => string;
export declare const isSidebarItemActive: (itemHref: string, currentPath: string) => boolean;
export declare const getExpandedSectionsForPath: (navigationConfig: any, currentPath: string) => string[];
