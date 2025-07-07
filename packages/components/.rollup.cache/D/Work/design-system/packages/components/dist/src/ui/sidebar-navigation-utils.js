// packages/components/src/ui/sidebar-navigation-utils.tsx
// 🎯 OPTIMAL ARCHITECTURE: Centralized Navigation State Management
// Provides smart navigation state management for sidebar components.
import { useState, useEffect } from "react";
import { isSidebarItemActive, getExpandedSectionsForPath } from "./sidebar";
// 🎯 Navigation State Hook
export const useNavigationState = (navigationConfig, currentPath) => {
    // Find active item based on current path
    const findActiveItemId = () => {
        // Check standalone items first
        for (const item of navigationConfig.standalone || []) {
            if (isSidebarItemActive(item.href, currentPath)) {
                return item.id;
            }
        }
        // Check section items
        for (const section of navigationConfig.sections) {
            for (const item of section.items) {
                if (isSidebarItemActive(item.href, currentPath)) {
                    return item.id;
                }
            }
        }
        return null;
    };
    // State management
    const [activeItemId, setActiveItemId] = useState(findActiveItemId());
    const [expandedSections, setExpandedSections] = useState(getExpandedSectionsForPath(navigationConfig, currentPath));
    // Update active item when path changes
    useEffect(() => {
        const newActiveItemId = findActiveItemId();
        setActiveItemId(newActiveItemId);
        // Auto-expand sections containing the active item
        const newExpandedSections = getExpandedSectionsForPath(navigationConfig, currentPath);
        setExpandedSections((prev) => {
            // Merge with existing expanded sections to preserve user interactions
            const merged = [...new Set([...prev, ...newExpandedSections])];
            return merged;
        });
    }, [currentPath, navigationConfig]);
    // Toggle section expansion
    const toggleSection = (sectionId) => {
        setExpandedSections((prev) => {
            if (prev.includes(sectionId)) {
                return prev.filter((id) => id !== sectionId);
            }
            else {
                return [...prev, sectionId];
            }
        });
    };
    // Check if section is expanded
    const isSectionExpanded = (sectionId) => {
        return expandedSections.includes(sectionId);
    };
    // Get section by ID
    const getSectionById = (sectionId) => {
        return navigationConfig.sections.find((section) => section.id === sectionId);
    };
    // Get item by ID (from any section or standalone)
    const getItemById = (itemId) => {
        // Check standalone items
        const standaloneItem = navigationConfig.standalone?.find((item) => item.id === itemId);
        if (standaloneItem)
            return standaloneItem;
        // Check section items
        for (const section of navigationConfig.sections) {
            const item = section.items.find((item) => item.id === itemId);
            if (item)
                return item;
        }
        return undefined;
    };
    // Get all navigation items as flat array
    const getAllItems = () => {
        const items = [];
        // Add standalone items
        if (navigationConfig.standalone) {
            items.push(...navigationConfig.standalone);
        }
        // Add section items
        for (const section of navigationConfig.sections) {
            items.push(...section.items);
        }
        return items;
    };
    return {
        activeItemId,
        expandedSections,
        toggleSection,
        isSectionExpanded,
        getSectionById,
        getItemById,
        getAllItems,
        setActiveItemId,
        setExpandedSections,
    };
};
// 🎯 Navigation Builder Utilities
export const createNavigationItem = (id, label, href, options) => ({
    id,
    label,
    href,
    icon: options?.icon,
    badge: options?.badge,
});
export const createNavigationSection = (id, title, items, options) => ({
    id,
    title,
    items,
    icon: options?.icon,
    badge: options?.badge,
});
// 🎯 Navigation Analysis Utilities
export const getNavigationStats = (navigationConfig) => {
    const standaloneCount = navigationConfig.standalone?.length || 0;
    const sectionCount = navigationConfig.sections.length;
    const totalItems = (navigationConfig.standalone?.length || 0) +
        navigationConfig.sections.reduce((sum, section) => sum + section.items.length, 0);
    return {
        standaloneCount,
        sectionCount,
        totalItems,
    };
};
