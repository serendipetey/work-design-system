// packages/components/src/index.ts

// 🎯 Keep existing exports (based on what actually exists)
export * from "./ui/button";
export * from "./ui/input";
export * from "./ui/select";
export * from "./ui/checkbox";
export * from "./ui/pagination";
export * from "./ui/table";
export * from "./ui/data-table";
export * from "./ui/column-sort-controls"; // Note: it's "controls" not "control"
export * from "./ui/form";

// 🎯 REMOVE these old sidebar export * statements and replace with specific exports below

// 🎯 REPLACE with these specific refactored sidebar exports:

// Centralized Sidebar Utilities
export {
  sidebarVariants,
  sidebarMenuItemVariants,
  sidebarMenuSectionRootVariants,
  sidebarMenuSectionVariants,
  sidebarMenuSectionTriggerVariants,
  sidebarMenuSectionContentVariants,
  sidebarProfileVariants,
  sidebarBusinessLogoVariants,
  sidebarToggleVariants,
  sidebarBadgeVariants,
  getSidebarIconSize,
  getSidebarItemAriaLabel,
  getSidebarSectionAriaLabel,
  isSidebarItemActive,
  getExpandedSectionsForPath,
} from "./ui/sidebar";

// Refactored Sidebar Components
export { SidebarMenu, SidebarToggle } from "./ui/sidebar-menu";
export { SidebarMenuItem } from "./ui/sidebar-menu-item";
export {
  SidebarMenuSection,
  SidebarMenuSectionRoot,
} from "./ui/sidebar-menu-section";
export { SidebarProfile, type SidebarProfileData } from "./ui/sidebar-profile";
export { SidebarBusinessLogo } from "./ui/sidebar-business-logo";

// Sidebar Navigation Utilities
export {
  useNavigationState,
  createNavigationItem,
  createNavigationSection,
  getNavigationStats,
  type NavigationConfig,
  type NavigationItem,
  type NavigationSection,
} from "./ui/sidebar-navigation-utils";

// 🎯 Keep any other existing exports that actually exist
export * from "./lib/utils";
export type { BaseComponentProps, VariantProps } from "./types";
