import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "./input";
declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "error" | "success" | "warning" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface SelectFieldProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, "value" | "onValueChange">, VariantProps<typeof inputVariants> {
    label?: string;
    labelState?: "default" | "required" | "optional";
    showLabel?: boolean;
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
declare const SelectField: React.ForwardRefExoticComponent<SelectFieldProps & React.RefAttributes<HTMLButtonElement>>;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectField, type SelectFieldProps, };
