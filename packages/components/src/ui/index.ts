// packages/components/src/ui/index.ts
// UI components entry point

// ✅ REFACTORED CORE FORM COMPONENTS (Design Tokens + Centralized Utilities)

// Button component
export { Button, buttonVariants, type ButtonProps } from "./button";

// Input component
export { Input, inputVariants, type InputProps } from "./input";

// Select components
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectField,
  selectTriggerVariants,
  type SelectFieldProps,
} from "./select";

// Checkbox/Radio components (NEWLY REFACTORED)
export {
  Checkbox,
  RadioGroup,
  RadioItem,
  CheckboxGroup,
  checkboxVariants,
  radioVariants,
  type CheckboxProps,
  type RadioGroupProps,
  type RadioItemProps,
  type CheckboxGroupProps,
} from "./checkbox";

// ✅ CENTRALIZED FORM UTILITIES (Single source of truth for all form components)
export {
  helperVariants,
  labelVariants,
  fieldVariants,
  requiredVariants,
  optionalVariants,
  getHelperContent,
  getHelperVariant,
  getFormFieldIds,
  hasValidationState,
  getFormFieldAria,
} from "./form";

// ✅ DATA COMPONENTS (Table, Pagination, etc.)
export * from "./table";
export * from "./pagination";
export * from "./data-table";
export * from "./column-sort-controls";

// ✅ NAVIGATION COMPONENTS (Sidebar, etc.)
export * from "./sidebar-menu";
export * from "./sidebar-profile";
export * from "./sidebar-menu-item";
export * from "./sidebar-menu-section";
export * from "./sidebar-business-logo";
export * from "./sidebar-navigation-utils";

// ✅ UTILITY FUNCTIONS
export * from "../lib/utils";

// ✅ COMMON TYPES (if available)
// export type { BaseComponentProps, VariantProps } from "./types";
