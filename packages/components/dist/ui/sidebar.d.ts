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
export declare const sidebarVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    variant?: "standalone" | "layout" | null | undefined;
    _internal_layout_detected?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare function createSidebarClasses({ size, variant, className, isInContainer, }: {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "standalone" | "layout";
    className?: string;
    isInContainer?: boolean;
}): string;
export declare function useLayoutDetection(ref: {
    current: HTMLElement | null;
}): boolean;
export declare const sidebarMenuItemVariants: (props?: ({
    active?: boolean | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionRootVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionTriggerVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarMenuSectionContentVariants: (props?: ({} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarProfileVariants: (props?: ({
    position?: "top" | "middle" | "bottom" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarBusinessLogoVariants: (props?: ({
    clickable?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarToggleVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const sidebarBadgeVariants: (props?: ({
    variant?: "default" | "primary" | "success" | "warning" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const getSidebarIconSize: (size?: "sm" | "md" | "lg") => string;
export declare const getSidebarItemAriaLabel: (label: string, badge?: string | number, active?: boolean) => string;
export declare const getSidebarSectionAriaLabel: (title: string, expanded: boolean, badge?: string | number) => string;
export declare const isSidebarItemActive: (itemHref: string, currentPath: string) => boolean;
export declare const getExpandedSectionsForPath: (navigationConfig: any, currentPath: string) => string[];
