import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
// Spinner component for loading state
const Spinner = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "animate-spin", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", className: "opacity-25" }), _jsx("path", { fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", className: "opacity-75" })] }));
const buttonVariants = cva(
// Base button styles - only use classes that work reliably
[
    "inline-flex items-center justify-center whitespace-nowrap font-medium",
    "transition-all duration-150 ease-in-out cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "border", // Basic border
], {
    variants: {
        variant: {
            // Use simple string identifiers - we'll apply tokens via style prop
            primary: "btn-primary",
            outline: "btn-outline",
            cta: "btn-cta",
            success: "btn-success",
            warning: "btn-warning",
            destructive: "btn-destructive",
            ghost: "btn-ghost",
        },
        size: {
            sm: "btn-sm text-sm",
            md: "btn-md text-sm",
            lg: "btn-lg text-base",
            xl: "btn-xl text-lg",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});
// Design token style mappings
const getVariantStyles = (variant) => {
    switch (variant) {
        case "primary":
            return {
                backgroundColor: "var(--button-primary-bg, #0e3a6c)",
                color: "var(--button-primary-text, white)",
                borderColor: "var(--button-primary-border, transparent)",
                borderRadius: "var(--button-border-radius, 6px)",
            };
        case "outline":
            return {
                backgroundColor: "var(--button-outline-bg, transparent)",
                color: "var(--button-outline-text, #0e3a6c)",
                borderColor: "var(--button-outline-border, #0e3a6c)",
                borderRadius: "var(--button-border-radius, 6px)",
            };
        case "cta":
            return {
                backgroundColor: "var(--button-cta-bg, #ff6b35)",
                color: "var(--button-cta-text, white)",
                borderColor: "var(--button-cta-border, transparent)",
                borderRadius: "var(--button-border-radius, 6px)",
            };
        case "success":
            return {
                backgroundColor: "var(--button-success-bg, #007d85)",
                color: "var(--button-success-text, white)",
                borderColor: "var(--button-success-border, transparent)",
                borderRadius: "var(--button-border-radius, 6px)",
            };
        case "warning":
            return {
                backgroundColor: "var(--button-warning-bg, #b75b00)",
                color: "var(--button-warning-text, white)",
                borderColor: "var(--button-warning-border, transparent)",
                borderRadius: "var(--button-border-radius, 6px)",
            };
        case "destructive":
            return {
                backgroundColor: "var(--button-destructive-bg, #dc2626)",
                color: "var(--button-destructive-text, white)",
                borderColor: "var(--button-destructive-border, transparent)",
                borderRadius: "var(--button-border-radius, 6px)",
            };
        case "ghost":
            return {
                backgroundColor: "transparent",
                color: "var(--button-outline-text, #0e3a6c)",
                borderColor: "transparent",
                borderRadius: "var(--button-border-radius, 6px)",
            };
        default:
            return {};
    }
};
const getSizeStyles = (size) => {
    switch (size) {
        case "sm":
            return {
                height: "var(--button-height-sm, 32px)",
                paddingLeft: "var(--button-padding-x-sm, 12px)",
                paddingRight: "var(--button-padding-x-sm, 12px)",
            };
        case "md":
            return {
                height: "var(--button-height-md, 40px)",
                paddingLeft: "var(--button-padding-x-md, 16px)",
                paddingRight: "var(--button-padding-x-md, 16px)",
            };
        case "lg":
            return {
                height: "var(--button-height-lg, 48px)",
                paddingLeft: "var(--button-padding-x-lg, 24px)",
                paddingRight: "var(--button-padding-x-lg, 24px)",
            };
        case "xl":
            return {
                height: "var(--button-height-xl, 56px)",
                paddingLeft: "var(--button-padding-x-xl, 32px)",
                paddingRight: "var(--button-padding-x-xl, 32px)",
            };
        default:
            return {};
    }
};
const Button = React.forwardRef(({ className, variant = "primary", size = "md", asChild = false, loading = false, leftIcon, rightIcon, children, disabled, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    // Combine design token styles with any custom styles
    const combinedStyle = {
        ...getVariantStyles(variant || "primary"),
        ...getSizeStyles(size || "md"),
        ...style,
    };
    return (_jsxs(Comp, { className: cn(buttonVariants({ variant, size, className })), style: combinedStyle, ref: ref, disabled: isDisabled, ...props, children: [loading && _jsx(Spinner, {}), !loading && leftIcon && (_jsx("span", { className: "inline-flex items-center justify-center mr-2", children: leftIcon })), children, !loading && rightIcon && (_jsx("span", { className: "inline-flex items-center justify-center ml-2", children: rightIcon }))] }));
});
Button.displayName = "Button";
export { Button, buttonVariants };
