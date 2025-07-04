import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/components/src/ui/input.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses CSS custom properties from the design token system
// with reliable fallback values for maximum compatibility and maintainability.
// Pattern: var(--design-token-name, fallback-value)
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
// Spinner component for loading state
const Spinner = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "animate-spin", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", className: "opacity-25" }), _jsx("path", { fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", className: "opacity-75" })] }));
// 🎯 OPTIMAL: Design Tokens with Robust Fallbacks
const inputStyles = {
    // Base styles using design tokens with reliable fallbacks
    base: {
        // Layout & Structure
        display: "flex",
        width: "100%",
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
        fontWeight: "var(--font-weight-semibold, 600)",
        marginBottom: "var(--spacing-2, 8px)",
        color: "var(--color-input-label, #1e40af)",
        fontFamily: "var(--font-family-sans, 'Poppins', sans-serif)",
    },
    states: {
        disabled: {
            color: "var(--color-disabled-text, #6b7280)",
        },
    },
};
// Helper text styles - tokens with fallbacks
const helperStyles = {
    base: {
        marginTop: "var(--spacing-1, 4px)",
        fontSize: "var(--font-size-sm, 14px)",
        lineHeight: "var(--line-height-sm, 1.4)",
        fontFamily: "var(--font-family-sans, 'Poppins', sans-serif)",
    },
    variants: {
        default: {
            color: "var(--color-text-secondary, #4b5563)",
        },
        error: {
            color: "var(--color-text-error, #dc2626)",
        },
        success: {
            color: "var(--color-text-success, #059669)",
        },
        warning: {
            color: "var(--color-text-warning, #d97706)",
        },
        muted: {
            color: "var(--color-text-muted, #6b7280)",
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
    // Create new focus styles with tokens and fallbacks
    const style = document.createElement("style");
    style.id = focusStyleId;
    const focusStyles = {
        default: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-focus-500, #ff9900);
        outline-offset: 2px;
        border-color: var(--color-border-focus, #3b82f6);
      }
    `,
        error: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-error-500, #dc2626);
        outline-offset: 2px;
        border-color: var(--color-border-error, #dc2626);
      }
    `,
        success: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-success-500, #059669);
        outline-offset: 2px;
        border-color: var(--color-border-success, #059669);
      }
    `,
        warning: `
      .input-${variant}:focus {
        outline: 2px solid var(--color-warning-500, #d97706);
        outline-offset: 2px;
        border-color: var(--color-border-warning, #d97706);
      }
    `,
    };
    style.textContent = focusStyles[variant] || focusStyles.default;
    document.head.appendChild(style);
};
// CVA exports for compatibility
export const labelVariants = cva("text-sm font-medium text-gray-900", {
    variants: {
        state: {
            default: "",
            disabled: "text-gray-500",
        },
    },
    defaultVariants: {
        state: "default",
    },
});
export const helperVariants = cva("text-sm", {
    variants: {
        variant: {
            default: "text-gray-600",
            error: "text-red-600",
            success: "text-green-600",
            warning: "text-orange-600",
            muted: "text-gray-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
// 🎯 FIXED: Main Component with Proper Error Handling
const Input = React.forwardRef(({ className, variant = "default", size = "md", label, labelState = "default", showLabel = true, hintText, showHintText = true, helperText, leftIcon, rightIcon, leftText, rightText, error, success, warning, loading = false, containerClassName, labelClassName, inputClassName, helperClassName, clearable = false, onClear, disabled, style, ...props }, ref) => {
    const elementRef = React.useRef(null);
    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current);
    // Determine final variant based on states
    const finalVariant = error
        ? "error"
        : success
            ? "success"
            : warning
                ? "warning"
                : variant;
    // Inject focus styles on mount
    React.useEffect(() => {
        if (elementRef.current && finalVariant) {
            injectFocusStyles(finalVariant);
            elementRef.current.classList.add(`input-${finalVariant}`);
        }
    }, [finalVariant]);
    // 🎯 FIXED: Combine styles with proper null checking
    const combinedStyles = {
        ...inputStyles.base,
        ...(finalVariant &&
            inputStyles.variants[finalVariant]
            ? inputStyles.variants[finalVariant]
            : {}),
        ...(size && inputStyles.sizes[size]
            ? inputStyles.sizes[size]
            : {}),
        ...(disabled ? inputStyles.states.disabled : {}),
        ...(loading ? inputStyles.states.loading : {}),
        ...style, // Allow style overrides
    };
    // Determine helper text and variant
    const displayHelperText = error
        ? typeof error === "string"
            ? error
            : "Invalid input"
        : success
            ? typeof success === "string"
                ? success
                : "Valid input"
            : warning
                ? typeof warning === "string"
                    ? warning
                    : "Warning"
                : helperText;
    const helperVariant = error
        ? "error"
        : success
            ? "success"
            : warning
                ? "warning"
                : "default";
    // Build final className
    const finalClassName = cn(inputVariants({ variant, size }), inputClassName, className);
    // Generate unique IDs for accessibility
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = displayHelperText ? `${inputId}-helper` : undefined;
    return (_jsxs("div", { className: cn("w-full", containerClassName), children: [showLabel && label && (_jsxs("label", { htmlFor: inputId, className: cn(labelClassName), style: {
                    ...labelStyles.base,
                    ...(disabled ? labelStyles.states.disabled : {}),
                }, children: [_jsx("span", { style: { color: "var(--color-input-label, #1e40af)" }, children: label }), labelState === "required" && (_jsxs("span", { style: { color: "var(--color-text-error, #dc2626)" }, children: [" ", "*"] })), labelState === "optional" && (_jsxs("span", { style: { color: "var(--color-text-muted, #6b7280)" }, children: [" ", "(Optional)"] }))] })), showHintText && hintText && !displayHelperText && (_jsx("p", { style: {
                    ...helperStyles.base,
                    ...helperStyles.variants.muted,
                    marginTop: showLabel && label ? "var(--spacing-1, 4px)" : "0",
                    marginBottom: "var(--spacing-1, 4px)",
                }, children: hintText })), _jsxs("div", { className: "relative", children: [(leftIcon || leftText) && (_jsxs("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center", style: { color: "var(--color-text-muted, #6b7280)" }, children: [leftIcon, leftText && _jsx("span", { className: "text-sm", children: leftText })] })), _jsx("input", { ...props, ref: elementRef, id: inputId, disabled: disabled, className: finalClassName, "aria-invalid": error ? "true" : undefined, "aria-describedby": helperTextId, style: {
                            ...combinedStyles,
                            paddingLeft: leftIcon || leftText ? "2.5rem" : combinedStyles.paddingLeft,
                            paddingRight: rightIcon || rightText || loading || clearable
                                ? "2.5rem"
                                : combinedStyles.paddingRight,
                        } }), _jsxs("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2", children: [loading && (_jsx("div", { style: { color: "var(--color-text-muted, #6b7280)" }, children: _jsx(Spinner, {}) })), clearable && props.value && !disabled && !loading && (_jsx("button", { type: "button", onClick: onClear, className: "hover:text-gray-700 focus:outline-none", style: { color: "var(--color-text-muted, #6b7280)" }, "aria-label": "Clear input", children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }) })), (rightIcon || rightText) && !loading && !clearable && (_jsxs("div", { className: "flex items-center", style: { color: "var(--color-text-muted, #6b7280)" }, children: [rightText && _jsx("span", { className: "text-sm", children: rightText }), rightIcon] }))] })] }), displayHelperText && (_jsx("p", { id: helperTextId, className: cn(helperClassName), style: {
                    ...helperStyles.base,
                    ...helperStyles.variants[helperVariant],
                }, children: displayHelperText }))] }));
});
Input.displayName = "Input";
// 🎯 Named Exports for compatibility with existing imports
export { Input, inputVariants };
export default Input;
