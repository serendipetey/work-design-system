// packages/components/src/index.ts
// 🎯 UPDATED: Exports for simplified smart sidebar architecture

// 🎯 Core Sidebar Architecture (Updated for smart detection)
export {
  sidebarVariants,
  createSidebarClasses, // NEW: Smart class builder
  useLayoutDetection, // NEW: Layout detection hook
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

// 🎯 Smart Sidebar Components
export { SidebarMenu, SidebarToggle } from "./ui/sidebar-menu";
export { SidebarMenuItem } from "./ui/sidebar-menu-item";
export {
  SidebarMenuSection,
  SidebarMenuSectionRoot,
} from "./ui/sidebar-menu-section";
export { SidebarProfile, type SidebarProfileData } from "./ui/sidebar-profile";
export { SidebarBusinessLogo } from "./ui/sidebar-business-logo";

// 🎯 Navigation Utilities
export {
  useNavigationState,
  createNavigationItem,
  createNavigationSection,
  getNavigationStats,
  type NavigationConfig,
  type NavigationItem,
  type NavigationSection,
} from "./ui/sidebar-navigation-utils";

// 🎯 Existing Components (unchanged)
export * from "./ui/button";
export * from "./ui/input";
export * from "./ui/select";
export * from "./ui/checkbox";
export * from "./ui/pagination";
export * from "./ui/table";
export * from "./ui/data-table";
export * from "./ui/column-sort-controls";
export * from "./ui/form";

// 🎯 Utilities
export * from "./lib/utils";
export type { BaseComponentProps, VariantProps } from "./types";
