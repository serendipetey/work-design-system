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
