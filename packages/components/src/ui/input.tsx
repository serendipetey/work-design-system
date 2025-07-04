// packages/components/src/ui/input.tsx
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

// 🎯 NEW ARCHITECTURE: CSS Custom Properties via Inline Styles
const inputStyles = {
  // Base styles using CSS custom properties
  base: {
    // Layout & Structure
    display: "flex",
    width: "100%",
    border: "var(--input-border-width, 1px) solid",
    borderRadius: "var(--input-border-radius)",
    backgroundColor: "var(--input-bg)",

    // Typography
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--font-size-sm)",
    lineHeight: "var(--line-height-sm)",

    // Transitions
    transition: "var(--input-transition)",

    // States
    outline: "none",

    // File input specific
    "&::file-selector-button": {
      border: 0,
      backgroundColor: "transparent",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-medium)",
    },

    // Placeholder styling
    "&::placeholder": {
      color: "var(--color-input-placeholder)",
    },
  },

  // Variant styles
  variants: {
    default: {
      borderColor: "var(--color-border)",
      color: "var(--color-input-text)",
    },
    error: {
      borderColor: "var(--color-border-error)",
      color: "var(--color-input-text-error)",
    },
    success: {
      borderColor: "var(--color-border-success)",
      color: "var(--color-input-text-success)",
    },
    warning: {
      borderColor: "var(--color-border-warning)",
      color: "var(--color-input-text-warning)",
    },
  },

  // Size styles
  sizes: {
    sm: {
      height: "var(--input-height-sm)", // 32px
      paddingLeft: "var(--input-padding-x-sm)",
      paddingRight: "var(--input-padding-x-sm)",
      fontSize: "var(--font-size-xs)",
    },
    md: {
      height: "var(--input-height-md)", // 40px
      paddingLeft: "var(--input-padding-x-md)",
      paddingRight: "var(--input-padding-x-md)",
      fontSize: "var(--font-size-sm)",
    },
    lg: {
      height: "var(--input-height-lg)", // 48px
      paddingLeft: "var(--input-padding-x-lg)",
      paddingRight: "var(--input-padding-x-lg)",
      fontSize: "var(--font-size-base)",
    },
    xl: {
      height: "var(--input-height-xl)", // 56px
      paddingLeft: "var(--input-padding-x-xl)",
      paddingRight: "var(--input-padding-x-xl)",
      fontSize: "var(--font-size-lg)",
    },
  },

  // State styles
  states: {
    disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
    loading: {
      paddingRight: "2.5rem", // Make room for spinner
    },
  },
};

// Label styles using CSS custom properties
const labelStyles = {
  base: {
    display: "block",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-medium)",
    marginBottom: "var(--space-1)",
    // Remove color from here - let child spans handle it
  },
  states: {
    disabled: {
      color: "var(--color-text-disabled)",
    },
  },
};

// Helper text styles
const helperStyles = {
  base: {
    marginTop: "var(--space-1)",
    fontSize: "var(--font-size-xs)",
    lineHeight: "var(--line-height-xs)",
  },
  variants: {
    default: {
      color: "var(--color-text-secondary)",
    },
    error: {
      color: "var(--color-text-error)",
    },
    success: {
      color: "var(--color-text-success)",
    },
    warning: {
      color: "var(--color-text-warning)",
    },
    muted: {
      color: "var(--color-text-muted)",
    },
  },
};

// 🎯 CVA for className-based utilities (minimal usage)
const inputVariants = cva(
  // Base classes for layout/structure only
  "flex w-full transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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

// 🎯 Dynamic Focus CSS Injection
const injectFocusStyles = (variant: string) => {
  const focusStyleId = `input-focus-${variant}`;

  // Remove existing focus styles
  const existingStyle = document.getElementById(focusStyleId);
  if (existingStyle) existingStyle.remove();

  // Create new focus styles
  const style = document.createElement("style");
  style.id = focusStyleId;

  const focusStyles: Record<string, string> = {
    default: `
      .input-${variant}:focus {
        box-shadow: var(--input-focus-shadow-default) !important;
      }
    `,
    error: `
      .input-${variant}:focus {
        box-shadow: var(--input-focus-shadow-error) !important;
      }
    `,
    success: `
      .input-${variant}:focus {
        box-shadow: var(--input-focus-shadow-success) !important;
      }
    `,
    warning: `
      .input-${variant}:focus {
        box-shadow: var(--input-focus-shadow-warning) !important;
      }
    `,
  };

  style.textContent = focusStyles[variant] || focusStyles.default;
  document.head.appendChild(style);
};

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

// 🎯 Main Component
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

    // 🎯 Combine styles: Base + Variant + Size + State + Custom
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

    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label */}
        {showLabel && label && (
          <label
            htmlFor={props.id}
            className={cn(labelClassName)}
            style={{
              ...labelStyles.base,
              ...(disabled ? labelStyles.states.disabled : {}),
            }}
          >
            <span
              style={{
                color: disabled
                  ? "var(--color-text-disabled)"
                  : "var(--color-navy-500)",
              }}
            >
              {label}
            </span>
            {labelState === "required" && (
              <span style={{ color: "var(--color-text-error)" }}> *</span>
            )}
            {labelState === "optional" && (
              <span style={{ color: "var(--color-gray-500)" }}>
                {" "}
                (optional)
              </span>
            )}
          </label>
        )}

        {/* Hint Text */}
        {showHintText && hintText && (
          <div
            style={{
              ...helperStyles.base,
              ...helperStyles.variants.muted,
              marginTop: 0,
              marginBottom: "var(--space-1)",
            }}
          >
            {hintText}
          </div>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Text/Icon */}
          {(leftText || leftIcon) && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center">
              {leftIcon && <span className="mr-1">{leftIcon}</span>}
              {leftText && (
                <span
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  {leftText}
                </span>
              )}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={elementRef}
            className={cn(
              inputVariants({ variant: finalVariant, size }),
              inputClassName,
              className
            )}
            style={{
              ...combinedStyles,
              paddingLeft:
                leftText || leftIcon ? "2.5rem" : combinedStyles.paddingLeft,
              paddingRight:
                rightText || rightIcon || loading || clearable
                  ? "2.5rem"
                  : combinedStyles.paddingRight,
            }}
            disabled={disabled || loading}
            aria-invalid={!!error}
            aria-describedby={
              displayHelperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />

          {/* Right Icons/Text */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {loading && <Spinner />}
            {!loading && clearable && props.value && (
              <button
                type="button"
                onClick={onClear}
                className="text-gray-400 hover:text-gray-600"
                style={{ fontSize: "var(--font-size-sm)" }}
              >
                ×
              </button>
            )}
            {!loading && rightIcon && <span>{rightIcon}</span>}
            {!loading && rightText && (
              <span
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--font-size-sm)",
                }}
              >
                {rightText}
              </span>
            )}
          </div>
        </div>

        {/* Helper Text */}
        {displayHelperText && (
          <div
            id={`${props.id}-helper`}
            className={cn(helperClassName)}
            style={{
              ...helperStyles.base,
              ...(helperVariant &&
              helperStyles.variants[
                helperVariant as keyof typeof helperStyles.variants
              ]
                ? helperStyles.variants[
                    helperVariant as keyof typeof helperStyles.variants
                  ]
                : helperStyles.variants.default),
            }}
          >
            {displayHelperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Legacy exports for compatibility
const labelVariants = () => ""; // Placeholder for backward compatibility
const helperVariants = () => ""; // Placeholder for backward compatibility

export { Input, inputVariants, labelVariants, helperVariants };
