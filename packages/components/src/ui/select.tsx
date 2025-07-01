// packages/components/src/ui/select.tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputVariants, helperVariants } from "./input"; // INHERIT FROM INPUT!

// Select Trigger uses INPUT variants (DRY!)
const selectTriggerVariants = cva(
  [
    // Use input base classes
    "flex items-center justify-between cursor-pointer",
    // Only override what's different for select
    "[&>span]:line-clamp-1 [&>span]:text-left",
    // MINIMAL FIX: Keep focus ring visible when dropdown opens
    "data-[state=open]:ring-2 data-[state=open]:ring-[var(--color-border-focus)]",
  ],
  {
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
  }
);

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
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof inputVariants> // Use input variants!
>(({ className, variant, size, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Use input variants as base!
      inputVariants({ variant, size }),
      // Add select-specific overrides
      selectTriggerVariants({ variant, size }),
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Select Content with proper background
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(selectContentVariants(), className)}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
        <ChevronUp className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
        <ChevronDown className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Select Item with proper check icon
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(selectItemVariants(), className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Enhanced SelectField with proper label colors and hint text support
interface SelectFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
      "value" | "onValueChange"
    >,
    VariantProps<typeof inputVariants> {
  label?: string;
  labelState?: "default" | "required" | "optional";
  showLabel?: boolean;

  // ADDED: Hint text support like Input component
  hintText?: string;
  showHintText?: boolean;

  helperText?: string;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;

  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;

  className?: string;
  id?: string;
}

const SelectField = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectFieldProps
>(
  (
    {
      className,
      variant,
      size,
      label,
      labelState = "default",
      showLabel = true,
      hintText, // ADDED: Hint text support
      showHintText = true, // ADDED: Hint text control
      helperText,
      error,
      success,
      warning,
      placeholder,
      value,
      onValueChange,
      defaultValue,
      children,
      required,
      disabled,
      id,
      name,
      ...props
    },
    ref
  ) => {
    // Determine effective variant based on state
    const effectiveVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : variant;
    const effectiveLabelState =
      required && labelState === "default" ? "required" : labelState;
    const helperContent = error || helperText;
    const helperVariant = error ? "error" : "muted";

    // Check if component has valid options
    const hasOptions = React.Children.count(children) > 0;

    return (
      <div className={cn("space-y-2", className)}>
        {/* FIXED: Label with proper color and required asterisk */}
        {showLabel && label && (
          <div className="flex items-center gap-1">
            <label
              htmlFor={id}
              className="text-sm font-medium text-[var(--color-input-label)]" // FIXED: Use proper navy-500 color
            >
              {label}
            </label>
            {/* FIXED: Red "(Required)" text to match Input component */}
            {effectiveLabelState === "required" && (
              <span className="text-[var(--color-input-label-required)] text-sm">
                (Required)
              </span>
            )}
            {effectiveLabelState === "optional" && (
              <span className="text-[var(--color-input-label-optional)] text-sm">
                (Optional)
              </span>
            )}
          </div>
        )}

        {/* ADDED: Hint Text support */}
        {showHintText && hintText && (
          <p className={cn(helperVariants({ variant: "muted" }))}>{hintText}</p>
        )}

        {/* Select */}
        <Select
          value={value}
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          name={name}
          required={required}
          disabled={disabled}
          {...props}
        >
          <SelectTrigger
            ref={ref}
            id={id}
            variant={effectiveVariant}
            size={size}
          >
            <SelectValue
              placeholder={hasOptions ? placeholder : "No options available"}
            />
          </SelectTrigger>

          {/* Enhanced SelectContent with proper background */}
          <SelectContent>
            {hasOptions ? (
              children
            ) : (
              <div className="py-2 px-3 text-sm text-[var(--color-text-muted)]">
                No options available
              </div>
            )}
          </SelectContent>
        </Select>

        {/* Helper Text - Same as Input */}
        {helperContent && (
          <p className={cn(helperVariants({ variant: helperVariant }))}>
            {helperContent}
          </p>
        )}
      </div>
    );
  }
);
SelectField.displayName = "SelectField";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectField,
  type SelectFieldProps,
};
