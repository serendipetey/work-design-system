import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const sidebarProfileVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
export interface SidebarProfileData {
    contact: {
        name: string;
        role: string;
    };
    entity: {
        name: string;
        id: string;
    };
}
export interface SidebarProfileProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarProfileVariants> {
    user: SidebarProfileData;
    onSwitchEntity?: () => void;
}
declare const SidebarProfile: React.ForwardRefExoticComponent<SidebarProfileProps & React.RefAttributes<HTMLDivElement>>;
export { SidebarProfile, sidebarProfileVariants };
//# sourceMappingURL=sidebar-profile.d.ts.map