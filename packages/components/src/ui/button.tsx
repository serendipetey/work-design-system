import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "../Button/button.css";

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
  // Base button styles with UNIFIED focus states
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-150 ease-in-out cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-[1px]",
    // UNIFIED FOCUS STYLES - Override all variants with !important and fix border-radius
    "focus-visible:outline-none",
    "focus-visible:!bg-[#ff9900]", // Direct hex value for orange background
    "focus-visible:!text-[#0e3a6c]", // Direct hex value for navy text
    "focus-visible:!border-t-0 focus-visible:!border-l-0 focus-visible:!border-r-0", // Remove top, left, right borders
    "focus-visible:!border-b-[3px] focus-visible:!border-b-[#0e3a6c]", // Thick navy bottom border
    "focus-visible:!rounded-t-md focus-visible:!rounded-b-none", // Keep top radius, remove bottom radius
    "focus-visible:!shadow-none", // Remove any box shadows
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary Button - removed focus-visible classes since they're now in base
        primary: [
          "bg-primary text-primary-foreground",
          "border border-primary",
          "hover:bg-primary/90",
        ].join(" "),

        // Outline Button - removed focus-visible classes
        outline: [
          "bg-transparent text-primary",
          "border border-primary",
          "hover:bg-primary hover:text-primary-foreground",
        ].join(" "),

        // CTA Button - removed focus-visible classes
        cta: [
          "bg-cta text-cta-foreground",
          "border border-cta",
          "hover:bg-cta/90",
        ].join(" "),

        // Success Button - removed focus-visible classes
        success: [
          "bg-success text-success-foreground",
          "border border-success",
          "hover:bg-success/90",
        ].join(" "),

        // Warning Button - removed focus-visible classes
        warning: [
          "bg-warning text-warning-foreground",
          "border border-warning",
          "hover:bg-warning/90",
        ].join(" "),

        // Destructive Button - removed focus-visible classes
        destructive: [
          "bg-destructive text-destructive-foreground",
          "border border-destructive",
          "hover:bg-destructive/90",
        ].join(" "),

        // Ghost Button - removed focus-visible classes
        ghost: [
          "text-primary",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
        xl: "h-12 px-8 text-base",
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
          <span className="inline-flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="inline-flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
