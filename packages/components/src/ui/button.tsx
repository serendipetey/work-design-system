// design-system/packages/components/src/ui/button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// Base button classes using ONLY essential Tailwind utilities
const buttonBaseClasses = cva(
  [
    // Essential layout & interaction only
    "inline-flex items-center justify-center whitespace-nowrap",
    "border transition-all duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        primary: [],
        outline: [],
        cta: [],
        success: [],
        warning: [],
        destructive: [],
        ghost: [],
      },
      size: {
        sm: [],
        md: [],
        lg: [],
        xl: [],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Get CSS custom property value safely
const getCSSVar = (property: string, fallback: string = ""): string => {
  if (typeof window === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim() || fallback
  );
};

// Build styles using CSS custom properties directly
const getButtonStyles = (variant: string, size: string) => {
  const styles: React.CSSProperties = {
    // Typography - Always from design tokens
    fontFamily: getCSSVar("--button-font-family", "Poppins, sans-serif"),
    fontWeight: getCSSVar("--button-font-weight", "500"),
    letterSpacing: getCSSVar("--button-letter-spacing", "0.025em"),
    lineHeight: getCSSVar("--button-line-height", "1.5"),

    // Border radius
    borderRadius: getCSSVar("--button-border-radius", "6px"),

    // Remove any unwanted effects
    boxShadow: "none",
  };

  // Size-specific styles using design tokens
  switch (size) {
    case "sm":
      styles.height = getCSSVar("--button-height-sm", "32px");
      styles.paddingLeft = getCSSVar("--button-padding-x-sm", "12px");
      styles.paddingRight = getCSSVar("--button-padding-x-sm", "12px");
      styles.fontSize = getCSSVar("--button-font-size-sm", "0.75rem");
      break;
    case "md":
      styles.height = getCSSVar("--button-height-md", "40px");
      styles.paddingLeft = getCSSVar("--button-padding-x-md", "16px");
      styles.paddingRight = getCSSVar("--button-padding-x-md", "16px");
      styles.fontSize = getCSSVar("--button-font-size-md", "0.875rem");
      break;
    case "lg":
      styles.height = getCSSVar("--button-height-lg", "48px");
      styles.paddingLeft = getCSSVar("--button-padding-x-lg", "24px");
      styles.paddingRight = getCSSVar("--button-padding-x-lg", "24px");
      styles.fontSize = getCSSVar("--button-font-size-lg", "1rem");
      break;
    case "xl":
      styles.height = getCSSVar("--button-height-xl", "56px");
      styles.paddingLeft = getCSSVar("--button-padding-x-xl", "32px");
      styles.paddingRight = getCSSVar("--button-padding-x-xl", "32px");
      styles.fontSize = getCSSVar("--button-font-size-xl", "1.125rem");
      break;
  }

  // Variant-specific styles using design tokens
  switch (variant) {
    case "primary":
      styles.backgroundColor = getCSSVar("--button-primary-bg", "#0e3a6c");
      styles.color = getCSSVar("--button-primary-text", "#ffffff");
      styles.borderColor = getCSSVar("--button-primary-border", "transparent");
      break;
    case "outline":
      styles.backgroundColor = getCSSVar("--button-outline-bg", "transparent");
      styles.color = getCSSVar("--button-outline-text", "#0e3a6c");
      styles.borderColor = getCSSVar("--button-outline-border", "#0e3a6c");
      break;
    case "cta":
      styles.backgroundColor = getCSSVar("--button-cta-bg", "#dc2626");
      styles.color = getCSSVar("--button-cta-text", "#ffffff");
      styles.borderColor = getCSSVar("--button-cta-border", "transparent");
      break;
    case "success":
      styles.backgroundColor = getCSSVar("--button-success-bg", "#059669");
      styles.color = getCSSVar("--button-success-text", "#ffffff");
      styles.borderColor = getCSSVar("--button-success-border", "transparent");
      break;
    case "warning":
      styles.backgroundColor = getCSSVar("--button-warning-bg", "#d97706");
      styles.color = getCSSVar("--button-warning-text", "#ffffff");
      styles.borderColor = getCSSVar("--button-warning-border", "transparent");
      break;
    case "destructive":
      styles.backgroundColor = getCSSVar("--button-destructive-bg", "#dc2626");
      styles.color = getCSSVar("--button-destructive-text", "#ffffff");
      styles.borderColor = getCSSVar(
        "--button-destructive-border",
        "transparent"
      );
      break;
    case "ghost":
      styles.backgroundColor = getCSSVar("--button-ghost-bg", "transparent");
      styles.color = getCSSVar("--button-ghost-text", "#0e3a6c");
      styles.borderColor = getCSSVar("--button-ghost-border", "transparent");
      break;
  }

  return styles;
};

// Create CSS for hover states (injected once)
const createHoverCSS = () => {
  if (typeof document === "undefined") return;

  // Check if styles already exist
  if (document.getElementById("button-hover-styles")) return;

  const style = document.createElement("style");
  style.id = "button-hover-styles";
  style.textContent = `
    .design-system-button[data-variant="primary"]:hover {
      background-color: var(--button-primary-bg-hover, #0a2d54) !important;
    }
    .design-system-button[data-variant="outline"]:hover {
      background-color: var(--button-outline-bg-hover, #0e3a6c) !important;
      color: var(--button-outline-text-hover, #ffffff) !important;
      border-color: var(--button-outline-border-hover, #0a2d54) !important;
    }
    .design-system-button[data-variant="cta"]:hover {
      background-color: var(--button-cta-bg-hover, #b91c1c) !important;
    }
    .design-system-button[data-variant="success"]:hover {
      background-color: var(--button-success-bg-hover, #047857) !important;
    }
    .design-system-button[data-variant="warning"]:hover {
      background-color: var(--button-warning-bg-hover, #b45309) !important;
    }
    .design-system-button[data-variant="destructive"]:hover {
      background-color: var(--button-destructive-bg-hover, #b91c1c) !important;
    }
    .design-system-button[data-variant="ghost"]:hover {
      background-color: var(--button-ghost-bg-hover, #f0f3f7) !important;
    }
    
    /* Focus styles */
    .design-system-button:focus-visible {
      outline: 2px solid var(--color-focus, #ff9900);
      outline-offset: 2px;
    }
  `;

  document.head.appendChild(style);
};

// Simple spinner component
const Spinner = () => (
  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
      variant = "primary",
      size = "md",
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

    // Inject hover CSS on first render
    React.useEffect(() => {
      createHoverCSS();
    }, []);

    // Combine styles: design token styles + user styles
    const combinedStyles = {
      ...getButtonStyles(variant || "primary", size || "md"),
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
