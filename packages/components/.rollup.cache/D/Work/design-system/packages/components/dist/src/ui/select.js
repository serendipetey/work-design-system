// packages/components/src/ui/select.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputVariants, helperVariants } from "./input"; // INHERIT FROM INPUT!
// Select Trigger uses INPUT variants (DRY!)
const selectTriggerVariants = cva([
    // Use input base classes
    "flex items-center justify-between cursor-pointer",
    // Only override what's different for select
    "[&>span]:line-clamp-1 [&>span]:text-left",
    // MINIMAL FIX: Keep focus ring visible when dropdown opens
    "data-[state=open]:ring-2 data-[state=open]:ring-[var(--color-border-focus)]",
], {
    variants: {
        variant: {
            default: "",
            error: "",
            success: "",
            warning: "",
        },
        size: {
            sm: "",
            md: "",
            lg: "",
            xl: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
// Simple dropdown content - uses existing tokens
const selectContentVariants = cva([
    "relative z-50 max-h-96 min-w-[8rem] overflow-hidden",
    "rounded-md border border-[var(--color-border)]",
    "bg-[var(--color-surface)] text-[var(--color-text-primary)]", // FIXED: Solid white background
    "shadow-[var(--select-content-shadow)]",
    // Standard Radix animations
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
]);
// Simple item styling - uses existing tokens
const selectItemVariants = cva([
    "relative flex w-full cursor-default select-none items-center",
    "rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
    "hover:bg-[var(--select-item-bg-hover)]",
    "focus:bg-[var(--color-accent)] focus:text-[var(--color-accent-foreground)]",
    "data-[state=checked]:bg-[var(--select-item-bg-selected)]",
    "data-[state=checked]:text-[var(--select-item-text-selected)]",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
]);
// Base Components
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
// Select Trigger - INHERITS INPUT STYLING
const SelectTrigger = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (_jsxs(SelectPrimitive.Trigger, { ref: ref, className: cn(
    // Use input variants as base!
    inputVariants({ variant, size }), 
    // Add select-specific overrides
    selectTriggerVariants({ variant, size }), className), ...props, children: [children, _jsx(SelectPrimitive.Icon, { asChild: true, children: _jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })] })));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
// Select Content with proper background
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (_jsx(SelectPrimitive.Portal, { children: _jsxs(SelectPrimitive.Content, { ref: ref, className: cn(selectContentVariants(), className), position: position, ...props, children: [_jsx(SelectPrimitive.ScrollUpButton, { className: "flex cursor-default items-center justify-center py-1", children: _jsx(ChevronUp, { className: "h-4 w-4" }) }), _jsx(SelectPrimitive.Viewport, { className: cn("p-1", position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"), children: children }), _jsx(SelectPrimitive.ScrollDownButton, { className: "flex cursor-default items-center justify-center py-1", children: _jsx(ChevronDown, { className: "h-4 w-4" }) })] }) })));
SelectContent.displayName = SelectPrimitive.Content.displayName;
// Select Item with proper check icon
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(SelectPrimitive.Item, { ref: ref, className: cn(selectItemVariants(), className), ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx(SelectPrimitive.ItemIndicator, { children: _jsx(Check, { className: "h-4 w-4" }) }) }), _jsx(SelectPrimitive.ItemText, { children: children })] })));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectField = React.forwardRef(({ className, variant, size, label, labelState = "default", showLabel = true, hintText, // ADDED: Hint text support
showHintText = true, // ADDED: Hint text control
helperText, error, success, warning, placeholder, value, onValueChange, defaultValue, children, required, disabled, id, name, ...props }, ref) => {
    // Determine effective variant based on state
    const effectiveVariant = error
        ? "error"
        : success
            ? "success"
            : warning
                ? "warning"
                : variant;
    const effectiveLabelState = required && labelState === "default" ? "required" : labelState;
    const helperContent = error || helperText;
    const helperVariant = error ? "error" : "muted";
    // Check if component has valid options
    const hasOptions = React.Children.count(children) > 0;
    return (_jsxs("div", { className: cn("space-y-2", className), children: [showLabel && label && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("label", { htmlFor: id, className: "text-sm font-medium text-[var(--color-input-label)]" // FIXED: Use proper navy-500 color
                        , children: label }), effectiveLabelState === "required" && (_jsx("span", { className: "text-[var(--color-input-label-required)] text-sm", children: "(Required)" })), effectiveLabelState === "optional" && (_jsx("span", { className: "text-[var(--color-input-label-optional)] text-sm", children: "(Optional)" }))] })), showHintText && hintText && (_jsx("p", { className: cn(helperVariants({ variant: "muted" })), children: hintText })), _jsxs(Select, { value: value, onValueChange: onValueChange, defaultValue: defaultValue, name: name, required: required, disabled: disabled, ...props, children: [_jsx(SelectTrigger, { ref: ref, id: id, variant: effectiveVariant, size: size, children: _jsx(SelectValue, { placeholder: hasOptions ? placeholder : "No options available" }) }), _jsx(SelectContent, { children: hasOptions ? (children) : (_jsx("div", { className: "py-2 px-3 text-sm text-[var(--color-text-muted)]", children: "No options available" })) })] }), helperContent && (_jsx("p", { className: cn(helperVariants({ variant: helperVariant })), children: helperContent }))] }));
});
SelectField.displayName = "SelectField";
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectField, };
