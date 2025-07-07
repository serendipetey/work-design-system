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
export declare const helperVariants: (props?: ({
    variant?: "success" | "warning" | "default" | "error" | "muted" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const labelVariants: (props?: ({
    variant?: "disabled" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const fieldVariants: (props?: ({
    variant?: "default" | "compact" | "spacious" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const requiredVariants: (props?: ({
    variant?: "default" | "subtle" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const optionalVariants: (props?: ({
    variant?: "default" | "subtle" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 🎯 SHARED FORM LOGIC UTILITIES
 *
 * Common logic patterns used across all form components
 */
export declare const getHelperContent: (error?: string | boolean, success?: string | boolean, warning?: string | boolean) => string | null;
export declare const getHelperVariant: (error?: string | boolean, success?: string | boolean, warning?: string | boolean) => "default" | "error" | "success" | "warning";
export declare const getFormFieldIds: (baseId: string) => {
    input: string;
    label: string;
    helper: string;
    description: string;
};
/**
 * 🎯 FORM VALIDATION UTILITIES
 */
export declare const hasValidationState: (error?: string | boolean, success?: string | boolean, warning?: string | boolean) => boolean;
export declare const getFormFieldAria: (inputId: string, error?: string | boolean, success?: string | boolean, warning?: string | boolean, hintText?: string) => {
    "aria-invalid": "true" | undefined;
    "aria-describedby": string | undefined;
};
