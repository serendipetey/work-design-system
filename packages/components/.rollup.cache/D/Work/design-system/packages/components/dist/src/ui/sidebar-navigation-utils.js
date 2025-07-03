// packages/components/src/ui/sidebar-navigation-utils.tsx
"use client";
import * as React from "react";
// Hook for URL-based active state detection
export function useActiveNavigation(currentPath, matchMode = "startsWith") {
    const isActive = React.useCallback((href) => {
        if (!href || !currentPath)
            return false;
        if (matchMode === "exact") {
            return currentPath === href;
        }
        return currentPath.startsWith(href);
    }, [currentPath, matchMode]);
    const findActiveItem = React.useCallback((config) => {
        // Check standalone items
        if (config.standalone) {
            for (const item of config.standalone) {
                if (isActive(item.href))
                    return item.id;
            }
        }
        // Check section items
        for (const section of config.sections) {
            for (const item of section.items) {
                if (isActive(item.href))
                    return item.id;
                // Check sub-items
                if (item.subItems) {
                    for (const subItem of item.subItems) {
                        if (isActive(subItem.href))
                            return subItem.id;
                    }
                }
            }
        }
        return null;
    }, [isActive]);
    return { isActive, findActiveItem };
}
// Hook for navigation state management
export function useNavigationState(config, currentPath) {
    const { isActive, findActiveItem } = useActiveNavigation(currentPath);
    const [expandedSections, setExpandedSections] = React.useState(() => {
        // Auto-expand sections that contain active items
        const expanded = [];
        if (currentPath) {
            config.sections.forEach((section) => {
                const hasActiveItem = section.items.some((item) => isActive(item.href) ||
                    item.subItems?.some((subItem) => isActive(subItem.href)));
                if (hasActiveItem || section.defaultOpen) {
                    expanded.push(section.id);
                }
            });
        }
        else {
            // Default open sections
            config.sections.forEach((section) => {
                if (section.defaultOpen) {
                    expanded.push(section.id);
                }
            });
        }
        return expanded;
    });
    const activeItemId = React.useMemo(() => findActiveItem(config), [config, findActiveItem]);
    const toggleSection = React.useCallback((sectionId) => {
        setExpandedSections((prev) => prev.includes(sectionId)
            ? prev.filter((id) => id !== sectionId)
            : [...prev, sectionId]);
    }, []);
    const isSectionExpanded = React.useCallback((sectionId) => expandedSections.includes(sectionId), [expandedSections]);
    return {
        activeItemId,
        expandedSections,
        toggleSection,
        isSectionExpanded,
        isActive,
    };
}
//# sourceMappingURL=sidebar-navigation-utils.js.map