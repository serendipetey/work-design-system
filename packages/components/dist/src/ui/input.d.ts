import React from "react";
import { type VariantProps } from "class-variance-authority";
declare const inputVariants: (props?: ({
    variant?: "success" | "warning" | "default" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const labelVariants: (props?: ({
    state?: "disabled" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const helperVariants: (props?: ({
    variant?: "success" | "warning" | "default" | "error" | "muted" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    label?: string;
    labelState?: "default" | "required" | "optional";
    showLabel?: boolean;
    hintText?: string;
    showHintText?: boolean;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    leftText?: string;
    rightText?: string;
    error?: string | boolean;
    success?: string | boolean;
    warning?: string | boolean;
    loading?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    helperClassName?: string;
    clearable?: boolean;
    onClear?: () => void;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, inputVariants };
export default Input;
