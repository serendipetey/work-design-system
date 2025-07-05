// packages/components/src/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 🎯 Updated: CVA with proper disabled cursor handling
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
      size: "md",
    },
  }
);

// 🎯 Updated: getButtonStyles with theme-specific disabled states
const getButtonStyles = (
  variant: string,
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

  // 🎯 Updated: Variant styles with theme-specific disabled states
  const variantStyles: Record<string, any> = {
    primary: disabled
      ? {
          backgroundColor:
            "var(--button-primary-bg-disabled, var(--color-navy-200, #d1d9e6))",
          color:
            "var(--button-primary-text-disabled, var(--color-navy-400, #7a8699))",
          borderColor:
            "var(--button-primary-border-disabled, var(--color-navy-200, #d1d9e6))",
        }
      : {
          backgroundColor:
            "var(--button-primary-bg, var(--color-navy-500, #0e3a6c))",
          color: "var(--button-primary-text, var(--color-white, #ffffff))",
          borderColor: "var(--button-primary-border, transparent)",
        },

    outline: disabled
      ? {
          backgroundColor:
            "var(--button-outline-bg-disabled, var(--color-navy-50, #f8f9fb))",
          color:
            "var(--button-outline-text-disabled, var(--color-navy-300, #a8b3c5))",
          borderColor:
            "var(--button-outline-border-disabled, var(--color-navy-200, #d1d9e6))",
        }
      : {
          backgroundColor: "var(--button-outline-bg, transparent)",
          color: "var(--button-outline-text, var(--color-navy-500, #0e3a6c))",
          borderColor:
            "var(--button-outline-border, var(--color-navy-500, #0e3a6c))",
        },

    cta: disabled
      ? {
          backgroundColor:
            "var(--button-cta-bg-disabled, var(--color-red-200, #fecaca))",
          color:
            "var(--button-cta-text-disabled, var(--color-red-400, #f87171))",
          borderColor:
            "var(--button-cta-border-disabled, var(--color-red-200, #fecaca))",
        }
      : {
          backgroundColor:
            "var(--button-cta-bg, var(--color-red-500, #dc2626))",
          color: "var(--button-cta-text, var(--color-white, #ffffff))",
          borderColor: "var(--button-cta-border, transparent)",
        },

    success: disabled
      ? {
          backgroundColor:
            "var(--button-success-bg-disabled, var(--color-success-200, #a7f3d0))",
          color:
            "var(--button-success-text-disabled, var(--color-success-400, #4ade80))",
          borderColor:
            "var(--button-success-border-disabled, var(--color-success-200, #a7f3d0))",
        }
      : {
          backgroundColor:
            "var(--button-success-bg, var(--color-success-500, #059669))",
          color: "var(--button-success-text, var(--color-white, #ffffff))",
          borderColor: "var(--button-success-border, transparent)",
        },

    warning: disabled
      ? {
          backgroundColor:
            "var(--button-warning-bg-disabled, var(--color-warning-200, #fed7aa))",
          color:
            "var(--button-warning-text-disabled, var(--color-warning-400, #fb923c))",
          borderColor:
            "var(--button-warning-border-disabled, var(--color-warning-200, #fed7aa))",
        }
      : {
          backgroundColor:
            "var(--button-warning-bg, var(--color-warning-500, #d97706))",
          color: "var(--button-warning-text, var(--color-white, #ffffff))",
          borderColor: "var(--button-warning-border, transparent)",
        },

    destructive: disabled
      ? {
          backgroundColor:
            "var(--button-destructive-bg-disabled, var(--color-destructive-200, #fecaca))",
          color:
            "var(--button-destructive-text-disabled, var(--color-destructive-400, #f87171))",
          borderColor:
            "var(--button-destructive-border-disabled, var(--color-destructive-200, #fecaca))",
        }
      : {
          backgroundColor:
            "var(--button-destructive-bg, var(--color-destructive-500, #dc2626))",
          color: "var(--button-destructive-text, var(--color-white, #ffffff))",
          borderColor: "var(--button-destructive-border, transparent)",
        },

    ghost: disabled
      ? {
          backgroundColor: "var(--button-ghost-bg-disabled, transparent)",
          color:
            "var(--button-ghost-text-disabled, var(--color-navy-300, #a8b3c5))",
          borderColor: "var(--button-ghost-border-disabled, transparent)",
        }
      : {
          backgroundColor: "var(--button-ghost-bg, transparent)",
          color: "var(--button-ghost-text, var(--color-navy-500, #0e3a6c))",
          borderColor: "var(--button-ghost-border, transparent)",
        },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
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
    
    .design-system-button[data-variant="ghost"]:hover:not(:disabled) {
      background-color: var(--button-ghost-bg-hover, var(--color-navy-100, #f0f3f7)) !important;
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
    
    /* 🎯 ACTIVE/PRESS STATES - Only for enabled buttons */
    .design-system-button[data-variant="primary"]:active:not(:disabled) {
      background-color: var(--button-primary-bg-focus, var(--color-navy-700, #082343)) !important;
      transform: translateY(1px) !important;
    }
    
    .design-system-button[data-variant="outline"]:active:not(:disabled) {
      background-color: var(--button-outline-bg-focus, var(--color-navy-200, #e2e8f0)) !important;
      transform: translateY(1px) !important;
    }
    
    .design-system-button[data-variant="cta"]:active:not(:disabled) {
      background-color: var(--button-cta-bg-focus, var(--color-red-700, #991b1b)) !important;
      transform: translateY(1px) !important;
    }
    
    .design-system-button[data-variant="success"]:active:not(:disabled) {
      background-color: var(--button-success-bg-focus, var(--color-success-700, #004d50)) !important;
      transform: translateY(1px) !important;
    }
    
    .design-system-button[data-variant="warning"]:active:not(:disabled) {
      background-color: var(--button-warning-bg-focus, var(--color-warning-700, #8b4513)) !important;
      transform: translateY(1px) !important;
    }
    
    .design-system-button[data-variant="destructive"]:active:not(:disabled) {
      background-color: var(--button-destructive-bg-focus, var(--color-destructive-700, #a21caf)) !important;
      transform: translateY(1px) !important;
    }
    
    .design-system-button[data-variant="ghost"]:active:not(:disabled) {
      background-color: var(--button-ghost-bg-focus, var(--color-navy-200, #e2e8f0)) !important;
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    // Inject hover and focus CSS on first render
    React.useEffect(() => {
      createHoverCSS();
    }, []);

    // 🎯 Updated: Pass disabled state to getButtonStyles
    const combinedStyles = {
      ...getButtonStyles(variant || "primary", size || "md", isDisabled),
      ...style, // User styles take precedence
    };

    return (
      <Comp
        className={cn(
          buttonBaseClasses({ variant, size }),
          "design-system-button",
          className
        )}
        style={combinedStyles}
        data-variant={variant}
        data-size={size}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="mr-2">
            <Spinner />
          </span>
        )}
        {!loading && leftIcon && (
          <span className="mr-2 inline-flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2 inline-flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonBaseClasses as buttonVariants };
