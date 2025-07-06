import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/input.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses CSS custom properties from the design token system
// with reliable fallback values for maximum compatibility and maintainability.
// Pattern: var(--design-token-name, fallback-value)
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
// 🎯 IMPORT CENTRALIZED FORM UTILITIES
import { helperVariants, labelVariants, getHelperContent, getHelperVariant, getFormFieldAria, } from "./form";
// Spinner component for loading state
const Spinner = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "animate-spin", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", className: "opacity-25" }), _jsx("path", { fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", className: "opacity-75" })] }));
// 🎯 OPTIMAL: Design Tokens with Robust Fallbacks
const inputStyles = {
    // Base styles using design tokens with reliable fallbacks
    base: {
        // Layout & Structure - FIXED: Added proper responsive width constraints
        display: "flex",
        width: "100%",
        maxWidth: "100%", // 🔧 FIX: Prevent overflow beyond container
        minWidth: "0", // 🔧 FIX: Allow shrinking in flex/grid containers
        boxSizing: "border-box", // 🔧 FIX: Include padding/border in width calculations
        border: "1px solid var(--color-border, #d1d5db)",
        borderRadius: "var(--input-border-radius, 6px)",
        backgroundColor: "var(--input-bg, #ffffff)",
        // Typography - tokens first, robust fallbacks
        fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
        fontSize: "var(--font-size-base, 16px)",
        lineHeight: "var(--line-height-normal, 1.5)",
        color: "var(--color-input-text, #374151)",
        // Transitions
        transition: "var(--input-transition, all 200ms ease-in-out)",
        // States
        outline: "none",
    },
    // Variant styles - tokens with fallbacks
    variants: {
        default: {
            borderColor: "var(--color-border, #d1d5db)",
        },
        error: {
            borderColor: "var(--color-border-error, #dc2626)",
        },
        success: {
            borderColor: "var(--color-border-success, #059669)",
        },
        warning: {
            borderColor: "var(--color-border-warning, #d97706)",
        },
    },
    // Size styles - tokens with fallbacks
    sizes: {
        sm: {
            height: "var(--input-height-sm, 32px)",
            paddingLeft: "var(--input-padding-x-sm, 8px)",
            paddingRight: "var(--input-padding-x-sm, 8px)",
            fontSize: "var(--font-size-sm, 14px)",
        },
        md: {
            height: "var(--input-height-md, 48px)",
            paddingLeft: "var(--input-padding-x-md, 16px)",
            paddingRight: "var(--input-padding-x-md, 16px)",
            fontSize: "var(--font-size-base, 16px)",
        },
        lg: {
            height: "var(--input-height-lg, 56px)",
            paddingLeft: "var(--input-padding-x-lg, 20px)",
            paddingRight: "var(--input-padding-x-lg, 20px)",
            fontSize: "var(--font-size-lg, 18px)",
        },
        xl: {
            height: "var(--input-height-xl, 64px)",
            paddingLeft: "var(--input-padding-x-xl, 24px)",
            paddingRight: "var(--input-padding-x-xl, 24px)",
            fontSize: "var(--font-size-xl, 20px)",
        },
    },
    // State styles - tokens with fallbacks
    states: {
        disabled: {
            cursor: "not-allowed",
            opacity: "var(--opacity-disabled, 0.5)",
            backgroundColor: "var(--color-disabled, #f3f4f6)",
        },
        loading: {
            paddingRight: "2.5rem", // Make room for spinner
        },
    },
};
// Label styles - tokens with fallbacks
const labelStyles = {
    base: {
        display: "block",
        fontSize: "var(--font-size-base, 16px)",
        fontWeight: "var(--font-weight-medium, 500)",
        color: "var(--color-input-label, #1e40af)",
        fontFamily: "var(--font-family-sans, 'Poppins', sans-serif)",
    },
    states: {
        disabled: {
            color: "var(--color-disabled-text, #6b7280)",
        },
    },
};
// 🎯 CVA for className-based utilities (minimal usage)
const inputVariants = cva(
// Base classes for layout/structure only - REMOVED problematic selectors
"flex w-full transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400", {
    variants: {
        variant: {
            default: "",
            error: "",
            success: "",
            warning: "",
            // Keep empty - styles come from CSS custom properties
        },
        size: {
            sm: "",
            md: "",
            lg: "",
            xl: "",
            // Keep empty - styles come from CSS custom properties
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
// 🎯 OPTIMAL: Design Tokens with Fallbacks for Focus Styles
const injectFocusStyles = (variant) => {
    const focusStyleId = `input-focus-${variant}`;
    // Remove existing focus styles
    const existingStyle = document.getElementById(focusStyleId);
    if (existingStyle)
        existingStyle.remove();
    // Create new focus styles
    const style = document.createElement("style");
    style.id = focusStyleId;
    let shadowToken;
    switch (variant) {
        case "error":
            shadowToken =
                "var(--input-focus-shadow-error, 0 0 0 3px rgba(235, 0, 0, 0.6))";
            break;
        case "success":
            shadowToken =
                "var(--input-focus-shadow-success, 0 0 0 3px rgba(0, 125, 133, 0.6))";
            break;
        case "warning":
            shadowToken =
                "var(--input-focus-shadow-warning, 0 0 0 3px rgba(183, 91, 0, 0.8))";
            break;
        default:
            shadowToken =
                "var(--input-focus-shadow-default, 0 0 0 3px rgba(255, 153, 0, 0.8))";
    }
    style.textContent = `
    .input-${variant}:focus {
      box-shadow: ${shadowToken};
    }
  `;
    document.head.appendChild(style);
};
// 🎯 Main Component Implementation
const Input = React.forwardRef(({ className, type = "text", variant = "default", size = "md", 
// Label props
label, labelState, hideLabel = false, 
// Styling
containerClassName, labelClassName, helperClassName, style, 
// Content
leftIcon, rightIcon, leftText, rightText, loading = false, clearable = false, onClear, 
// Validation
hintText, error, success, warning, 
// State
disabled = false, ...props }, ref) => {
    const elementRef = React.useRef(null);
    const inputId = React.useId();
    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current);
    // Inject focus styles on mount
    React.useEffect(() => {
        if (elementRef.current && variant) {
            injectFocusStyles(variant);
            elementRef.current.classList.add(`input-${variant}`);
        }
    }, [variant]);
    // 🎯 Determine final variant based on validation state
    const finalVariant = error
        ? "error"
        : success
            ? "success"
            : warning
                ? "warning"
                : variant;
    // 🎯 Combine styles: Base + Variant + Size + State + Custom
    const combinedStyles = {
        ...inputStyles.base,
        ...(finalVariant && inputStyles.variants[finalVariant]
            ? inputStyles.variants[finalVariant]
            : {}),
        ...(size && inputStyles.sizes[size] ? inputStyles.sizes[size] : {}),
        ...(disabled ? inputStyles.states.disabled : {}),
        ...(loading ? inputStyles.states.loading : {}),
        ...style, // Custom overrides
    };
    // Build final className
    const finalClassName = cn(inputVariants({ variant: finalVariant, size }), className);
    // Helper text logic
    const displayHelperText = error || success || warning;
    // 🎯 USE CENTRALIZED FORM UTILITIES
    const helperContent = getHelperContent(error, success, warning);
    const helperVariant = getHelperVariant(error, success, warning);
    const formFieldAria = getFormFieldAria(inputId, error, success, warning, hintText);
    const showLabel = !hideLabel;
    const showHintText = !!hintText;
    // IDs for accessibility
    const helperTextId = displayHelperText ? `${inputId}-helper` : undefined;
    return (_jsxs("div", { className: cn("w-full", containerClassName), children: [showLabel && label && (_jsxs("label", { htmlFor: inputId, className: cn(labelVariants(), labelClassName), style: {
                    ...labelStyles.base,
                    ...(disabled ? labelStyles.states.disabled : {}),
                }, children: [_jsx("span", { style: { color: "var(--color-input-label, #1e40af)" }, children: label }), labelState === "required" && (_jsxs("span", { style: { color: "var(--color-input-label-required, #a30134)" }, children: [" ", "*"] })), labelState === "optional" && (_jsxs("span", { style: {
                            color: "var(--color-text-muted, #6b7280)",
                            fontWeight: "var(--font-weight-regular, 400)",
                        }, children: [" ", "(Optional)"] }))] })), showHintText && (_jsx("p", { className: cn(helperVariants({ variant: "muted" })), id: `${inputId}-description`, children: hintText })), _jsxs("div", { className: "relative", children: [(leftIcon || leftText) && (_jsxs("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center", style: { color: "var(--color-text-muted, #6b7280)" }, children: [leftIcon, leftText && _jsx("span", { className: "text-sm", children: leftText })] })), _jsx("input", { ...props, ref: elementRef, id: inputId, type: type, disabled: disabled, className: finalClassName, ...formFieldAria, style: {
                            ...combinedStyles,
                            paddingLeft: leftIcon || leftText ? "2.5rem" : combinedStyles.paddingLeft,
                            paddingRight: rightIcon || rightText || loading || clearable
                                ? "2.5rem"
                                : combinedStyles.paddingRight,
                        } }), _jsxs("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2", children: [loading && (_jsx("div", { style: { color: "var(--color-text-muted, #6b7280)" }, children: _jsx(Spinner, {}) })), clearable && props.value && !disabled && !loading && (_jsx("button", { type: "button", onClick: onClear, className: "hover:text-gray-700 focus:outline-none", style: { color: "var(--color-text-muted, #6b7280)" }, "aria-label": "Clear input", children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }) })), (rightIcon || rightText) && !loading && !clearable && (_jsxs("div", { className: "flex items-center", style: { color: "var(--color-text-muted, #6b7280)" }, children: [rightText && _jsx("span", { className: "text-sm", children: rightText }), rightIcon] }))] })] }), displayHelperText && helperContent && (_jsx("p", { id: helperTextId, className: cn(helperVariants({ variant: helperVariant }), helperClassName), children: helperContent }))] }));
});
Input.displayName = "Input";
// 🎯 Named Exports for compatibility with existing imports
export { Input, inputVariants, helperVariants, labelVariants };
export default Input;
