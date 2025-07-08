import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { sidebarBusinessLogoVariants } from "./sidebar";
export interface SidebarBusinessLogoProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof sidebarBusinessLogoVariants> {
    businessName?: string;
    logoUrl?: string;
    width?: number;
    height?: number;
    onClick?: () => void;
    showTextWithLogo?: boolean;
    textOnly?: boolean;
    containerClassName?: string;
}
declare const SidebarBusinessLogo: React.ForwardRefExoticComponent<SidebarBusinessLogoProps & React.RefAttributes<HTMLElement>>;
export { SidebarBusinessLogo };
export default SidebarBusinessLogo;
