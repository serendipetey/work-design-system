// packages/components/src/ui/sidebar-navigation-utils.tsx
// 🎯 OPTIMAL ARCHITECTURE: Centralized Navigation State Management
// Provides smart navigation state management for sidebar components.

import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { isSidebarItemActive, getExpandedSectionsForPath } from "./sidebar";

// 🎯 TypeScript Interfaces
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

// 🎯 Navigation State Hook
export const useNavigationState = (
  navigationConfig: NavigationConfig,
  currentPath: string
) => {
  // Find active item based on current path
  const findActiveItemId = (): string | null => {
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
  const [activeItemId, setActiveItemId] = useState<string | null>(
    findActiveItemId()
  );
  const [expandedSections, setExpandedSections] = useState<string[]>(
    getExpandedSectionsForPath(navigationConfig, currentPath)
  );

  // Update active item when path changes
  useEffect(() => {
    const newActiveItemId = findActiveItemId();
    setActiveItemId(newActiveItemId);

    // Auto-expand sections containing the active item
    const newExpandedSections = getExpandedSectionsForPath(
      navigationConfig,
      currentPath
    );
    setExpandedSections((prev) => {
      // Merge with existing expanded sections to preserve user interactions
      const merged = [...new Set([...prev, ...newExpandedSections])];
      return merged;
    });
  }, [currentPath, navigationConfig]);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      if (prev.includes(sectionId)) {
        return prev.filter((id) => id !== sectionId);
      } else {
        return [...prev, sectionId];
      }
    });
  };

  // Check if section is expanded
  const isSectionExpanded = (sectionId: string): boolean => {
    return expandedSections.includes(sectionId);
  };

  // Get section by ID
  const getSectionById = (sectionId: string): NavigationSection | undefined => {
    return navigationConfig.sections.find(
      (section) => section.id === sectionId
    );
  };

  // Get item by ID (from any section or standalone)
  const getItemById = (itemId: string): NavigationItem | undefined => {
    // Check standalone items
    const standaloneItem = navigationConfig.standalone?.find(
      (item) => item.id === itemId
    );
    if (standaloneItem) return standaloneItem;

    // Check section items
    for (const section of navigationConfig.sections) {
      const item = section.items.find((item) => item.id === itemId);
      if (item) return item;
    }

    return undefined;
  };

  // Get all navigation items as flat array
  const getAllItems = (): NavigationItem[] => {
    const items: NavigationItem[] = [];

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
export const createNavigationItem = (
  id: string,
  label: string,
  href: string,
  options?: {
    icon?: LucideIcon;
    badge?: string | number;
  }
): NavigationItem => ({
  id,
  label,
  href,
  icon: options?.icon,
  badge: options?.badge,
});

export const createNavigationSection = (
  id: string,
  title: string,
  items: NavigationItem[],
  options?: {
    icon?: LucideIcon;
    badge?: string | number;
  }
): NavigationSection => ({
  id,
  title,
  items,
  icon: options?.icon,
  badge: options?.badge,
});

// 🎯 Navigation Analysis Utilities
export const getNavigationStats = (navigationConfig: NavigationConfig) => {
  const standaloneCount = navigationConfig.standalone?.length || 0;
  const sectionCount = navigationConfig.sections.length;
  const totalItems =
    (navigationConfig.standalone?.length || 0) +
    navigationConfig.sections.reduce(
      (sum, section) => sum + section.items.length,
      0
    );

  return {
    standaloneCount,
    sectionCount,
    totalItems,
  };
};
