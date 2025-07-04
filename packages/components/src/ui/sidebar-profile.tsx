// packages/components/src/ui/sidebar-profile.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { User, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button-old";

const sidebarProfileVariants = cva([
  "flex flex-col p-4 border-b border-[var(--color-border)]",
  "bg-[var(--color-surface-subtle)]",
]);

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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarProfileVariants> {
  user: SidebarProfileData;
  onSwitchEntity?: () => void;
}

const SidebarProfile = React.forwardRef<HTMLDivElement, SidebarProfileProps>(
  ({ className, user, onSwitchEntity, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sidebarProfileVariants(), className)}
        {...props}
      >
        {/* Entity & User Info */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--color-white)]" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text-heading)] truncate">
              {user.entity.name}
            </h3>
            <p className="text-sm text-[var(--color-text-body)] truncate">
              {user.contact.name}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] truncate">
              {user.contact.role}
            </p>
          </div>
        </div>

        {/* Switch Entity Button */}
        {onSwitchEntity && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSwitchEntity}
            leftIcon={<ArrowUpDown className="w-4 h-4" />}
            className="justify-start text-[var(--color-text-link)] hover:text-[var(--color-text-link-hover)]"
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
