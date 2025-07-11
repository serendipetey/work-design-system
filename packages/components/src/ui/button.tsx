// packages/components/src/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonBaseClasses = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "",
        outline: "",
        cta: "",
        success: "",
        warning: "",
        destructive: "",
      },
      appearance: {
        solid: "",
        ghost: "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      appearance: "solid",
      size: "md",
    },
  }
);

// 🎯 Updated: getButtonStyles with theme-specific disabled states
const getButtonStyles = (
  variant: string,
  appearance: string,
  size: string,
  disabled: boolean = false
) => {
  const baseStyles = {
    fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
    fontWeight: "var(--button-font-weight, 500)",
    borderRadius: "var(--button-border-radius, var(--radius-sm, 6px))",
    borderWidth: "var(--button-border-width, 1px)",
    borderStyle: "solid",
    cursor: disabled ? "not-allowed" : "pointer", // 🎯 Theme-specific cursor
    transition: "var(--button-transition, all 150ms ease-in-out)",
  };

  // Size styles remain the same
  const sizeStyles: Record<string, any> = {
    sm: {
      height: "var(--button-height-sm, 32px)",
      paddingLeft: "var(--button-padding-x-sm, 12px)",
      paddingRight: "var(--button-padding-x-sm, 12px)",
      fontSize: "var(--button-font-size-sm, 12px)",
    },
    md: {
      height: "var(--button-height-md, 40px)",
      paddingLeft: "var(--button-padding-x-md, 16px)",
      paddingRight: "var(--button-padding-x-md, 16px)",
      fontSize: "var(--button-font-size-md, 14px)",
    },
    lg: {
      height: "var(--button-height-lg, 48px)",
      paddingLeft: "var(--button-padding-x-lg, 20px)",
      paddingRight: "var(--button-padding-x-lg, 20px)",
      fontSize: "var(--button-font-size-lg, 16px)",
    },
    xl: {
      height: "var(--button-height-xl, 56px)",
      paddingLeft: "var(--button-padding-x-xl, 24px)",
      paddingRight: "var(--button-padding-x-xl, 24px)",
      fontSize: "var(--button-font-size-xl, 18px)",
    },
  };

  // 🎯 NEW CODE:
  const getVariantColors = (variant: string, disabled: boolean) => {
    const variants: Record<string, any> = {
      primary: disabled
        ? {
            bg: "var(--button-primary-bg-disabled, var(--color-navy-200, #e3e9ef))",
            text: "var(--button-primary-text-disabled, var(--color-navy-400, #164b8f))",
            border:
              "var(--button-primary-border-disabled, var(--color-navy-200, #e3e9ef))",
          }
        : {
            bg: "var(--button-primary-bg, var(--color-navy-500, #0e3a6c))",
            text: "var(--button-primary-text, var(--color-white, #ffffff))",
            border: "var(--button-primary-border, transparent)",
          },
      outline: disabled
        ? {
            bg: "var(--button-outline-bg-disabled, transparent)",
            text: "var(--button-outline-text-disabled, var(--color-navy-300, #a8b3c5))",
            border:
              "var(--button-outline-border-disabled, var(--color-navy-200, #e3e9ef))",
          }
        : {
            bg: "var(--button-outline-bg, transparent)",
            text: "var(--button-outline-text, var(--color-navy-500, #0e3a6c))",
            border:
              "var(--button-outline-border, var(--color-navy-500, #0e3a6c))",
          },
      cta: disabled
        ? {
            bg: "var(--button-cta-bg-disabled, var(--color-red-200, #ebccd7))",
            text: "var(--button-cta-text-disabled, var(--color-red-400, #b76687))",
            border:
              "var(--button-cta-border-disabled, var(--color-red-200, #ebccd7))",
          }
        : {
            bg: "var(--button-cta-bg, var(--color-red-500, #a30134))",
            text: "var(--button-cta-text, var(--color-white, #ffffff))",
            border: "var(--button-cta-border, transparent)",
          },
      success: disabled
        ? {
            bg: "var(--button-success-bg-disabled, var(--color-success-200, #e6f2f3))",
            text: "var(--button-success-text-disabled, var(--color-success-400, #99ced1))",
            border:
              "var(--button-success-border-disabled, var(--color-success-200, #e6f2f3))",
          }
        : {
            bg: "var(--button-success-bg, var(--color-success-500, #007d85))",
            text: "var(--button-success-text, var(--color-white, #ffffff))",
            border: "var(--button-success-border, transparent)",
          },
      warning: disabled
        ? {
            bg: "var(--button-warning-bg-disabled, var(--color-warning-200, #f8efe6))",
            text: "var(--button-warning-text-disabled, var(--color-warning-400, #e6c999))",
            border:
              "var(--button-warning-border-disabled, var(--color-warning-200, #f8efe6))",
          }
        : {
            bg: "var(--button-warning-bg, var(--color-warning-500, #b75b00))",
            text: "var(--button-warning-text, var(--color-white, #ffffff))",
            border: "var(--button-warning-border, transparent)",
          },
      destructive: disabled
        ? {
            bg: "var(--button-destructive-bg-disabled, var(--color-destructive-200, #f7d5d5))",
            text: "var(--button-destructive-text-disabled, var(--color-destructive-400, #e78181))",
            border:
              "var(--button-destructive-border-disabled, var(--color-destructive-200, #f7d5d5))",
          }
        : {
            bg: "var(--button-destructive-bg, var(--color-destructive-500, #d92b2b))",
            text: "var(--button-destructive-text, var(--color-white, #ffffff))",
            border: "var(--button-destructive-border, transparent)",
          },
    };
    return variants[variant] || variants.primary;
  };

  const colors = getVariantColors(variant, disabled);

  // Helper function to get proper text color for ghost variants
  const getGhostTextColor = (variant: string, disabled: boolean) => {
    if (disabled) {
      // Use existing disabled colors for ghost variants
      return colors.text;
    }

    // Map each variant to its semantic color for ghost appearance
    const ghostColors: Record<string, string> = {
      primary: "var(--color-navy-500, #0e3a6c)",
      outline: "var(--color-navy-500, #0e3a6c)", // Already works correctly
      cta: "var(--color-red-500, #a30134)",
      success: "var(--color-success-500, #007d85)",
      warning: "var(--color-warning-500, #b75b00)",
      destructive: "var(--color-destructive-500, #d92b2b)",
    };

    return ghostColors[variant] || ghostColors.primary;
  };

  // Apply appearance modifications
  const variantStyles =
    appearance === "ghost"
      ? {
          backgroundColor: disabled ? "transparent" : "transparent",
          color: getGhostTextColor(variant, disabled),
          borderColor: disabled ? "transparent" : "transparent",
        }
      : {
          backgroundColor: colors.bg,
          color: colors.text,
          borderColor: colors.border,
        };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles,
  };
};

// 🎯 Enhanced Hover and Focus CSS Injection (updated to exclude disabled states)
const createHoverCSS = () => {
  if (document.getElementById("button-interactive-styles")) return;

  const style = document.createElement("style");
  style.id = "button-interactive-styles";
  style.textContent = `
    /* 🎯 HOVER STATES - Only for enabled buttons */
    .design-system-button[data-variant="primary"]:hover:not(:disabled) {
      background-color: var(--button-primary-bg-hover, var(--color-navy-600, #0a2d54)) !important;
      border-color: var(--button-primary-border-hover, var(--color-navy-600, #0a2d54)) !important;
    }
    
    .design-system-button[data-variant="outline"] {
      border-width: var(--border-md, 2px) !important;
    }
    
    .design-system-button[data-variant="outline"]:hover:not(:disabled) {
      background-color: var(--button-outline-bg-hover, var(--color-navy-100, #f0f3f7)) !important;
      color: var(--button-outline-text-hover, var(--color-navy-500, #0e3a6c)) !important;
      border-color: var(--button-outline-border-hover, var(--color-navy-500, #0e3a6c)) !important;
    }
    
    .design-system-button[data-variant="cta"]:hover:not(:disabled) {
      background-color: var(--button-cta-bg-hover, var(--color-red-600, #b91c1c)) !important;
      border-color: var(--button-cta-border-hover, var(--color-red-600, #b91c1c)) !important;
    }
    
    .design-system-button[data-variant="success"]:hover:not(:disabled) {
      background-color: var(--button-success-bg-hover, var(--color-success-600, #006064)) !important;
      border-color: var(--button-success-border-hover, var(--color-success-600, #006064)) !important;
    }
    
    .design-system-button[data-variant="warning"]:hover:not(:disabled) {
      background-color: var(--button-warning-bg-hover, var(--color-warning-600, #a04d00)) !important;
      border-color: var(--button-warning-border-hover, var(--color-warning-600, #a04d00)) !important;
    }
    
    .design-system-button[data-variant="destructive"]:hover:not(:disabled) {
      background-color: var(--button-destructive-bg-hover, var(--color-destructive-600, #c42323)) !important;
      border-color: var(--button-destructive-border-hover, var(--color-destructive-600, #c42323)) !important;
    }
    
    .design-system-button[data-appearance="ghost"]:hover:not(:disabled) {
      background-color: var(--color-navy-100, #f0f3f7) !important;
    }
    
    .design-system-button[data-appearance="ghost"][data-variant="destructive"]:hover:not(:disabled) {
      background-color: var(--color-destructive-100, #fbeaea) !important;
    }
    
    .design-system-button[data-appearance="ghost"][data-variant="success"]:hover:not(:disabled) {
      background-color: var(--color-success-100, #f0f8f9) !important;
    }
    
    .design-system-button[data-appearance="ghost"][data-variant="warning"]:hover:not(:disabled) {
      background-color: var(--color-warning-100, #fdf7f0) !important;
    }
    
    .design-system-button[data-appearance="ghost"][data-variant="cta"]:hover:not(:disabled) {
      background-color: var(--color-red-100, #f5e6eb) !important;
    }
    
    /* 🎯 DISABLED STATE - Ensure cursor stays not-allowed */
    .design-system-button:disabled {
      cursor: not-allowed !important;
      pointer-events: auto !important; /* Allow cursor change on hover */
    }
    
    /* 🎯 UNIFIED FOCUS STYLES - Only for keyboard navigation */
    .design-system-button:focus-visible {
      /* Remove default outline */
      outline: none !important;
      
      /* Orange background with navy text - unified across all variants */
      background-color: var(--button-unified-focus-bg, var(--color-focus-500, #ff9900)) !important;
      color: var(--button-unified-focus-text, var(--color-navy-500, #0e3a6c)) !important;
      
      /* Clear all borders first, then apply thick navy bottom border */
      border: 1px solid transparent !important;
      border-bottom: var(--button-unified-focus-border-width, 3px) solid var(--button-unified-focus-border, var(--color-navy-500, #0e3a6c)) !important;
      
      /* Flat bottom edge */
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
    
    /* 🎯 FOCUS + HOVER COMBINATION - Preserve focus accessibility with lighter orange */
    .design-system-button:focus-visible:hover:not(:disabled) {
      /* Remove default outline */
      outline: none !important;
      
      /* Lighter orange background with navy text - focus/400 */
      background-color: var(--button-unified-focus-hover-bg, var(--color-focus-400, #ffab33)) !important;
      color: var(--button-unified-focus-text, var(--color-navy-500, #0e3a6c)) !important;
      
      /* Clear all borders first, then apply thick navy bottom border */
      border: 1px solid transparent !important;
      border-bottom: var(--button-unified-focus-border-width, 3px) solid var(--button-unified-focus-border, var(--color-navy-500, #0e3a6c)) !important;
      
      /* Flat bottom edge */
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
    
    /* 🎯 ACTIVE/PRESS STATES - Animation only, no color changes */
    .design-system-button:active:not(:disabled) {
      transform: translateY(1px) !important;
    }
  `;
  document.head.appendChild(style);
};

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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonBaseClasses> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // Convenience prop for ghost variants
  ghost?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      appearance,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ghost,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    const resolvedAppearance = ghost ? "ghost" : appearance || "solid";

    // Inject hover and focus CSS on first render
    React.useEffect(() => {
      createHoverCSS();
    }, []);

    // Detect if this is an icon-only button
    const isIconOnly = !children && (leftIcon || rightIcon);

    // Get the base button styles
    const baseButtonStyles = getButtonStyles(
      variant || "primary",
      resolvedAppearance,
      size || "md",
      isDisabled
    );

    // Icon-only padding overrides per your Figma specs
    const iconOnlyPadding = {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "20px",
    };

    // 🎯 Updated: Override padding for icon-only buttons
    const combinedStyles = {
      ...baseButtonStyles,
      ...(isIconOnly && {
        paddingLeft: iconOnlyPadding[size || "md"],
        paddingRight: iconOnlyPadding[size || "md"],
        aspectRatio: "1",
        minWidth: "auto",
      }),
      ...style, // User styles take precedence
    };

    return (
      <Comp
        className={cn(
          buttonBaseClasses({ variant, appearance: resolvedAppearance, size }),
          "design-system-button",
          className
        )}
        style={combinedStyles}
        data-variant={variant}
        data-appearance={resolvedAppearance}
        data-size={size}
        data-icon-only={isIconOnly ? "true" : undefined}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className={cn(!isIconOnly && "mr-2")}>
            <Spinner />
          </span>
        )}
        {!loading && leftIcon && (
          <span
            className={cn(
              "inline-flex items-center justify-center",
              !isIconOnly && "mr-2"
            )}
          >
            {leftIcon}
          </span>
        )}
        {children}
        {!loading && rightIcon && (
          <span
            className={cn(
              "inline-flex items-center justify-center",
              !isIconOnly && "ml-2"
            )}
          >
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonBaseClasses as buttonVariants };
