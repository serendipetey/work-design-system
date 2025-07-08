import React from "react";
import { sidebarProfileVariants } from "./sidebar";
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
export interface SidebarProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    user: SidebarProfileData;
    onSwitchEntity?: () => void;
}
declare const SidebarProfile: React.ForwardRefExoticComponent<SidebarProfileProps & React.RefAttributes<HTMLDivElement>>;
export { SidebarProfile, sidebarProfileVariants };
//# sourceMappingURL=sidebar-profile.d.ts.map