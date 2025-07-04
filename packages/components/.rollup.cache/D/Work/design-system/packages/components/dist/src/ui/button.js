import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
// 🎯 Design Token Style Application
const getButtonStyles = (variant, size) => {
    const baseStyles = {
        fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
        fontWeight: "var(--button-font-weight, 500)",
        borderRadius: "var(--button-border-radius, var(--radius-sm, 6px))",
        borderWidth: "var(--button-border-width, 1px)",
        borderStyle: "solid",
        cursor: "pointer",
        transition: "var(--button-transition, all 150ms ease-in-out)",
    };
    const sizeStyles = {
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
    const variantStyles = {
        primary: {
            backgroundColor: "var(--button-primary-bg, var(--color-navy-500, #0e3a6c))",
            color: "var(--button-primary-text, var(--color-white, #ffffff))",
            borderColor: "var(--button-primary-border, var(--color-navy-500, #0e3a6c))",
        },
        outline: {
            backgroundColor: "var(--button-outline-bg, transparent)",
            color: "var(--button-outline-text, var(--color-navy-500, #0e3a6c))",
            borderColor: "var(--button-outline-border, var(--color-navy-500, #0e3a6c))",
        },
        cta: {
            backgroundColor: "var(--button-cta-bg, var(--color-red-500, #dc2626))",
            color: "var(--button-cta-text, var(--color-white, #ffffff))",
            borderColor: "var(--button-cta-border, var(--color-red-500, #dc2626))",
        },
        success: {
            backgroundColor: "var(--button-success-bg, var(--color-success-500, #007d85))",
            color: "var(--button-success-text, var(--color-white, #ffffff))",
            borderColor: "var(--button-success-border, var(--color-success-500, #007d85))",
        },
        warning: {
            backgroundColor: "var(--button-warning-bg, var(--color-warning-500, #b75b00))",
            color: "var(--button-warning-text, var(--color-white, #ffffff))",
            borderColor: "var(--button-warning-border, var(--color-warning-500, #b75b00))",
        },
        destructive: {
            backgroundColor: "var(--button-destructive-bg, var(--color-destructive-500, #d92b2b))",
            color: "var(--button-destructive-text, var(--color-white, #ffffff))",
            borderColor: "var(--button-destructive-border, var(--color-destructive-500, #d92b2b))",
        },
        ghost: {
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
// CVA for basic structure and layout
const buttonBaseClasses = cva("inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", {
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
});
// 🎯 Enhanced Hover and Focus CSS Injection
const createHoverCSS = () => {
    if (document.getElementById("button-interactive-styles"))
        return;
    const style = document.createElement("style");
    style.id = "button-interactive-styles";
    style.textContent = `
    /* 🎯 HOVER STATES - Color transitions using design tokens */
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
  `;
    document.head.appendChild(style);
};
// 🎯 FIXED: Larger, more visible spinner component
const Spinner = () => (_jsx("div", { className: "w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" }));
const Button = React.forwardRef(({ className, variant = "primary", size = "md", asChild = false, loading = false, leftIcon, rightIcon, children, disabled, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    // Inject hover and focus CSS on first render
    React.useEffect(() => {
        createHoverCSS();
    }, []);
    // Combine styles: design token styles + user styles
    const combinedStyles = {
        ...getButtonStyles(variant || "primary", size || "md"),
        ...style, // User styles take precedence
    };
    return (_jsxs(Comp, { className: cn(buttonBaseClasses({ variant, size }), "design-system-button", className), style: combinedStyles, "data-variant": variant, "data-size": size, ref: ref, disabled: isDisabled, ...props, children: [loading && (_jsx("span", { className: "mr-2", children: _jsx(Spinner, {}) })), !loading && leftIcon && (_jsx("span", { className: "mr-2 inline-flex items-center justify-center", children: leftIcon })), children, !loading && rightIcon && (_jsx("span", { className: "ml-2 inline-flex items-center justify-center", children: rightIcon }))] }));
});
Button.displayName = "Button";
export { Button, buttonBaseClasses as buttonVariants };
