// packages/components/src/ui/sidebar-business-logo.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarBusinessLogoVariants = cva([
  "flex items-center justify-center p-6",
  "border-b border-[var(--color-border)]",
  "bg-[var(--color-surface)]",
]);

export interface SidebarBusinessLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarBusinessLogoVariants> {
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

const SidebarBusinessLogo = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  SidebarBusinessLogoProps
>(
  (
    {
      className,
      businessName = "Your Business",
      logoUrl,
      width = 120,
      height = 40,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = !!onClick;

    const logoContent = logoUrl ? (
      <img
        src={logoUrl}
        alt={`${businessName} logo`}
        width={width}
        height={height}
        className="max-w-full h-auto object-contain"
        style={{ maxHeight: height }}
      />
    ) : (
      // Placeholder when no logo provided
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[var(--color-navy-500)] flex items-center justify-center">
          <Building2 className="w-5 h-5 text-[var(--color-white)]" />
        </div>
        <span className="text-lg font-bold text-[var(--color-navy-500)] truncate max-w-[140px]">
          {businessName}
        </span>
      </div>
    );

    const commonClassName = cn(
      sidebarBusinessLogoVariants(),
      isClickable && [
        "cursor-pointer",
        "hover:bg-[var(--color-navy-100)]",
        "transition-colors duration-150",
        "focus-visible:outline-none",
        "focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-1",
        "focus:ring-offset-[var(--color-surface)]",
      ],
      className
    );

    if (isClickable) {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          onClick={onClick}
          aria-label={`${businessName} home`}
          className={commonClassName}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {logoContent}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        className={commonClassName}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {logoContent}
      </div>
    );
  }
);
SidebarBusinessLogo.displayName = "SidebarBusinessLogo";

export { SidebarBusinessLogo, sidebarBusinessLogoVariants };
