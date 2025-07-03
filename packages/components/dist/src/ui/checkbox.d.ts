import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type VariantProps } from "class-variance-authority";
declare const checkboxVariants: (props?: ({
    variant?: "success" | "warning" | "default" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const radioVariants: (props?: ({
    variant?: "success" | "warning" | "default" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, VariantProps<typeof checkboxVariants> {
    label?: string;
    labelState?: "default" | "required" | "optional";
    showLabel?: boolean;
    hintText?: string;
    showHintText?: boolean;
    helperText?: string;
    error?: string | boolean;
    success?: string | boolean;
    warning?: string | boolean;
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
}
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    label?: string;
    labelState?: "default" | "required" | "optional";
    showLabel?: boolean;
    hintText?: string;
    showHintText?: boolean;
    helperText?: string;
    error?: string | boolean;
    success?: string | boolean;
    warning?: string | boolean;
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
}
export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, VariantProps<typeof radioVariants> {
    label?: string;
    itemClassName?: string;
    labelClassName?: string;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const RadioItem: React.ForwardRefExoticComponent<RadioItemProps & React.RefAttributes<HTMLButtonElement>>;
interface CheckboxGroupProps {
    label?: string;
    labelState?: "default" | "required" | "optional";
    showLabel?: boolean;
    hintText?: string;
    showHintText?: boolean;
    helperText?: string;
    error?: string | boolean;
    success?: string | boolean;
    warning?: string | boolean;
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
    children: React.ReactNode;
}
declare const CheckboxGroup: React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>;
export { Checkbox, CheckboxGroup, RadioGroup, RadioItem, checkboxVariants, radioVariants, };
//# sourceMappingURL=checkbox.d.ts.map