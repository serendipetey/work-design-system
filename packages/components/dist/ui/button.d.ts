import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonBaseClasses: (props?: {
    variant?: "primary" | "outline" | "cta" | "success" | "warning" | "destructive" | "ghost";
    size?: "sm" | "md" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonBaseClasses> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonBaseClasses as buttonVariants };
