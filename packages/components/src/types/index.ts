// packages/components/src/types/index.ts
// Component library types

import { type VariantProps } from "class-variance-authority";

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Re-export VariantProps for components that use CVA
export type { VariantProps };

// Export checkbox/radio types for external use
export type {
  CheckboxProps,
  RadioGroupProps,
  RadioItemProps,
} from "../ui/checkbox";

// Export table types for external use
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from "../ui/table";

// Export sidebar types for external use
export type { SidebarMenuProps, SidebarToggleProps } from "../ui/sidebar-menu";
export type {
  SidebarProfileProps,
  SidebarProfileData,
} from "../ui/sidebar-profile";
export type { SidebarMenuItemProps } from "../ui/sidebar-menu-item";
export type {
  SidebarMenuSectionProps,
  SidebarMenuSectionRootProps,
} from "../ui/sidebar-menu-section";
export type {
  NavigationItem,
  NavigationSection,
  NavigationConfig,
} from "../ui/sidebar-navigation-utils";
