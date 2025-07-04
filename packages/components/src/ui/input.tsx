// packages/components/src/ui/input.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses CSS custom properties from the design token system
// with reliable fallback values for maximum compatibility and maintainability.
// Pattern: var(--design-token-name, fallback-value)

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Spinner component for loading state
const Spinner = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="animate-spin"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      className="opacity-25"
    />
    <path
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      className="opacity-75"
    />
  </svg>
);

// 🎯 OPTIMAL: Design Tokens with Robust Fallbacks
const inputStyles = {
  // Base styles using design tokens with reliable fallbacks
  base: {
    // Layout & Structure
    display: "flex" as const,
    width: "100%",
    border: "1px solid var(--color-border, #d1d5db)",
    borderRadius: "var(--input-border-radius, 6px)",
    backgroundColor: "var(--input-bg, #ffffff)",

    // Typography - tokens first, robust fallbacks
    fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
    fontSize: "var(--font-size-base, 16px)",
    lineHeight: "var(--line-height-normal, 1.5)",
    color: "var(--color-input-text, #374151)",

    // Transitions
    transition: "var(--input-transition, all 200ms ease-in-out)",

    // States
    outline: "none",
  },

  // Variant styles - tokens with fallbacks
  variants: {
    default: {
      borderColor: "var(--color-border, #d1d5db)",
    },
    error: {
      borderColor: "var(--color-border-error, #dc2626)",
    },
    success: {
      borderColor: "var(--color-border-success, #059669)",
    },
    warning: {
      borderColor: "var(--color-border-warning, #d97706)",
    },
  },

  // Size styles - tokens with fallbacks
  sizes: {
    sm: {
      height: "var(--input-height-sm, 32px)",
      paddingLeft: "var(--input-padding-x-sm, 8px)",
      paddingRight: "var(--input-padding-x-sm, 8px)",
      fontSize: "var(--font-size-sm, 14px)",
    },
    md: {
      height: "var(--input-height-md, 48px)",
      paddingLeft: "var(--input-padding-x-md, 16px)",
      paddingRight: "var(--input-padding-x-md, 16px)",
      fontSize: "var(--font-size-base, 16px)",
    },
    lg: {
      height: "var(--input-height-lg, 56px)",
      paddingLeft: "var(--input-padding-x-lg, 20px)",
      paddingRight: "var(--input-padding-x-lg, 20px)",
      fontSize: "var(--font-size-lg, 18px)",
    },
    xl: {
      height: "var(--input-height-xl, 64px)",
      paddingLeft: "var(--input-padding-x-xl, 24px)",
      paddingRight: "var(--input-padding-x-xl, 24px)",
      fontSize: "var(--font-size-xl, 20px)",
    },
  },

  // State styles - tokens with fallbacks
  states: {
    disabled: {
      cursor: "not-allowed" as const,
      opacity: "var(--opacity-disabled, 0.5)",
      backgroundColor: "var(--color-disabled, #f3f4f6)",
    },
    loading: {
      paddingRight: "2.5rem", // Make room for spinner
    },
  },
};

// Label styles - tokens with fallbacks
const labelStyles = {
  base: {
    display: "block" as const,
    fontSize: "var(--font-size-base, 16px)",
    fontWeight: "var(--font-weight-semibold, 600)",
    marginBottom: "2px", // AGGRESSIVE: Reduced from 8px to 2px
    color: "var(--color-input-label, #1e40af)",
    fontFamily: "var(--font-family-sans, 'Poppins', sans-serif)",
  },
  states: {
    disabled: {
      color: "var(--color-disabled-text, #6b7280)",
    },
  },
};

// Helper text styles - MUCH tighter spacing
const helperStyles = {
  base: {
    fontSize: "var(--font-size-base, 16px)", // Accessibility: 16px
    lineHeight: "var(--line-height-loose, 1.75)",
    fontWeight: "var(--font-weight-regular, 400)",
    fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
    marginTop: "1px", // AGGRESSIVE: Almost no space above helper text
    letterSpacing: "var(--letter-spacing-wide, 0.0225em)",
  },
  variants: {
    default: {
      color: "var(--color-input-helper, #39444f)",
    },
    error: {
      color: "var(--color-input-text-error, #eb0000)",
    },
    success: {
      color: "var(--color-input-text-success, #007d85)",
    },
    warning: {
      color: "var(--color-input-text-warning, #b75b00)",
    },
    muted: {
      color: "var(--color-text-muted, #8f949a)",
    },
  },
};

// 🎯 CVA for className-based utilities (minimal usage)
const inputVariants = cva(
  // Base classes for layout/structure only - REMOVED problematic selectors
  "flex w-full transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400",
  {
    variants: {
      variant: {
        default: "",
        error: "",
        success: "",
        warning: "",
        // Keep empty - styles come from CSS custom properties
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        // Keep empty - styles come from CSS custom properties
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// 🎯 OPTIMAL: Design Tokens with Fallbacks for Focus Styles
const injectFocusStyles = (variant: string) => {
  const focusStyleId = `input-focus-${variant}`;

  // Remove existing focus styles
  const existingStyle = document.getElementById(focusStyleId);
  if (existingStyle) existingStyle.remove();

  // Create new focus styles with tokens and fallbacks
  const style = document.createElement("style");
  style.id = focusStyleId;

  const focusStyles: Record<string, string> = {
    default: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-focus-500, #ff9900);
        outline-offset: 2px;
        border-color: var(--color-border-focus, #3b82f6);
      }
    `,
    error: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-error-500, #dc2626);
        outline-offset: 2px;
        border-color: var(--color-border-error, #dc2626);
      }
    `,
    success: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-success-500, #059669);
        outline-offset: 2px;
        border-color: var(--color-border-success, #059669);
      }
    `,
    warning: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-warning-500, #d97706);
        outline-offset: 2px;
        border-color: var(--color-border-warning, #d97706);
      }
    `,
  };

  style.textContent = focusStyles[variant] || focusStyles.default;
  document.head.appendChild(style);
};

// CVA exports for compatibility
export const labelVariants = cva("text-sm font-medium text-gray-900", {
  variants: {
    state: {
      default: "",
      disabled: "text-gray-500",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export const helperVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-gray-600",
      error: "text-red-600",
      success: "text-green-600",
      warning: "text-orange-600",
      muted: "text-gray-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// TypeScript Interfaces
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  labelState?: "default" | "required" | "optional";
  showLabel?: boolean;
  hintText?: string;
  showHintText?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftText?: string;
  rightText?: string;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  loading?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;
  clearable?: boolean;
  onClear?: () => void;
}

// 🎯 FIXED: Main Component with Proper Error Handling
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      labelState = "default",
      showLabel = true,
      hintText,
      showHintText = true,
      helperText,
      leftIcon,
      rightIcon,
      leftText,
      rightText,
      error,
      success,
      warning,
      loading = false,
      containerClassName,
      labelClassName,
      inputClassName,
      helperClassName,
      clearable = false,
      onClear,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const elementRef = React.useRef<HTMLInputElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current!);

    // Determine final variant based on states
    const finalVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : variant;

    // Inject focus styles on mount
    React.useEffect(() => {
      if (elementRef.current && finalVariant) {
        injectFocusStyles(finalVariant);
        elementRef.current.classList.add(`input-${finalVariant}`);
      }
    }, [finalVariant]);

    // 🎯 FIXED: Combine styles with proper null checking
    const combinedStyles = {
      ...inputStyles.base,
      ...(finalVariant &&
      inputStyles.variants[finalVariant as keyof typeof inputStyles.variants]
        ? inputStyles.variants[
            finalVariant as keyof typeof inputStyles.variants
          ]
        : {}),
      ...(size && inputStyles.sizes[size as keyof typeof inputStyles.sizes]
        ? inputStyles.sizes[size as keyof typeof inputStyles.sizes]
        : {}),
      ...(disabled ? inputStyles.states.disabled : {}),
      ...(loading ? inputStyles.states.loading : {}),
      ...style, // Allow style overrides
    };

    // Determine helper text and variant
    const displayHelperText = error
      ? typeof error === "string"
        ? error
        : "Invalid input"
      : success
      ? typeof success === "string"
        ? success
        : "Valid input"
      : warning
      ? typeof warning === "string"
        ? warning
        : "Warning"
      : helperText;

    const helperVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : "default";

    // Build final className
    const finalClassName = cn(
      inputVariants({ variant, size }),
      inputClassName,
      className
    );

    // Generate unique IDs for accessibility
    const inputId =
      props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = displayHelperText ? `${inputId}-helper` : undefined;

    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label */}
        {showLabel && label && (
          <label
            htmlFor={inputId}
            className={cn(labelClassName)}
            style={{
              ...labelStyles.base,
              ...(disabled ? labelStyles.states.disabled : {}),
            }}
          >
            <span style={{ color: "var(--color-input-label, #1e40af)" }}>
              {label}
            </span>
            {labelState === "required" && (
              <span
                style={{ color: "var(--color-input-label-required, #a30134)" }}
              >
                {" "}
                *
              </span>
            )}
            {labelState === "optional" && (
              <span
                style={{
                  color: "var(--color-text-muted, #6b7280)",
                  fontWeight: "var(--font-weight-regular, 400)", // FIXED: Override bold inheritance
                }}
              >
                {" "}
                (Optional)
              </span>
            )}
          </label>
        )}

        {/* Hint Text */}
        {showHintText && hintText && !displayHelperText && (
          <p
            style={{
              ...helperStyles.base,
              ...helperStyles.variants.muted,
              marginTop: "0px", // AGGRESSIVE: No space between label and hint
              marginBottom: "2px", // AGGRESSIVE: Minimal space before input
            }}
          >
            {hintText}
          </p>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Text/Icon */}
          {(leftIcon || leftText) && (
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center"
              style={{ color: "var(--color-text-muted, #6b7280)" }}
            >
              {leftIcon}
              {leftText && <span className="text-sm">{leftText}</span>}
            </div>
          )}

          {/* Input Element */}
          <input
            {...props}
            ref={elementRef}
            id={inputId}
            disabled={disabled}
            className={finalClassName}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={helperTextId}
            style={{
              ...combinedStyles,
              paddingLeft:
                leftIcon || leftText ? "2.5rem" : combinedStyles.paddingLeft,
              paddingRight:
                rightIcon || rightText || loading || clearable
                  ? "2.5rem"
                  : combinedStyles.paddingRight,
            }}
          />

          {/* Right Side Content */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Loading Spinner */}
            {loading && (
              <div style={{ color: "var(--color-text-muted, #6b7280)" }}>
                <Spinner />
              </div>
            )}

            {/* Clear Button */}
            {clearable && props.value && !disabled && !loading && (
              <button
                type="button"
                onClick={onClear}
                className="hover:text-gray-700 focus:outline-none"
                style={{ color: "var(--color-text-muted, #6b7280)" }}
                aria-label="Clear input"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}

            {/* Right Text/Icon */}
            {(rightIcon || rightText) && !loading && !clearable && (
              <div
                className="flex items-center"
                style={{ color: "var(--color-text-muted, #6b7280)" }}
              >
                {rightText && <span className="text-sm">{rightText}</span>}
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Helper Text */}
        {displayHelperText && (
          <p
            id={helperTextId}
            className={cn(helperClassName)}
            style={{
              ...helperStyles.base,
              ...helperStyles.variants[helperVariant],
              marginTop: "1px", // AGGRESSIVE: Almost no space above validation text
            }}
          >
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// 🎯 Named Exports for compatibility with existing imports
export { Input, inputVariants };
export default Input;
