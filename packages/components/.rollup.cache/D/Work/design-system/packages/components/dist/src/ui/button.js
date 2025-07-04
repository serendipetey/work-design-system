import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/button.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// Updated with correct unified focus styles
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
// Helper function to get CSS custom property with fallback
const getCSSVar = (varName, fallback) => {
    if (typeof window !== "undefined" &&
        typeof window.getComputedStyle === "function") {
        try {
            const computedValue = getComputedStyle(document.documentElement)
                .getPropertyValue(varName)
                .trim();
            return computedValue || fallback;
        }
        catch {
            return fallback;
        }
    }
    return fallback;
};
// Base classes using CVA for Tailwind compatibility
const buttonBaseClasses = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", {
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
// Get button styles based on variant and size
const getButtonStyles = (variant, size) => {
    const styles = {
        // Base styles
        fontFamily: getCSSVar("--font-family-sans", "system-ui, sans-serif"),
        fontWeight: getCSSVar("--font-weight-medium", "500"),
        border: "1px solid transparent",
        borderRadius: getCSSVar("--button-border-radius", getCSSVar("--radius-sm", "6px")),
        cursor: "pointer",
        transition: "all 200ms ease-in-out",
    };
    // Size styles
    switch (size) {
        case "sm":
            styles.height = getCSSVar("--button-height-sm", "32px");
            styles.paddingLeft = getCSSVar("--button-padding-x-sm", "12px");
            styles.paddingRight = getCSSVar("--button-padding-x-sm", "12px");
            styles.fontSize = getCSSVar("--font-size-sm", "14px");
            break;
        case "lg":
            styles.height = getCSSVar("--button-height-lg", "48px");
            styles.paddingLeft = getCSSVar("--button-padding-x-lg", "20px");
            styles.paddingRight = getCSSVar("--button-padding-x-lg", "20px");
            styles.fontSize = getCSSVar("--font-size-lg", "18px");
            break;
        case "xl":
            styles.height = getCSSVar("--button-height-xl", "56px");
            styles.paddingLeft = getCSSVar("--button-padding-x-xl", "24px");
            styles.paddingRight = getCSSVar("--button-padding-x-xl", "24px");
            styles.fontSize = getCSSVar("--font-size-xl", "20px");
            break;
        default: // md
            styles.height = getCSSVar("--button-height-md", "40px");
            styles.paddingLeft = getCSSVar("--button-padding-x-md", "16px");
            styles.paddingRight = getCSSVar("--button-padding-x-md", "16px");
            styles.fontSize = getCSSVar("--font-size-base", "16px");
    }
    // Variant styles
    switch (variant) {
        case "primary":
            styles.backgroundColor = getCSSVar("--button-primary-bg", getCSSVar("--color-navy-500", "#0e3a6c"));
            styles.color = getCSSVar("--button-primary-text", "#ffffff");
            styles.borderColor = getCSSVar("--button-primary-border", "transparent");
            break;
        case "outline":
            styles.backgroundColor = getCSSVar("--button-outline-bg", "transparent");
            styles.color = getCSSVar("--button-outline-text", getCSSVar("--color-navy-500", "#0e3a6c"));
            styles.borderColor = getCSSVar("--button-outline-border", getCSSVar("--color-navy-500", "#0e3a6c"));
            break;
        case "cta":
            styles.backgroundColor = getCSSVar("--button-cta-bg", getCSSVar("--color-red-500", "#a30134"));
            styles.color = getCSSVar("--button-cta-text", "#ffffff");
            styles.borderColor = getCSSVar("--button-cta-border", "transparent");
            break;
        case "success":
            styles.backgroundColor = getCSSVar("--button-success-bg", getCSSVar("--color-success-500", "#007d85"));
            styles.color = getCSSVar("--button-success-text", "#ffffff");
            styles.borderColor = getCSSVar("--button-success-border", "transparent");
            break;
        case "warning":
            styles.backgroundColor = getCSSVar("--button-warning-bg", getCSSVar("--color-warning-500", "#b75b00"));
            styles.color = getCSSVar("--button-warning-text", "#ffffff");
            styles.borderColor = getCSSVar("--button-warning-border", "transparent");
            break;
        case "destructive":
            styles.backgroundColor = getCSSVar("--button-destructive-bg", getCSSVar("--color-destructive-500", "#d92b2b"));
            styles.color = getCSSVar("--button-destructive-text", "#ffffff");
            styles.borderColor = getCSSVar("--button-destructive-border", "transparent");
            break;
        case "ghost":
            styles.backgroundColor = getCSSVar("--button-ghost-bg", "transparent");
            styles.color = getCSSVar("--button-ghost-text", getCSSVar("--color-navy-500", "#0e3a6c"));
            styles.borderColor = getCSSVar("--button-ghost-border", "transparent");
            break;
    }
    return styles;
};
// 🎯 UPDATED: Create CSS for hover and focus states with correct unified focus standard
const createHoverCSS = () => {
    if (typeof document === "undefined")
        return;
    // Check if styles already exist
    if (document.getElementById("button-hover-styles"))
        return;
    const style = document.createElement("style");
    style.id = "button-hover-styles";
    style.textContent = `
    /* Hover styles for all variants - using correct design token colors */
    .design-system-button[data-variant="primary"]:hover {
      background-color: var(--button-primary-bg-hover, var(--color-navy-600, #0a2d54)) !important;
    }
    .design-system-button[data-variant="outline"]:hover {
      background-color: var(--button-outline-bg-hover, var(--color-navy-500, #0e3a6c)) !important;
      color: var(--button-outline-text-hover, #ffffff) !important;
      border-color: var(--button-outline-border-hover, var(--color-navy-600, #0a2d54)) !important;
    }
    .design-system-button[data-variant="cta"]:hover {
      background-color: var(--button-cta-bg-hover, var(--color-red-600, #7a0125)) !important;
    }
    .design-system-button[data-variant="success"]:hover {
      background-color: var(--button-success-bg-hover, var(--color-success-600, #00646a)) !important;
    }
    .design-system-button[data-variant="warning"]:hover {
      background-color: var(--button-warning-bg-hover, var(--color-warning-600, #924900)) !important;
    }
    .design-system-button[data-variant="destructive"]:hover {
      background-color: var(--button-destructive-bg-hover, var(--color-destructive-600, #b12222)) !important;
    }
    .design-system-button[data-variant="ghost"]:hover {
      background-color: var(--button-ghost-bg-hover, var(--color-navy-100, #f0f3f7)) !important;
    }
    
    /* 🎯 UNIFIED FOCUS STYLES - Only for keyboard navigation */
    .design-system-button:focus-visible {
      /* Remove default outline */
      outline: none !important;
      
      /* Orange background with navy text - unified across all variants */
      background-color: var(--button-unified-focus-bg, var(--color-focus-500, #ff9900)) !important;
      color: var(--button-unified-focus-text, var(--color-navy-500, #0e3a6c)) !important;
      
      /* Thick navy bottom border */
      border-bottom: var(--button-unified-focus-border-width, 3px) solid var(--button-unified-focus-border, var(--color-navy-500, #0e3a6c)) !important;
      
      /* Flat bottom edge (no border-radius on bottom) */
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      
      /* Keep rounded top corners - use design system border radius token */
      border-top-left-radius: var(--button-border-radius, var(--radius-sm, 6px)) !important;
      border-top-right-radius: var(--button-border-radius, var(--radius-sm, 6px)) !important;
      
      /* Ensure icons and child elements also get navy color */
      * {
        color: var(--button-unified-focus-text, var(--color-navy-500, #0e3a6c)) !important;
      }
      
      /* Handle SVG icons specifically */
      svg {
        color: var(--button-unified-focus-text, var(--color-navy-500, #0e3a6c)) !important;
        fill: currentColor !important;
      }
    }
    
    /* 🎯 CLICK/ACTIVE STATES - Subtle press animation for mouse clicks */
    .design-system-button:active {
      transform: translateY(1px) !important;
      transition: transform 100ms ease-out !important;
    }
    
    /* Override focus for disabled buttons - prevent focus styling */
    .design-system-button:disabled:focus-visible {
      background-color: var(--color-disabled, #f3f4f6) !important;
      color: var(--color-disabled-text, #6b7280) !important;
      border-bottom: 1px solid var(--color-border, #d1d5db) !important;
      border-radius: var(--button-border-radius, var(--radius-sm, 6px)) !important;
      transform: none !important;
    }
  `;
    document.head.appendChild(style);
};
// Simple spinner component
const Spinner = () => (_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }));
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
