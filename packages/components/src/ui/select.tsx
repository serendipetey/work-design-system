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
  "bg-[var(--select-content-bg)] text-[var(--color-text-primary)]",
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

// Simple Content
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
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Simple Item
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

// Enhanced wrapper - INHERITS INPUT FIELD PATTERN
interface SelectFieldProps {
  label?: string;
  labelState?: "default" | "required" | "optional";
  helperText?: string;
  error?: string;
  variant?: "default" | "error" | "success" | "warning";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  required?: boolean;
}

const SelectField = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  SelectFieldProps
>(
  (
    {
      label,
      labelState = "default",
      helperText,
      error,
      variant = "default",
      size = "md",
      disabled = false,
      placeholder,
      className,
      children,
      value,
      onValueChange,
      defaultValue,
      name,
      required,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const effectiveVariant = error ? "error" : variant;
    const effectiveLabelState =
      required && labelState === "default" ? "required" : labelState;
    const helperContent = error || helperText;
    const helperVariant = error ? "error" : "muted";

    return (
      <div className={cn("space-y-2", className)}>
        {/* Label - SAME AS INPUT */}
        {label && (
          <div className="flex items-center gap-1">
            <label
              htmlFor={id}
              className="text-sm font-medium text-[var(--color-text-secondary)]"
            >
              {label}
            </label>
            {effectiveLabelState === "required" && (
              <span className="text-[var(--color-error)] text-sm">*</span>
            )}
            {effectiveLabelState === "optional" && (
              <span className="text-[var(--color-text-muted)] text-sm">
                (Optional)
              </span>
            )}
          </div>
        )}

        {/* Select */}
        <Select
          value={value}
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          name={name}
          required={required}
          disabled={disabled}
        >
          <SelectTrigger
            ref={ref}
            id={id}
            variant={effectiveVariant}
            size={size}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>

        {/* Helper Text - SAME AS INPUT */}
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
