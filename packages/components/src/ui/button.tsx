import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
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

const buttonVariants = cva(
  // Base button styles
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-150 ease-in-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-[1px]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary Button - using Tailwind classes that map to our custom properties
        primary: [
          "bg-primary text-primary-foreground",
          "border border-primary",
          "hover:bg-primary/90",
          "focus-visible:ring-primary/20",
        ].join(" "),

        // Outline Button
        outline: [
          "bg-transparent text-primary",
          "border border-primary",
          "hover:bg-primary hover:text-primary-foreground",
          "focus-visible:ring-primary/20",
        ].join(" "),

        // CTA Button
        cta: [
          "bg-cta text-cta-foreground",
          "border border-cta",
          "hover:bg-cta/90",
          "focus-visible:ring-cta/20",
        ].join(" "),

        // Success Button
        success: [
          "bg-success text-success-foreground",
          "border border-success",
          "hover:bg-success/90",
          "focus-visible:ring-success/20",
        ].join(" "),

        // Warning Button
        warning: [
          "bg-warning text-warning-foreground",
          "border border-warning",
          "hover:bg-warning/90",
          "focus-visible:ring-warning/20",
        ].join(" "),

        // Destructive Button
        destructive: [
          "bg-destructive text-destructive-foreground",
          "border border-destructive",
          "hover:bg-destructive/90",
          "focus-visible:ring-destructive/20",
        ].join(" "),

        // Ghost Button - minimal styling
        ghost: [
          "bg-transparent text-foreground",
          "border border-transparent",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-accent/20",
        ].join(" "),
      },
      size: {
        // Using your exact design token sizes
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
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Spinner />}
        {!loading && leftIcon && (
          <span className="mr-2 inline-flex shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2 inline-flex shrink-0">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
