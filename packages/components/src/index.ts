// Main entry point for the component library
// File: packages/components/src/index.ts

// Export all components
export * from "./ui/button";
export * from "./ui/input";
export * from "./ui/select";

// Export utility functions from src/lib/utils.ts
export * from "./lib/utils";

// Export types
export type { BaseComponentProps, VariantProps } from "./types";

// packages/components/src/index.ts
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";
