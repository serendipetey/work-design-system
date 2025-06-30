// Main entry point for the component library
// File: packages/components/src/index.ts

// Existing exports
export * from "./ui/button";
export * from "./ui/input";
export * from "./ui/select"; // Add this line
export * from "./lib/utils";
export type { BaseComponentProps, VariantProps } from "./types";

// Export utility functions from src/lib/utils.ts
export * from "./lib/utils";

// Export types
export type { BaseComponentProps, VariantProps } from "./types";
