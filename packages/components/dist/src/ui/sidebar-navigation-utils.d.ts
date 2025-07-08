import { LucideIcon } from "lucide-react";
export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    icon?: LucideIcon;
    badge?: string | number;
}
export interface NavigationSection {
    id: string;
    title: string;
    icon?: LucideIcon;
    badge?: string | number;
    items: NavigationItem[];
}
export interface NavigationConfig {
    standalone?: NavigationItem[];
    sections: NavigationSection[];
}
export declare const useNavigationState: (navigationConfig: NavigationConfig, currentPath: string) => {
    activeItemId: string | null;
    expandedSections: string[];
    toggleSection: (sectionId: string) => void;
    isSectionExpanded: (sectionId: string) => boolean;
    getSectionById: (sectionId: string) => NavigationSection | undefined;
    getItemById: (itemId: string) => NavigationItem | undefined;
    getAllItems: () => NavigationItem[];
    setActiveItemId: import("react").Dispatch<import("react").SetStateAction<string | null>>;
    setExpandedSections: import("react").Dispatch<import("react").SetStateAction<string[]>>;
};
export declare const createNavigationItem: (id: string, label: string, href: string, options?: {
    icon?: LucideIcon;
    badge?: string | number;
}) => NavigationItem;
export declare const createNavigationSection: (id: string, title: string, items: NavigationItem[], options?: {
    icon?: LucideIcon;
    badge?: string | number;
}) => NavigationSection;
export declare const getNavigationStats: (navigationConfig: NavigationConfig) => {
    standaloneCount: number;
    sectionCount: number;
    totalItems: number;
};
//# sourceMappingURL=sidebar-navigation-utils.d.ts.map