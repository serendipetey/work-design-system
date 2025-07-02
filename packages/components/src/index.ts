// packages/components/src/index.ts
// Main entry point for the component library

// Export all components
export * from "./ui/button";
export * from "./ui/input";
export * from "./ui/select";
export * from "./ui/table";
export * from "./ui/pagination";
export * from "./ui/data-table";
export * from "./ui/column-sort-controls";

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
