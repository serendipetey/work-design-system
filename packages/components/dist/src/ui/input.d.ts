import React from "react";
import { type VariantProps } from "class-variance-authority";
import { helperVariants, labelVariants } from "./form";
declare const inputVariants: (props?: ({
    variant?: "success" | "warning" | "default" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    size?: "sm" | "md" | "lg" | "xl";
    label?: string;
    labelState?: "required" | "optional";
    hideLabel?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    helperClassName?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    leftText?: string;
    rightText?: string;
    loading?: boolean;
    clearable?: boolean;
    onClear?: () => void;
    hintText?: string;
    error?: string;
    success?: string;
    warning?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, inputVariants, helperVariants, labelVariants };
export default Input;
//# sourceMappingURL=input.d.ts.map