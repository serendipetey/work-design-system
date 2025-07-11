import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonBaseClasses: (props?: ({
    variant?: "primary" | "success" | "warning" | "outline" | "cta" | "destructive" | null | undefined;
    appearance?: "solid" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonBaseClasses> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    ghost?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonBaseClasses as buttonVariants };
