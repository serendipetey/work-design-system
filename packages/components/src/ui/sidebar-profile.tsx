// packages/components/src/ui/sidebar-profile.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses centralized sidebar utilities for consistent styling.

import React from "react";
import { User, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarProfileVariants } from "./sidebar";
import { Button } from "./button";

// 🎯 TypeScript Interfaces
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

export interface SidebarProfileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  user: SidebarProfileData;
  onSwitchEntity?: () => void;
}

// 🎯 Sidebar Profile Component
const SidebarProfile = React.forwardRef<HTMLDivElement, SidebarProfileProps>(
  ({ className, user, onSwitchEntity, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sidebarProfileVariants(), className)}
        {...props}
      >
        {/* User Info Section */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary,#1e40af)] flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--color-white,#ffffff)]" />
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text-heading,#111827)] truncate">
              {user.entity.name}
            </h3>
            <p className="text-sm text-[var(--color-text-body,#374151)] truncate">
              {user.contact.name}
            </p>
            <p className="text-xs text-[var(--color-text-muted,#6b7280)] truncate">
              {user.contact.role}
            </p>
          </div>
        </div>

        {/* Switch Entity Button (optional) */}
        {onSwitchEntity && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSwitchEntity}
            leftIcon={<ArrowUpDown className="w-4 h-4" />}
            className="justify-start text-[var(--color-text-link,#2563eb)] hover:text-[var(--color-text-link-hover,#1d4ed8)]"
          >
            Switch Entity
          </Button>
        )}
      </div>
    );
  }
);

SidebarProfile.displayName = "SidebarProfile";

export { SidebarProfile, sidebarProfileVariants };
