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
    // Layout & Structure - FIXED: Added proper responsive width constraints
    display: "flex" as const,
    width: "100%",
    maxWidth: "100%", // 🔧 FIX: Prevent overflow beyond container
    minWidth: "0", // 🔧 FIX: Allow shrinking in flex/grid containers
    boxSizing: "border-box" as const, // 🔧 FIX: Include padding/border in width calculations
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
    fontWeight: "var(--font-weight-medium, 500)",
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

// 🎯 Helper text variants for consistent styling across components
const helperVariants = cva(
  // Base helper text styles using design tokens
  "text-[var(--font-size-base,16px)] leading-[var(--line-height-loose,1.75)] font-[var(--font-weight-regular,400)] font-[var(--font-family-sans,'Poppins',system-ui,sans-serif)] tracking-[var(--letter-spacing-wide,0.0225em)] mt-1",
  {
    variants: {
      variant: {
        default: "text-[var(--color-input-helper,#39444f)]",
        error: "text-[var(--color-input-text-error,#eb0000)]",
        success: "text-[var(--color-input-text-success,#007d85)]",
        warning: "text-[var(--color-input-text-warning,#b75b00)]",
        muted: "text-[var(--color-text-muted,#8f949a)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// 🎯 Label variants for consistent styling across components
const labelVariants = cva(
  // Base label styles using design tokens
  "block text-[var(--font-size-base,16px)] font-[var(--font-weight-medium,500)] mb-0.5 font-[var(--font-family-sans,'Poppins',sans-serif)]",
  {
    variants: {
      variant: {
        default: "text-[var(--color-input-label,#1e40af)]",
        disabled: "text-[var(--color-disabled-text,#6b7280)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// 🎯 OPTIMAL: Design Tokens with Fallbacks for Focus Styles
const injectFocusStyles = (variant: string) => {
  const focusStyleId = `input-focus-${variant}`;

  // Remove existing focus styles
  const existingStyle = document.getElementById(focusStyleId);
  if (existingStyle) existingStyle.remove();

  // Create new focus styles
  const style = document.createElement("style");
  style.id = focusStyleId;

  let shadowToken;
  switch (variant) {
    case "error":
      shadowToken =
        "var(--input-focus-shadow-error, 0 0 0 3px rgba(235, 0, 0, 0.6))";
      break;
    case "success":
      shadowToken =
        "var(--input-focus-shadow-success, 0 0 0 3px rgba(0, 125, 133, 0.6))";
      break;
    case "warning":
      shadowToken =
        "var(--input-focus-shadow-warning, 0 0 0 3px rgba(183, 91, 0, 0.8))";
      break;
    default:
      shadowToken =
        "var(--input-focus-shadow-default, 0 0 0 3px rgba(255, 153, 0, 0.8))";
  }

  style.textContent = `
    .input-${variant}:focus {
      box-shadow: ${shadowToken};
    }
  `;

  document.head.appendChild(style);
};

// TypeScript interface for component props
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  // Custom sizing (overrides HTML input size)
  size?: "sm" | "md" | "lg" | "xl";

  // Label Props
  label?: string;
  labelState?: "required" | "optional";
  hideLabel?: boolean;

  // Styling Overrides
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;

  // Content & State
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftText?: string;
  rightText?: string;
  loading?: boolean;
  clearable?: boolean;
  onClear?: () => void;

  // Helper Text & Validation
  hintText?: string;
  error?: string;
  success?: string;
  warning?: string;
}

// 🎯 Main Component Implementation
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant = "default",
      size = "md",

      // Label props
      label,
      labelState,
      hideLabel = false,

      // Styling
      containerClassName,
      labelClassName,
      helperClassName,
      style,

      // Content
      leftIcon,
      rightIcon,
      leftText,
      rightText,
      loading = false,
      clearable = false,
      onClear,

      // Validation
      hintText,
      error,
      success,
      warning,

      // State
      disabled = false,
      ...props
    },
    ref
  ) => {
    const elementRef = React.useRef<HTMLInputElement>(null);
    const inputId = React.useId();

    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current!);

    // Inject focus styles on mount
    React.useEffect(() => {
      if (elementRef.current && variant) {
        injectFocusStyles(variant);
        elementRef.current.classList.add(`input-${variant}`);
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

    // 🎯 Combine styles: Base + Variant + Size + State + Custom
    const combinedStyles = {
      ...inputStyles.base,
      ...(finalVariant && inputStyles.variants[finalVariant]
        ? inputStyles.variants[finalVariant]
        : {}),
      ...(size && inputStyles.sizes[size] ? inputStyles.sizes[size] : {}),
      ...(disabled ? inputStyles.states.disabled : {}),
      ...(loading ? inputStyles.states.loading : {}),
      ...style, // Custom overrides
    };

    // Build final className
    const finalClassName = cn(
      inputVariants({ variant: finalVariant, size }),
      className
    );

    // Helper text logic
    const displayHelperText = error || success || warning;
    const helperVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : "default";
    const showLabel = !hideLabel;
    const showHintText = hintText && !displayHelperText;

    // IDs for accessibility
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
            type={type}
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
export { Input, inputVariants, helperVariants, labelVariants };
export default Input;
