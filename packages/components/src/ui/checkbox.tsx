// packages/components/src/ui/checkbox.tsx
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputVariants, labelVariants, helperVariants } from "./input"; // INHERIT FROM INPUT!

// Checkbox/Radio uses INPUT focus states (DRY!)
const checkboxVariants = cva(
  [
    // Base checkbox/radio styles
    "peer h-4 w-4 shrink-0 rounded border transition-all duration-200 cursor-pointer",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // INHERIT INPUT FOCUS STYLES - unified focus system
    "focus-visible:outline-none",
    "focus-visible:ring-0",
    "focus-visible:shadow-[0_0_0_3px_rgba(255,153,0,0.8)]", // Same as input focus
    "focus:shadow-[0_0_0_3px_rgba(255,153,0,0.8)]",
    // Checked states
    "data-[state=checked]:bg-[var(--color-primary)]",
    "data-[state=checked]:text-[var(--color-button-primary-text)]",
    "data-[state=checked]:border-[var(--color-primary)]",
    // Indeterminate state (for checkbox only)
    "data-[state=indeterminate]:bg-[var(--color-primary)]",
    "data-[state=indeterminate]:text-[var(--color-button-primary-text)]",
    "data-[state=indeterminate]:border-[var(--color-primary)]",
  ],
  {
    variants: {
      variant: {
        default: ["border-[var(--color-border)]", "bg-[var(--color-surface)]"],
        error: [
          "border-[var(--color-border-error)]",
          "bg-[var(--color-surface)]",
          // Override with error focus shadow
          "focus-visible:shadow-[0_0_0_3px_rgba(235,0,0,0.6)]",
          "focus:shadow-[0_0_0_3px_rgba(235,0,0,0.6)]",
        ],
        success: [
          "border-[var(--color-border-success)]",
          "bg-[var(--color-surface)]",
          // Override with success focus shadow
          "focus-visible:shadow-[0_0_0_3px_rgba(0,125,133,0.6)]",
          "focus:shadow-[0_0_0_3px_rgba(0,125,133,0.6)]",
        ],
        warning: [
          "border-[var(--color-border-warning)]",
          "bg-[var(--color-surface)]",
          // Override with warning focus shadow
          "focus-visible:shadow-[0_0_0_3px_rgba(183,91,0,0.8)]",
          "focus:shadow-[0_0_0_3px_rgba(183,91,0,0.8)]",
        ],
      },
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Radio variant - inherits from checkbox but with rounded corners
const radioVariants = cva(
  [
    // Base radio styles - same as checkbox but rounded
    "peer shrink-0 rounded-full border transition-all duration-200 cursor-pointer",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // INHERIT INPUT FOCUS STYLES - unified focus system
    "focus-visible:outline-none",
    "focus-visible:ring-0",
    "focus-visible:shadow-[0_0_0_3px_rgba(255,153,0,0.8)]",
    "focus:shadow-[0_0_0_3px_rgba(255,153,0,0.8)]",
    // Checked states with dot instead of checkmark
    "data-[state=checked]:bg-[var(--color-primary)]",
    "data-[state=checked]:border-[var(--color-primary)]",
  ],
  {
    variants: {
      variant: {
        default: ["border-[var(--color-border)]", "bg-[var(--color-surface)]"],
        error: [
          "border-[var(--color-border-error)]",
          "bg-[var(--color-surface)]",
          "focus-visible:shadow-[0_0_0_3px_rgba(235,0,0,0.6)]",
          "focus:shadow-[0_0_0_3px_rgba(235,0,0,0.6)]",
        ],
        success: [
          "border-[var(--color-border-success)]",
          "bg-[var(--color-surface)]",
          "focus-visible:shadow-[0_0_0_3px_rgba(0,125,133,0.6)]",
          "focus:shadow-[0_0_0_3px_rgba(0,125,133,0.6)]",
        ],
        warning: [
          "border-[var(--color-border-warning)]",
          "bg-[var(--color-surface)]",
          "focus-visible:shadow-[0_0_0_3px_rgba(183,91,0,0.8)]",
          "focus:shadow-[0_0_0_3px_rgba(183,91,0,0.8)]",
        ],
      },
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// TypeScript Interfaces
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  labelState?: "default" | "required" | "optional";
  showLabel?: boolean;

  // Hint text system (like Input component)
  hintText?: string;
  showHintText?: boolean;

  helperText?: string;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
  labelState?: "default" | "required" | "optional";
  showLabel?: boolean;

  // Hint text system (like Input component)
  hintText?: string;
  showHintText?: boolean;

  helperText?: string;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
}

export interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  label?: string;
  itemClassName?: string;
  labelClassName?: string;
}

// Checkbox Component
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      helperClassName,
      variant,
      size,
      label,
      labelState = "default",
      showLabel = true,
      hintText,
      showHintText = true,
      helperText,
      error,
      success,
      warning,
      disabled,
      ...props
    },
    ref
  ) => {
    // Determine current variant based on state (same logic as Input)
    const currentVariant = React.useMemo(() => {
      if (error) return "error";
      if (success) return "success";
      if (warning) return "warning";
      return variant || "default";
    }, [error, success, warning, variant]);

    // Determine helper text content and variant (same logic as Input)
    const helperContent = React.useMemo(() => {
      if (error && typeof error === "string") return error;
      if (success && typeof success === "string") return success;
      if (warning && typeof warning === "string") return warning;
      return helperText;
    }, [error, success, warning, helperText]);

    const helperVariant = React.useMemo(() => {
      if (error) return "error";
      if (success) return "success";
      if (warning) return "warning";
      return "default";
    }, [error, success, warning]);

    return (
      <div className={cn("space-y-1", containerClassName)}>
        <div className="flex items-center space-x-2">
          <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
              checkboxVariants({ variant: currentVariant, size }),
              className
            )}
            disabled={disabled}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              {props.checked === "indeterminate" ? (
                <Minus className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label && showLabel && (
            <label
              htmlFor={props.id}
              className={cn(
                // Individual checkbox labels use small paragraph text (charcoal)
                "text-sm font-normal leading-normal text-[var(--color-text-body)] cursor-pointer",
                disabled && "cursor-not-allowed opacity-50",
                labelClassName
              )}
            >
              {label}
            </label>
          )}
        </div>

        {helperContent && (
          <p
            className={cn(
              helperVariants({ variant: helperVariant }),
              helperClassName
            )}
          >
            {helperContent}
          </p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Radio Group Component
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      helperClassName,
      label,
      labelState = "default",
      showLabel = true,
      hintText,
      showHintText = true,
      helperText,
      error,
      success,
      warning,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Same state logic as Input/Checkbox
    const helperContent = React.useMemo(() => {
      if (error && typeof error === "string") return error;
      if (success && typeof success === "string") return success;
      if (warning && typeof warning === "string") return warning;
      return helperText;
    }, [error, success, warning, helperText]);

    const helperVariant = React.useMemo(() => {
      if (error) return "error";
      if (success) return "success";
      if (warning) return "warning";
      return "default";
    }, [error, success, warning]);

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {/* Form Label with proper styling */}
        {label && showLabel && (
          <div
            className={cn(
              labelVariants({
                state: disabled ? "disabled" : labelState,
              }),
              labelClassName
            )}
          >
            {label}
            {labelState === "required" && (
              <span className="text-[var(--color-input-label-required)] ml-1">
                (Required)
              </span>
            )}
            {labelState === "optional" && (
              <span className="text-[var(--color-input-label-optional)] ml-1">
                (optional)
              </span>
            )}
          </div>
        )}

        {/* Hint text (like Input component) */}
        {hintText && showHintText && (
          <p className="text-sm text-[var(--color-input-helper)]">{hintText}</p>
        )}

        <RadioGroupPrimitive.Root
          className={cn("grid gap-2", className)}
          disabled={disabled}
          ref={ref}
          {...props}
        >
          {children}
        </RadioGroupPrimitive.Root>

        {helperContent && (
          <p
            className={cn(
              helperVariants({ variant: helperVariant }),
              helperClassName
            )}
          >
            {helperContent}
          </p>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// Radio Item Component
const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(
  (
    {
      className,
      itemClassName,
      labelClassName,
      variant,
      size,
      label,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex items-center space-x-2", itemClassName)}>
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(radioVariants({ variant, size }), className)}
          value={value}
          disabled={disabled}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              // Individual radio labels use small paragraph text (charcoal)
              "text-sm font-normal leading-normal text-[var(--color-text-body)] cursor-pointer",
              disabled && "cursor-not-allowed opacity-50",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
RadioItem.displayName = RadioGroupPrimitive.Item.displayName;

// CheckboxGroup Component (for grouped checkboxes like in the screenshot)
interface CheckboxGroupProps {
  label?: string;
  labelState?: "default" | "required" | "optional";
  showLabel?: boolean;
  hintText?: string;
  showHintText?: boolean;
  helperText?: string;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  children: React.ReactNode;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      containerClassName,
      labelClassName,
      helperClassName,
      label,
      labelState = "default",
      showLabel = true,
      hintText,
      showHintText = true,
      helperText,
      error,
      success,
      warning,
      children,
      ...props
    },
    ref
  ) => {
    // Same state logic as other components
    const helperContent = React.useMemo(() => {
      if (error && typeof error === "string") return error;
      if (success && typeof success === "string") return success;
      if (warning && typeof warning === "string") return warning;
      return helperText;
    }, [error, success, warning, helperText]);

    const helperVariant = React.useMemo(() => {
      if (error) return "error";
      if (success) return "success";
      if (warning) return "warning";
      return "default";
    }, [error, success, warning]);

    return (
      <div ref={ref} className={cn("space-y-2", containerClassName)} {...props}>
        {/* Form Label with proper styling */}
        {label && showLabel && (
          <div
            className={cn(labelVariants({ state: labelState }), labelClassName)}
          >
            {label}
            {labelState === "required" && (
              <span className="text-[var(--color-input-label-required)] ml-1">
                (Required)
              </span>
            )}
            {labelState === "optional" && (
              <span className="text-[var(--color-input-label-optional)] ml-1">
                (optional)
              </span>
            )}
          </div>
        )}

        {/* Hint text (like Input component) */}
        {hintText && showHintText && (
          <p className="text-sm text-[var(--color-input-helper)]">{hintText}</p>
        )}

        {/* Checkbox list */}
        <div className="space-y-1">{children}</div>

        {helperContent && (
          <p
            className={cn(
              helperVariants({ variant: helperVariant }),
              helperClassName
            )}
          >
            {helperContent}
          </p>
        )}
      </div>
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

// Exports
export {
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  RadioItem,
  checkboxVariants,
  radioVariants,
};
