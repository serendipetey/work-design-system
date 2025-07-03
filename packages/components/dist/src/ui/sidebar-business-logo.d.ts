import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const sidebarBusinessLogoVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
export interface SidebarBusinessLogoProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarBusinessLogoVariants> {
    /**
     * Business/company name for alt text and fallback
     */
    businessName?: string;
    /**
     * Logo image URL - if not provided, shows placeholder
     */
    logoUrl?: string;
    /**
     * Logo image width
     */
    width?: number;
    /**
     * Logo image height
     */
    height?: number;
    /**
     * Click handler for logo interaction (optional)
     */
    onClick?: () => void;
}
declare const SidebarBusinessLogo: React.ForwardRefExoticComponent<SidebarBusinessLogoProps & React.RefAttributes<HTMLButtonElement | HTMLDivElement>>;
export { SidebarBusinessLogo, sidebarBusinessLogoVariants };
//# sourceMappingURL=sidebar-business-logo.d.ts.map