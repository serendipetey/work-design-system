// Component library types

import { type VariantProps } from "class-variance-authority";

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Re-export VariantProps for components that use CVA
export type { VariantProps };
