import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type VariantProps } from "class-variance-authority";
declare const checkboxVariants: (props?: {
    variant?: "default" | "success" | "warning" | "error";
    size?: "sm" | "md" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
declare const radioVariants: (props?: {
    variant?: "default" | "success" | "warning" | "error";
    size?: "sm" | "md" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "checked">, VariantProps<typeof checkboxVariants> {
    variant?: "default" | "error" | "success" | "warning";
    size?: "sm" | "md" | "lg" | "xl";
    label?: string;
    labelState?: "required" | "optional";
    showLabel?: boolean;
    hintText?: string;
    error?: string;
    success?: string;
    warning?: string;
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
    checked?: boolean | "indeterminate";
}
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    label?: string;
    labelState?: "required" | "optional";
    showLabel?: boolean;
    hintText?: string;
    error?: string;
    success?: string;
    warning?: string;
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
}
export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, VariantProps<typeof radioVariants> {
    variant?: "default" | "error" | "success" | "warning";
    size?: "sm" | "md" | "lg" | "xl";
    label?: string;
    itemClassName?: string;
    labelClassName?: string;
}
export interface CheckboxGroupProps {
    label?: string;
    labelState?: "required" | "optional";
    showLabel?: boolean;
    hintText?: string;
    error?: string;
    success?: string;
    warning?: string;
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
    children: React.ReactNode;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const RadioItem: React.ForwardRefExoticComponent<RadioItemProps & React.RefAttributes<HTMLButtonElement>>;
declare const CheckboxGroup: React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>;
export { Checkbox, RadioGroup, RadioItem, CheckboxGroup, checkboxVariants, radioVariants, };
