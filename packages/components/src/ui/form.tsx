// packages/components/src/ui/form.tsx
import { cva } from "class-variance-authority";

/**
 * 🎯 CENTRALIZED FORM UTILITIES
 *
 * Single source of truth for ALL form component styling.
 * Used by Input, Select, Checkbox, Radio, and future form components.
 *
 * Benefits:
 * ✅ No artificial dependencies between components
 * ✅ Consistent styling across all form elements
 * ✅ Better performance (CVA vs inline styles)
 * ✅ Single place to update form styling
 * ✅ Maintains all existing design tokens
 */

// 🎯 Helper Text Variants - Used by ALL form components
export const helperVariants = cva(
  "text-sm leading-[1.25] font-normal font-sans tracking-wide",
  {
    variants: {
      variant: {
        default: "text-input-helper",
        error: "text-input-text-error",
        success: "text-input-text-success",
        warning: "text-input-text-warning",
        muted: "text-text-muted mt-0 mb-3",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

// 🎯 Label Variants - Used by ALL form components
export const labelVariants = cva(
  "block text-base font-medium mb-0.5 font-sans",
  {
    variants: {
      variant: {
        default: "text-[var(--color-input-label,#1e40af)]",
        disabled: "text-[var(--color-disabled-text,#6b7280)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

// 🎯 Form Field Container Variants
export const fieldVariants = cva("w-full space-y-1", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-0.5",
      spacious: "space-y-2",
    },
  },
  defaultVariants: { variant: "default" },
});

// 🎯 Required Indicator Variants
export const requiredVariants = cva("ml-1", {
  variants: {
    variant: {
      default: "text-[var(--color-input-label-required,#a30134)]",
      subtle: "text-[var(--color-text-muted,#6b7280)]",
    },
  },
  defaultVariants: { variant: "default" },
});

// 🎯 Optional Indicator Variants
export const optionalVariants = cva("ml-1 font-normal", {
  variants: {
    variant: {
      default: "text-[var(--color-text-muted,#6b7280)]",
      subtle: "text-[var(--color-text-muted,#8f949a)]",
    },
  },
  defaultVariants: { variant: "default" },
});

/**
 * 🎯 SHARED FORM LOGIC UTILITIES
 *
 * Common logic patterns used across all form components
 */

// Extract helper text content from validation props
export const getHelperContent = (
  error?: string | boolean,
  success?: string | boolean,
  warning?: string | boolean
): string | null => {
  return (
    (typeof error === "string" ? error : null) ||
    (typeof success === "string" ? success : null) ||
    (typeof warning === "string" ? warning : null)
  );
};

// Determine helper text variant based on validation state
export const getHelperVariant = (
  error?: string | boolean,
  success?: string | boolean,
  warning?: string | boolean
): "default" | "error" | "success" | "warning" => {
  return error
    ? "error"
    : success
    ? "success"
    : warning
    ? "warning"
    : "default";
};

// Generate accessible IDs for form fields
export const getFormFieldIds = (baseId: string) => ({
  input: baseId,
  label: `${baseId}-label`,
  helper: `${baseId}-helper`,
  description: `${baseId}-description`,
});

/**
 * 🎯 FORM VALIDATION UTILITIES
 */

// Check if field has any validation state
export const hasValidationState = (
  error?: string | boolean,
  success?: string | boolean,
  warning?: string | boolean
): boolean => {
  return Boolean(error || success || warning);
};

// Get ARIA attributes for form field
export const getFormFieldAria = (
  inputId: string,
  error?: string | boolean,
  success?: string | boolean,
  warning?: string | boolean,
  hintText?: string
) => {
  const hasHelper = hasValidationState(error, success, warning);
  const helperId = hasHelper ? `${inputId}-helper` : undefined;
  const descriptionId =
    hintText && !hasHelper ? `${inputId}-description` : undefined;

  return {
    "aria-invalid": error ? ("true" as const) : undefined,
    "aria-describedby": helperId || descriptionId || undefined,
  };
};
