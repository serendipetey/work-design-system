// packages/components/src/ui/checkbox.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses CSS custom properties from the design token system
// with reliable fallback values for maximum compatibility and maintainability.
// Pattern: var(--design-token-name, fallback-value)

"use client";

import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// 🎯 IMPORT CENTRALIZED FORM UTILITIES (Fixed from "./input")
import {
  helperVariants,
  labelVariants,
  getHelperContent,
  getHelperVariant,
  getFormFieldAria,
} from "./form";

// 🎯 DESIGN TOKEN STYLE OBJECTS WITH FALLBACKS

const checkboxStyles = {
  base: {
    // Layout & Structure
    display: "inline-flex" as const,
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    borderWidth: "1px",
    borderStyle: "solid",
    cursor: "pointer",
    flexShrink: 0,

    // Typography & Spacing (for inner icons)
    fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",

    // Borders & Colors
    borderRadius: "var(--border-radius-sm, 4px)",
    backgroundColor: "var(--color-surface, #ffffff)",
    borderColor: "var(--color-border, #b3b9bf)",
    color: "var(--color-text, #374151)",

    // Transitions
    transition: "var(--transition-base, all 200ms ease-in-out)",
  },
  variants: {
    default: {
      borderColor: "var(--color-border, #b3b9bf)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    error: {
      borderColor: "var(--color-border-error, #eb0000)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    success: {
      borderColor: "var(--color-border-success, #007d85)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    warning: {
      borderColor: "var(--color-border-warning, #b75b00)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
  },
  sizes: {
    sm: { width: "12px", height: "12px" },
    md: { width: "16px", height: "16px" },
    lg: { width: "20px", height: "20px" },
    xl: { width: "24px", height: "24px" },
  },
  states: {
    checked: {
      backgroundColor: "var(--color-navy-500, #1e3a8a)",
      borderColor: "var(--color-navy-500, #1e3a8a)",
      color: "var(--color-white, #ffffff)",
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
};

const radioStyles = {
  base: {
    // Layout & Structure
    display: "inline-flex" as const,
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    borderWidth: "1px",
    borderStyle: "solid",
    cursor: "pointer",
    flexShrink: 0,

    // Radio specific
    borderRadius: "50%",

    // Borders & Colors
    backgroundColor: "var(--color-surface, #ffffff)",
    borderColor: "var(--color-border, #d1d5db)",

    // Transitions
    transition: "var(--transition-base, all 200ms ease-in-out)",
  },
  variants: {
    default: {
      borderColor: "var(--color-border, #9ca3af)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    error: {
      borderColor: "var(--color-border-error, #eb0000)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    success: {
      borderColor: "var(--color-border-success, #007d85)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    warning: {
      borderColor: "var(--color-border-warning, #b75b00)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
  },
  sizes: {
    sm: { width: "12px", height: "12px" },
    md: { width: "16px", height: "16px" },
    lg: { width: "20px", height: "20px" },
    xl: { width: "24px", height: "24px" },
  },
  states: {
    checked: {
      backgroundColor: "var(--color-navy-500, #1e3a8a)",
      borderColor: "var(--color-navy-500, #1e3a8a)",
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
};

// 🎯 DYNAMIC CSS INJECTION FOR FOCUS STATES
const injectFocusStyles = (
  variant: string,
  componentType: "checkbox" | "radio"
) => {
  const styleId = `${componentType}-focus-${variant}`;

  // Remove existing styles
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) existingStyle.remove();

  // Create new focus styles
  const style = document.createElement("style");
  style.id = styleId;

  // 🎯 ALWAYS USE ORANGE FOCUS - regardless of variant for accessibility
  const focusStyles = `
    .${componentType}-${variant}:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.8);
    }
    .${componentType}-${variant}:focus {
      box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.8);
    }
  `;

  style.textContent = focusStyles;
  document.head.appendChild(style);
};

// 🎯 CVA CONFIGURATIONS (Minimal - styles come from design tokens)

const checkboxVariants = cva(
  // Base Tailwind classes for layout/structure only
  "peer shrink-0 border transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "",
        error: "",
        success: "",
        warning: "",
        // Keep empty - styles come from design tokens
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        // Keep empty - styles come from design tokens
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const radioVariants = cva(
  // Base Tailwind classes for layout/structure only
  "peer shrink-0 rounded-full border transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "",
        error: "",
        success: "",
        warning: "",
        // Keep empty - styles come from design tokens
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        // Keep empty - styles come from design tokens
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// 🎯 TYPESCRIPT INTERFACES

export interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      "checked"
    >,
    VariantProps<typeof checkboxVariants> {
  // Design system props
  variant?: "default" | "error" | "success" | "warning";
  size?: "sm" | "md" | "lg" | "xl";

  // Label Props
  label?: string;
  labelState?: "required" | "optional";
  showLabel?: boolean;
  hintText?: string;

  // Content & Validation

  error?: string;
  success?: string;
  warning?: string;

  // Styling Overrides
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;

  // Checkbox specific
  checked?: boolean | "indeterminate";
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  // Label Props
  label?: string;
  labelState?: "required" | "optional";
  showLabel?: boolean;

  // Content & Validation
  hintText?: string;
  error?: string;
  success?: string;
  warning?: string;

  // Styling Overrides
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
}

export interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  // Design system props
  variant?: "default" | "error" | "success" | "warning";
  size?: "sm" | "md" | "lg" | "xl";

  // Label Props
  label?: string;
  itemClassName?: string;
  labelClassName?: string;
}

export interface CheckboxGroupProps {
  label?: string;
  labelState?: "required" | "optional";
  showLabel?: boolean;
  hintText?: string;
  error?: string;
  success?: string;
  warning?: string;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  children: React.ReactNode;
}

// 🎯 MAIN COMPONENT IMPLEMENTATIONS

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      labelState,
      showLabel = true,
      hintText,
      error,
      success,
      warning,
      containerClassName,
      labelClassName,
      helperClassName,
      checked,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const elementRef =
      React.useRef<React.ElementRef<typeof CheckboxPrimitive.Root>>(null);
    const checkboxId = React.useId();

    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current!);

    // Inject focus styles on mount
    React.useEffect(() => {
      if (elementRef.current && variant) {
        injectFocusStyles(variant, "checkbox");
        elementRef.current.classList.add(`checkbox-${variant}`);
      }
    }, [variant]);

    // 🎯 Determine final variant based on validation state
    const finalVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : variant;

    // 🎯 Use centralized form utilities
    const helperContent = getHelperContent(error, success, warning);
    const helperVariant = getHelperVariant(error, success, warning);
    const formFieldAria = getFormFieldAria(
      checkboxId,
      error,
      success,
      warning,
      hintText
    );

    // 🎯 Combine styles: Base + Variant + Size + State + Custom
    const combinedStyles = {
      ...checkboxStyles.base,
      ...(finalVariant && checkboxStyles.variants[finalVariant]
        ? checkboxStyles.variants[finalVariant]
        : {}),
      ...(size && checkboxStyles.sizes[size] ? checkboxStyles.sizes[size] : {}),
      ...(checked ? checkboxStyles.states.checked : {}),
      ...(disabled ? checkboxStyles.states.disabled : {}),
      ...style, // Allow style overrides
    };

    // Build final className
    const finalClassName = cn(
      checkboxVariants({ variant: finalVariant, size }),
      className
    );

    return (
      <div className={cn("flex flex-col gap-0.5", containerClassName)}>
        <div className="flex items-start space-x-2">
          <CheckboxPrimitive.Root
            ref={elementRef}
            id={checkboxId}
            className={finalClassName}
            style={combinedStyles}
            checked={checked}
            disabled={disabled}
            {...formFieldAria}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              {checked === "indeterminate" ? (
                <Minus className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label && showLabel && (
            <label
              htmlFor={checkboxId}
              className={cn(
                // Individual checkbox labels use small paragraph text (charcoal)
                "text-sm font-normal leading-normal cursor-pointer",
                {
                  color: "var(--color-text-body, #39444f)",
                },
                disabled && "cursor-not-allowed opacity-50",
                labelClassName
              )}
              style={{
                color: "var(--color-text-body, #39444f)",
              }}
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
      error,
      success,
      warning,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // 🎯 Use centralized form utilities
    const helperContent = getHelperContent(error, success, warning);
    const helperVariant = getHelperVariant(error, success, warning);

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && showLabel && (
          <div
            className={cn(
              labelVariants({
                variant: disabled ? "disabled" : "default",
              }),
              labelClassName
            )}
          >
            {label}
            {labelState === "required" && (
              <span
                className="ml-1"
                style={{ color: "var(--color-input-label-required, #a30134)" }}
              >
                *
              </span>
            )}
            {labelState === "optional" && (
              <span
                className="ml-1"
                style={{ color: "var(--color-input-label-optional, #6b7280)" }}
              >
                (Optional)
              </span>
            )}
          </div>
        )}

        {/* Hint text (like Input component) */}
        {hintText && (
          <p
            className={cn(helperVariants({ variant: "muted" }), "mt-0 mb-0.5")}
          >
            {hintText}
          </p>
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
      variant = "default",
      size = "md",
      label,
      value,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const elementRef =
      React.useRef<React.ElementRef<typeof RadioGroupPrimitive.Item>>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current!);

    // Inject focus styles on mount
    React.useEffect(() => {
      if (elementRef.current && variant) {
        injectFocusStyles(variant, "radio");
        elementRef.current.classList.add(`radio-${variant}`);
      }
    }, [variant]);

    // 🎯 Combine styles: Base + Variant + Size + State + Custom
    const combinedStyles = {
      ...radioStyles.base,
      ...(variant && radioStyles.variants[variant]
        ? radioStyles.variants[variant]
        : {}),
      ...(size && radioStyles.sizes[size] ? radioStyles.sizes[size] : {}),
      ...(disabled ? radioStyles.states.disabled : {}),
      ...style, // Allow style overrides
    };

    // Build final className
    const finalClassName = cn(radioVariants({ variant, size }), className);

    return (
      <div className={cn("flex items-center space-x-2", itemClassName)}>
        <RadioGroupPrimitive.Item
          ref={elementRef}
          className={finalClassName}
          style={combinedStyles}
          value={value}
          disabled={disabled}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div
              className="rounded-full bg-current"
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "var(--color-navy-500, #1e3a8a)",
              }}
            />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              // Individual radio labels use small paragraph text (charcoal)
              "text-sm font-normal leading-normal cursor-pointer",
              disabled && "cursor-not-allowed opacity-50",
              labelClassName
            )}
            style={{
              color: "var(--color-text-body, #39444f)",
            }}
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
      error,
      success,
      warning,
      children,
      ...props
    },
    ref
  ) => {
    // 🎯 Use centralized form utilities
    const helperContent = getHelperContent(error, success, warning);
    const helperVariant = getHelperVariant(error, success, warning);

    return (
      <div ref={ref} className={cn("space-y-2", containerClassName)} {...props}>
        {label && showLabel && (
          <div
            className={cn(
              labelVariants({ variant: "default" }),
              labelClassName
            )}
          >
            {label}
            {labelState === "required" && (
              <span
                className="ml-1"
                style={{ color: "var(--color-input-label-required, #a30134)" }}
              >
                *
              </span>
            )}
            {labelState === "optional" && (
              <span
                className="ml-1"
                style={{ color: "var(--color-input-label-optional, #6b7280)" }}
              >
                (Optional)
              </span>
            )}
          </div>
        )}

        {/* Hint text (like Input component) */}
        {hintText && (
          <p
            className={cn(helperVariants({ variant: "muted" }), "mt-0 mb-0.5")}
          >
            {hintText}
          </p>
        )}

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

export {
  Checkbox,
  RadioGroup,
  RadioItem,
  CheckboxGroup,
  checkboxVariants,
  radioVariants,
};
