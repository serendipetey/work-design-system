// packages/components/src/ui/select.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses CSS custom properties from the design token system
// with reliable fallback values for maximum compatibility and maintainability.
// Pattern: var(--design-token-name, fallback-value)

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  helperVariants,
  labelVariants,
  getHelperContent,
  getHelperVariant,
  getFormFieldAria,
} from "./form";

// 🎯 Use EXACT same CVA as Input component
const selectTriggerVariants = cva(
  "flex items-center justify-between w-full transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-left data-[state=open]:ring-2 data-[state=open]:ring-[var(--color-border-focus)]",
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

const selectContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {},
    defaultVariants: {},
  }
);

const selectItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
);

// 🎯 EXACT same design token styles as Input component
const selectStyles = {
  // Base styles - IDENTICAL to Input component
  base: {
    // Typography
    fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
    fontWeight: "var(--font-weight-regular, 400)",
    fontSize: "var(--font-size-base, 16px)",
    lineHeight: "var(--line-height-normal, 1.5)",

    // Layout
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "space-between",

    // Colors - EXACT same tokens as Input
    backgroundColor: "var(--color-surface, #ffffff)",
    color: "var(--color-input-text, #39444f)",

    // Borders - EXACT same as Input
    borderRadius: "var(--border-radius-md, 6px)",
    borderWidth: "var(--border-width, 1px)",
    borderStyle: "solid",
    borderColor: "var(--color-border, #d1d5db)",

    // Transitions
    transition: "var(--transition-base, all 200ms ease-in-out)",

    // States
    cursor: "pointer",
    outline: "none",
  },

  // Size variants - EXACT same height tokens as Input component
  sizes: {
    sm: {
      height: "var(--input-height-sm, 32px)", // FIXED: Use input height tokens
      paddingLeft: "var(--input-padding-x-sm, 8px)", // FIXED: Match design tokens
      paddingRight: "var(--input-padding-x-sm, 8px)",
      fontSize: "var(--font-size-sm, 14px)",
    },
    md: {
      height: "var(--input-height-md, 40px)", // FIXED: 40px not 48px!
      paddingLeft: "var(--input-padding-x-md, 12px)", // FIXED: 12px from design tokens
      paddingRight: "var(--input-padding-x-md, 12px)",
      fontSize: "var(--font-size-base, 16px)",
    },
    lg: {
      height: "var(--input-height-lg, 48px)", // FIXED: 48px not 56px!
      paddingLeft: "var(--input-padding-x-lg, 16px)", // FIXED: 16px from design tokens
      paddingRight: "var(--input-padding-x-lg, 16px)",
      fontSize: "var(--font-size-lg, 18px)",
    },
    xl: {
      height: "var(--input-height-xl, 56px)", // FIXED: 56px not 64px!
      paddingLeft: "var(--input-padding-x-xl, 20px)", // FIXED: 20px from design tokens
      paddingRight: "var(--input-padding-x-xl, 20px)",
      fontSize: "var(--font-size-xl, 20px)",
    },
  },

  // State variants - EXACT same as Input component
  variants: {
    default: {
      borderColor: "var(--color-border, #d1d5db)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    error: {
      borderColor: "var(--color-input-border-error, #eb0000)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    success: {
      borderColor: "var(--color-input-border-success, #007d85)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
    warning: {
      borderColor: "var(--color-input-border-warning, #b75b00)",
      backgroundColor: "var(--color-surface, #ffffff)",
    },
  },

  // State styles
  states: {
    disabled: {
      cursor: "not-allowed" as const,
      opacity: "var(--opacity-disabled, 0.5)",
      backgroundColor: "var(--color-disabled, #f3f4f6)",
      color: "var(--color-disabled-text, #6b7280)",
    },
    placeholder: {
      color: "var(--color-input-placeholder, #b3b9bf)",
    },
  },
};

// 🎯 EXACT same focus injection as Input component
const injectSelectFocusStyles = (variant: string) => {
  const focusStyleId = `select-focus-${variant}`;

  // Remove existing focus styles
  const existingStyle = document.getElementById(focusStyleId);
  if (existingStyle) existingStyle.remove();

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
    .select-${variant}:focus {
      box-shadow: ${shadowToken};
    }
    
    .select-${variant}[data-state="open"] {
      box-shadow: ${shadowToken};
    }
  `;

  document.head.appendChild(style);
};

// Basic Select Components (using Radix UI primitives)
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// Enhanced SelectTrigger - EXACT same architecture as Input
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof selectTriggerVariants>
>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref
  ) => {
    const elementRef = React.useRef<HTMLButtonElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current!);

    // Inject focus styles on mount - EXACT same as Input
    React.useEffect(() => {
      if (elementRef.current && variant) {
        injectSelectFocusStyles(variant);
        elementRef.current.classList.add(`select-${variant}`);
      }
    }, [variant]);

    // 🎯 Combine styles: Base + Variant + Size + State + Custom - EXACT same as Input
    const combinedStyles = {
      ...selectStyles.base,
      ...(variant && selectStyles.variants[variant]
        ? selectStyles.variants[variant]
        : {}),
      ...(size && selectStyles.sizes[size] ? selectStyles.sizes[size] : {}),
      ...(props.disabled ? selectStyles.states.disabled : {}),
    };

    // Build final className - EXACT same pattern as Input
    const finalClassName = cn(
      selectTriggerVariants({ variant, size }),
      className
    );

    return (
      <SelectPrimitive.Trigger
        ref={elementRef}
        className={finalClassName}
        style={combinedStyles}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Enhanced SelectContent
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  const elementRef = React.useRef<HTMLDivElement>(null);

  // Combine refs
  React.useImperativeHandle(ref, () => elementRef.current!);

  // Apply styles
  const combinedStyles = {
    backgroundColor: "var(--color-surface, #ffffff)",
    borderRadius: "var(--border-radius-md, 6px)",
    borderWidth: "var(--border-width, 1px)",
    borderStyle: "solid",
    borderColor: "var(--color-border, #d1d5db)",
    maxHeight: "var(--dropdown-max-height, 240px)",
    overflowY: "auto" as const,
    overflowX: "hidden" as const,
    zIndex: "var(--z-dropdown, 50)",
  };

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={elementRef}
        className={cn(selectContentVariants(), className)}
        style={combinedStyles}
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
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Enhanced SelectItem
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const combinedStyles = {
    display: "flex" as const,
    alignItems: "center",
    position: "relative" as const,
    paddingTop: "var(--spacing-2, 8px)",
    paddingBottom: "var(--spacing-2, 8px)",
    paddingLeft: "var(--spacing-8, 32px)",
    paddingRight: "var(--spacing-3, 12px)",
    fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
    fontSize: "var(--font-size-base, 16px)",
    lineHeight: "var(--line-height-normal, 1.5)",
    color: "var(--color-input-text, #39444f)",
    cursor: "pointer",
    userSelect: "none" as const,
    borderRadius: "var(--border-radius-sm, 4px)",
    transition: "var(--transition-base, all 200ms ease-in-out)",
  };

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(selectItemVariants(), className)}
      style={combinedStyles}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Enhanced SelectField - EXACT same architecture as Input
interface SelectFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
      "value" | "onValueChange"
    >,
    VariantProps<typeof selectTriggerVariants> {
  label?: string;
  labelState?: "required" | "optional";
  hideLabel?: boolean;

  // Hint text support like Input component
  hintText?: string;

  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;

  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;

  // Styling Overrides - EXACT same as Input
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;

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
      variant = "default",
      size = "md",
      label,
      labelState,
      hideLabel = false,
      hintText,
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
      containerClassName,
      labelClassName,
      helperClassName,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();

    // 🎯 EXACT same logic as Input component
    const finalVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : variant;

    // Helper text logic - EXACT same as Input component
    const helperContent = getHelperContent(error, success, warning);
    const helperVariant = getHelperVariant(error, success, warning);
    const formFieldAria = getFormFieldAria(
      selectId,
      error,
      success,
      warning,
      hintText
    );
    const showLabel = !hideLabel;
    const showHintText = !!hintText;

    // IDs for accessibility
    const helperTextId = helperContent ? `${selectId}-helper` : undefined;

    // Check if component has valid options
    const hasOptions = React.Children.count(children) > 0;

    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label - EXACT same as Input */}
        {showLabel && label && (
          <label
            htmlFor={selectId}
            className={cn(
              labelVariants({ variant: disabled ? "disabled" : "default" }),
              labelClassName
            )}
          >
            {label}
            {labelState === "required" && (
              <span
                style={{ color: "var(--color-input-label-required, #a30134)" }}
              >
                {" "}
                *
              </span>
            )}
            {labelState === "optional" && (
              <span
                style={{
                  color: "var(--color-text-muted, #6b7280)",
                  fontWeight: "var(--font-weight-regular, 400)",
                }}
              >
                {" "}
                (Optional)
              </span>
            )}
          </label>
        )}

        {/* Hint Text */}
        {showHintText && (
          <p
            className={cn(helperVariants({ variant: "muted" }), "mt-0 mb-0.5")}
            id={`${selectId}-description`}
          >
            {hintText}
          </p>
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
            id={selectId}
            variant={finalVariant}
            size={size}
            className={className}
            {...formFieldAria}
          >
            <SelectValue
              placeholder={hasOptions ? placeholder : "No options available"}
            />
          </SelectTrigger>

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

        {/* Helper Text - EXACT same as Input */}
        {helperContent && (
          <p
            id={helperTextId}
            className={cn(
              helperVariants({ variant: helperVariant }),
              helperClassName
            )}
            style={{
              marginTop: "2px",
            }}
          >
            {helperContent}
          </p>
        )}
      </div>
    );
  }
);
SelectField.displayName = "SelectField";

// 🎯 Named Exports for compatibility
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectField,
  selectTriggerVariants,
};

export type { SelectFieldProps };
export default SelectField;
