import { LucideIcon } from "lucide-react";
export interface NavigationItem {
    id: string;
    label: string;
    href?: string;
    icon?: LucideIcon;
    active?: boolean;
    disabled?: boolean;
    badge?: string | number;
    subItems?: NavigationItem[];
}
export interface NavigationSection {
    id: string;
    title: string;
    icon?: LucideIcon;
    items: NavigationItem[];
    defaultOpen?: boolean;
}
export interface NavigationConfig {
    sections: NavigationSection[];
    standalone?: NavigationItem[];
}
export declare function useActiveNavigation(currentPath?: string, matchMode?: "exact" | "startsWith"): {
    isActive: (href?: string) => boolean;
    findActiveItem: (config: NavigationConfig) => string | null;
};
export declare function useNavigationState(config: NavigationConfig, currentPath?: string): {
    activeItemId: string | null;
    expandedSections: string[];
    toggleSection: (sectionId: string) => void;
    isSectionExpanded: (sectionId: string) => boolean;
    isActive: (href?: string) => boolean;
};
