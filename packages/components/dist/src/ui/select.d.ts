import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps } from "class-variance-authority";
declare const selectTriggerVariants: (props?: ({
    variant?: "default" | "error" | "success" | "warning" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "error" | "success" | "warning" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface SelectFieldProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, "value" | "onValueChange">, VariantProps<typeof selectTriggerVariants> {
    label?: string;
    labelState?: "required" | "optional";
    hideLabel?: boolean;
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
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
    className?: string;
    id?: string;
}
declare const SelectField: React.ForwardRefExoticComponent<SelectFieldProps & React.RefAttributes<HTMLButtonElement>>;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectField, selectTriggerVariants, };
export type { SelectFieldProps };
export default SelectField;
