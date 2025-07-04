import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

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
  // Base button styles with hover states
  [
    "inline-flex items-center justify-center whitespace-nowrap", // ← REMOVED font-medium
    "transition-all duration-150 ease-in-out cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "border border-transparent", // Default transparent border
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--button-primary-bg,#0e3a6c)] text-[var(--button-primary-text,white)]",
          "hover:bg-[var(--button-primary-bg-hover,#0a2d54)]",
          "active:bg-[var(--button-primary-bg-focus,#07203c)] active:transform active:scale-95",
        ],
        outline: [
          "bg-[var(--button-outline-bg,transparent)] text-[var(--button-outline-text,#0e3a6c)]",
          "border-[var(--button-outline-border,#0e3a6c)]",
          "hover:bg-[var(--button-outline-bg-hover,#f0f3f7)]",
          "active:bg-[var(--button-outline-bg-focus,#e3e9ef)] active:transform active:scale-95",
        ],
        cta: [
          "bg-[var(--button-cta-bg,#ff6b35)] text-[var(--button-cta-text,white)]",
          "hover:bg-[var(--button-cta-bg-hover,#ff5722)]",
          "active:bg-[var(--button-cta-bg-focus,#e64a19)] active:transform active:scale-95",
        ],
        success: [
          "bg-[var(--button-success-bg,#007d85)] text-[var(--button-success-text,white)]",
          "hover:bg-[var(--button-success-bg-hover,#006b73)]",
          "active:bg-[var(--button-success-bg-focus,#005961)] active:transform active:scale-95",
        ],
        warning: [
          "bg-[var(--button-warning-bg,#b75b00)] text-[var(--button-warning-text,white)]",
          "hover:bg-[var(--button-warning-bg-hover,#a04f00)]",
          "active:bg-[var(--button-warning-bg-focus,#8a4400)] active:transform active:scale-95",
        ],
        destructive: [
          "bg-[var(--button-destructive-bg,#dc2626)] text-[var(--button-destructive-text,white)]",
          "hover:bg-[var(--button-destructive-bg-hover,#b91c1c)]",
          "active:bg-[var(--button-destructive-bg-focus,#991b1b)] active:transform active:scale-95",
        ],
        ghost: [
          "bg-transparent text-[var(--button-outline-text,#0e3a6c)]",
          "hover:bg-[var(--button-ghost-bg-hover,#f0f3f7)]",
          "active:bg-[var(--button-ghost-bg-focus,#e3e9ef)] active:transform active:scale-95",
        ],
      },
      size: {
        sm: ["h-8 px-3 text-xs", "rounded-[var(--button-border-radius,6px)]"],
        md: ["h-10 px-4 text-sm", "rounded-[var(--button-border-radius,6px)]"],
        lg: [
          "h-12 px-6 text-base",
          "rounded-[var(--button-border-radius,6px)]",
        ],
        xl: ["h-14 px-8 text-lg", "rounded-[var(--button-border-radius,6px)]"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Typography styles using design tokens
const getTypographyStyles = () => {
  return {
    fontFamily:
      "var(--button-font-family, 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    fontWeight: "var(--button-font-weight, 500)", // ← FIXED: 600 → 500 (medium instead of semibold)
    letterSpacing: "var(--button-letter-spacing, 0.025em)",
    // Removed textTransform to fix TypeScript error - handled via CSS classes instead
  };
};

// Size-specific font sizes to match your design system exactly
const getSizeFontStyles = (size: string) => {
  switch (size) {
    case "sm":
      return {
        fontSize: "var(--button-font-size-sm, 0.75rem)", // 12px
        lineHeight: "var(--button-line-height, 1.5)",
      };
    case "md":
      return {
        fontSize: "var(--button-font-size-md, 0.875rem)", // 14px - matching your design
        lineHeight: "var(--button-line-height, 1.5)",
      };
    case "lg":
      return {
        fontSize: "var(--button-font-size-lg, 1rem)", // 16px
        lineHeight: "var(--button-line-height, 1.5)",
      };
    case "xl":
      return {
        fontSize: "var(--button-font-size-xl, 1.125rem)", // 18px
        lineHeight: "var(--button-line-height, 1.5)",
      };
    default:
      return {
        fontSize: "var(--button-font-size, 0.875rem)", // Default to 14px
        lineHeight: "var(--button-line-height, 1.5)",
      };
  }
};

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

    // Combine all styles: typography + size-specific fonts + custom styles
    const combinedStyle = {
      ...getTypographyStyles(),
      ...getSizeFontStyles(size || "md"),
      ...style, // User styles take precedence
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={combinedStyle}
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

export { Button, buttonVariants };
