import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonBaseClasses: (props?: ({
    variant?: "primary" | "outline" | "cta" | "success" | "warning" | "destructive" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonFixedProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonBaseClasses> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const ButtonFixed: React.ForwardRefExoticComponent<ButtonFixedProps & React.RefAttributes<HTMLButtonElement>>;
export { ButtonFixed, buttonBaseClasses };
