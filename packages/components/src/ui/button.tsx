import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base button styles - using your design tokens
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-150 ease-in-out cursor-pointer text-decoration-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-[1px]", // Your translateY(1px) on active
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary Button - maps to your --button-primary-* tokens
        primary: [
          "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]",
          "border-[var(--button-border-width)] border-[var(--button-primary-border)]",
          "hover:bg-[var(--button-primary-bg-hover)]",
          "focus-visible:bg-[var(--button-primary-bg)] focus-visible:shadow-[var(--button-focus-ring-primary)]",
          "disabled:bg-[var(--button-primary-bg-disabled)] disabled:text-[var(--button-primary-text-disabled)]",
          "disabled:border-[var(--button-primary-bg-disabled)]",
        ].join(" "),

        // Outline Button - maps to your --button-outline-* tokens
        outline: [
          "bg-[var(--button-outline-bg)] text-[var(--button-outline-text)]",
          "border-[var(--button-border-width)] border-[var(--button-outline-border)]",
          "hover:bg-[var(--button-outline-bg-hover)] hover:text-[var(--button-outline-text-hover)]",
          "hover:border-[var(--button-outline-border-hover)]",
          "focus-visible:bg-[var(--button-outline-bg)] focus-visible:shadow-[var(--button-focus-ring-primary)]",
          "active:bg-[var(--button-outline-bg-focus)]",
          "disabled:bg-[var(--button-outline-bg-disabled)] disabled:text-[var(--button-outline-text-disabled)]",
          "disabled:border-[var(--button-outline-border-disabled)]",
        ].join(" "),

        // CTA Button - maps to your --button-cta-* tokens
        cta: [
          "bg-[var(--button-cta-bg)] text-[var(--button-cta-text)]",
          "border-[var(--button-border-width)] border-[var(--button-cta-border)]",
          "hover:bg-[var(--button-cta-bg-hover)]",
          "focus-visible:bg-[var(--button-cta-bg)] focus-visible:shadow-[var(--button-focus-ring-warning)]",
          "active:bg-[var(--button-cta-bg-focus)]",
          "disabled:bg-[var(--button-cta-bg-disabled)] disabled:text-[var(--button-cta-text-disabled)]",
          "disabled:border-[var(--button-cta-bg-disabled)]",
        ].join(" "),

        // Success Button - maps to your --button-success-* tokens
        success: [
          "bg-[var(--button-success-bg)] text-[var(--button-success-text)]",
          "border-[var(--button-border-width)] border-[var(--button-success-border)]",
          "hover:bg-[var(--button-success-bg-hover)]",
          "focus-visible:bg-[var(--button-success-bg)] focus-visible:shadow-[var(--button-focus-ring-success)]",
          "active:bg-[var(--button-success-bg-focus)]",
          "disabled:bg-[var(--button-success-bg-disabled)] disabled:text-[var(--button-success-text-disabled)]",
        ].join(" "),

        // Warning Button - maps to your --button-warning-* tokens
        warning: [
          "bg-[var(--button-warning-bg)] text-[var(--button-warning-text)]",
          "border-[var(--button-border-width)] border-[var(--button-warning-border)]",
          "hover:bg-[var(--button-warning-bg-hover)]",
          "focus-visible:bg-[var(--button-warning-bg)] focus-visible:shadow-[var(--button-focus-ring-warning)]",
          "active:bg-[var(--button-warning-bg-focus)]",
          "disabled:bg-[var(--button-warning-bg-disabled)] disabled:text-[var(--button-warning-text-disabled)]",
        ].join(" "),

        // Destructive Button - maps to your --button-destructive-* tokens
        destructive: [
          "bg-[var(--button-destructive-bg)] text-[var(--button-destructive-text)]",
          "border-[var(--button-border-width)] border-[var(--button-destructive-border)]",
          "hover:bg-[var(--button-destructive-bg-hover)]",
          "focus-visible:bg-[var(--button-destructive-bg)] focus-visible:shadow-[var(--button-focus-ring-destructive)]",
          "active:bg-[var(--button-destructive-bg-focus)]",
          "disabled:bg-[var(--button-destructive-bg-disabled)] disabled:text-[var(--button-destructive-text-disabled)]",
          "disabled:border-[var(--button-destructive-bg-disabled)]",
        ].join(" "),

        // Ghost Button - clean variant for minimal styling
        ghost: [
          "bg-transparent text-[var(--button-outline-text)] border-transparent",
          "hover:bg-[var(--button-outline-bg-hover)] hover:text-[var(--button-outline-text-hover)]",
          "focus-visible:bg-[var(--button-outline-bg)] focus-visible:shadow-[var(--button-focus-ring-primary)]",
        ].join(" "),
      },
      size: {
        // Maps to your button height and padding tokens
        sm: "h-[var(--button-height-sm)] px-[var(--button-padding-x-sm)] text-sm",
        md: "h-[var(--button-height-md)] px-[var(--button-padding-x-md)] text-sm", // default
        lg: "h-[var(--button-height-lg)] px-[var(--button-padding-x-lg)] text-base",
        xl: "h-[var(--button-height-xl)] px-[var(--button-padding-x-xl)] text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className={cn(
              "animate-spin -ml-1 mr-2",
              size === "sm" &&
                "h-[var(--button-icon-size-sm)] w-[var(--button-icon-size-sm)]",
              size === "md" &&
                "h-[var(--button-icon-size-md)] w-[var(--button-icon-size-md)]",
              size === "lg" &&
                "h-[var(--button-icon-size-lg)] w-[var(--button-icon-size-lg)]",
              size === "xl" &&
                "h-[var(--button-icon-size-xl)] w-[var(--button-icon-size-xl)]"
            )}
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {leftIcon && !loading && (
          <span
            className={cn(
              "mr-[var(--button-icon-gap)]",
              size === "sm" &&
                "[&>svg]:h-[var(--button-icon-size-sm)] [&>svg]:w-[var(--button-icon-size-sm)]",
              size === "md" &&
                "[&>svg]:h-[var(--button-icon-size-md)] [&>svg]:w-[var(--button-icon-size-md)]",
              size === "lg" &&
                "[&>svg]:h-[var(--button-icon-size-lg)] [&>svg]:w-[var(--button-icon-size-lg)]",
              size === "xl" &&
                "[&>svg]:h-[var(--button-icon-size-xl)] [&>svg]:w-[var(--button-icon-size-xl)]"
            )}
          >
            {leftIcon}
          </span>
        )}

        {children}

        {rightIcon && (
          <span
            className={cn(
              "ml-[var(--button-icon-gap)]",
              size === "sm" &&
                "[&>svg]:h-[var(--button-icon-size-sm)] [&>svg]:w-[var(--button-icon-size-sm)]",
              size === "md" &&
                "[&>svg]:h-[var(--button-icon-size-md)] [&>svg]:w-[var(--button-icon-size-md)]",
              size === "lg" &&
                "[&>svg]:h-[var(--button-icon-size-lg)] [&>svg]:w-[var(--button-icon-size-lg)]",
              size === "xl" &&
                "[&>svg]:h-[var(--button-icon-size-xl)] [&>svg]:w-[var(--button-icon-size-xl)]"
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

export { Button, buttonVariants };
