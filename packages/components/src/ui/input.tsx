import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Input component variants using your design tokens
const inputVariants = cva(
  [
    // Base styles using design tokens
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
    "text-sm ring-offset-background",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "text-[var(--color-input-text)]",
          "placeholder:text-[var(--color-input-placeholder)]",
          "focus:border-[var(--color-border-focus)]",
        ],
        error: [
          "border-[var(--color-border-error)]",
          "text-[var(--color-input-text-error)]",
          "focus:border-[var(--color-border-error)]",
          "focus:ring-[var(--color-border-error)]",
        ],
        success: [
          "border-[var(--color-border-success)]",
          "text-[var(--color-input-text-success)]",
          "focus:border-[var(--color-border-success)]",
          "focus:ring-[var(--color-border-success)]",
        ],
        warning: [
          "border-[var(--color-border-warning)]",
          "text-[var(--color-input-text-warning)]",
          "focus:border-[var(--color-border-warning)]",
          "focus:ring-[var(--color-border-warning)]",
        ],
      },
      size: {
        sm: "h-8 px-2 py-1 text-xs",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
        xl: "h-14 px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Label variants using your typography tokens
const labelVariants = cva(
  [
    "typography-label",
    "text-sm font-medium leading-none",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ],
  {
    variants: {
      state: {
        default: "text-[var(--color-input-label)]",
        required: "text-[var(--color-input-label-required)]",
        optional: "text-[var(--color-input-label-optional)]",
        disabled: "text-[var(--color-input-text-disabled)]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

// Helper text variants using your design tokens
const helperVariants = cva(["typography-helper", "text-xs mt-1"], {
  variants: {
    variant: {
      default: "text-[var(--color-input-helper)]",
      error: "text-[var(--color-input-text-error)]",
      success: "text-[var(--color-input-text-success)]",
      warning: "text-[var(--color-input-text-warning)]",
      muted: "text-[var(--color-text-muted)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  // Label system
  label?: string;
  labelState?: "default" | "required" | "optional";
  showLabel?: boolean;

  // Helper/hint text system
  hintText?: string;
  showHintText?: boolean;
  helperText?: string;

  // Icon system
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // State management
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;

  // Loading state
  loading?: boolean;

  // Custom class names
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;

  // Clearable functionality
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      inputClassName,
      helperClassName,
      type = "text",
      variant,
      size,
      label,
      labelState = "default",
      showLabel = true,
      hintText,
      showHintText = true,
      helperText,
      leftIcon,
      rightIcon,
      error,
      success,
      warning,
      loading,
      clearable,
      onClear,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    // Determine the current variant based on state
    const currentVariant = React.useMemo(() => {
      if (error) return "error";
      if (success) return "success";
      if (warning) return "warning";
      return variant || "default";
    }, [error, success, warning, variant]);

    // Determine helper text content and variant
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

    // Generate unique ID for accessibility
    const inputId = React.useId();
    const helperTextId = React.useId();

    // Show clear button logic
    const showClear = clearable && value && !disabled && !loading;

    // Clear icon component
    const ClearIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    );

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-4 w-4 text-[var(--color-text-muted)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {/* Label */}
        {showLabel && label && (
          <div className="flex items-center gap-2">
            <label
              htmlFor={inputId}
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
                  *
                </span>
              )}
              {labelState === "optional" && (
                <span className="text-[var(--color-input-label-optional)] ml-1">
                  (Optional)
                </span>
              )}
            </label>
          </div>
        )}

        {/* Hint Text */}
        {showHintText && hintText && (
          <p className={cn(helperVariants({ variant: "muted" }))}>{hintText}</p>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            id={inputId}
            type={type}
            ref={ref}
            value={value}
            disabled={disabled || loading}
            aria-invalid={!!error}
            aria-describedby={helperContent ? helperTextId : undefined}
            className={cn(
              inputVariants({ variant: currentVariant, size }),
              leftIcon && "pl-10",
              (rightIcon || showClear || loading) && "pr-10",
              className,
              inputClassName
            )}
            {...props}
          />

          {/* Right Side Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && <LoadingSpinner />}
            {showClear && (
              <button
                type="button"
                onClick={onClear}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] transition-colors"
                aria-label="Clear input"
              >
                <ClearIcon />
              </button>
            )}
            {rightIcon && !loading && !showClear && (
              <div className="text-[var(--color-text-muted)]">{rightIcon}</div>
            )}
          </div>
        </div>

        {/* Helper Text */}
        {helperContent && (
          <p
            id={helperTextId}
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

Input.displayName = "Input";

export { Input, inputVariants, labelVariants, helperVariants };
