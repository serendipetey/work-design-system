// packages/components/src/ui/sidebar-business-logo.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks
// This component uses CSS custom properties from the design token system
// with reliable fallback values for maximum compatibility and maintainability.
// Pattern: var(--design-token-name, fallback-value)
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarBusinessLogoVariants } from "./sidebar";
// 🎯 Design Tokens + Robust Fallbacks Architecture
// Note: Base layout/spacing comes from centralized CVA in sidebar.tsx
// These styles add design token fallbacks and component-specific styling
const sidebarBusinessLogoStyles = {
    // Additional container styles (beyond CVA)
    base: {
        // Ensure proper justification for logo content
        justifyContent: "center",
        // Transitions (complement CVA transition-colors)
        transition: "var(--transition-base, all 200ms ease-in-out)",
    },
    // Clickable state styles (minimal, CVA handles most)
    clickable: {
        outline: "none",
    },
    // Logo image styles
    logoImage: {
        maxWidth: "100%",
        height: "auto",
        objectFit: "contain",
    },
    // Logo container when showing logo + text
    logoWithTextContainer: {
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-3, 12px)",
        width: "100%",
    },
    // Logo image when shown with text
    logoImageWithText: {
        flexShrink: 0,
        maxWidth: "var(--spacing-10, 40px)",
        height: "auto",
        objectFit: "contain",
    },
    // Text-only or text with logo styles
    businessText: {
        // Typography
        fontFamily: "var(--font-family-sans, 'Poppins', system-ui, sans-serif)",
        fontSize: "var(--font-size-lg, 18px)",
        fontWeight: "var(--font-weight-bold, 700)",
        lineHeight: "var(--line-height-tight, 1.25)",
        // Colors
        color: "var(--color-navy-500, #1e3a8a)",
        // Layout
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "140px",
    },
    // Fallback icon container
    fallbackIconContainer: {
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-3, 12px)",
    },
    // Fallback icon styles
    fallbackIcon: {
        width: "var(--spacing-8, 32px)",
        height: "var(--spacing-8, 32px)",
        borderRadius: "var(--border-radius-md, 6px)",
        backgroundColor: "var(--color-navy-500, #1e3a8a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    // Fallback icon SVG
    fallbackIconSvg: {
        width: "var(--spacing-5, 20px)",
        height: "var(--spacing-5, 20px)",
        color: "var(--color-white, #ffffff)",
    },
};
// 🎯 Focus/Hover Styles with Design Tokens + Fallbacks
// Note: CVA already handles basic hover styles, this adds focus states
const injectInteractiveStyles = () => {
    const styleId = "sidebar-business-logo-interactive";
    // Remove existing styles
    const existingStyle = document.getElementById(styleId);
    if (existingStyle)
        existingStyle.remove();
    // Create new interactive styles (focus states only, CVA handles hover)
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
    .sidebar-business-logo-clickable:focus {
      outline: 2px solid var(--color-border-focus, #3b82f6);
      outline-offset: 1px;
    }
    .sidebar-business-logo-clickable:focus-visible {
      outline: 2px solid var(--color-border-focus, #3b82f6);
      outline-offset: 1px;
    }
  `;
    document.head.appendChild(style);
};
// 🎯 Main Component with Token + Fallback Architecture
const SidebarBusinessLogo = React.forwardRef(({ className, businessName = "Your Business", logoUrl, width = 120, height = 40, onClick, showTextWithLogo = false, textOnly = false, style, ...props }, ref) => {
    const elementRef = React.useRef(null);
    const isClickable = !!onClick;
    // Combine refs
    React.useImperativeHandle(ref, () => elementRef.current);
    // Inject interactive styles on mount
    React.useEffect(() => {
        if (elementRef.current && isClickable) {
            injectInteractiveStyles();
            elementRef.current.classList.add("sidebar-business-logo-clickable");
        }
    }, [isClickable]);
    // 🎯 Combine styles: CVA + Design Tokens + Custom
    // CVA handles base layout, spacing, borders, and basic hover
    // Design tokens add fallbacks and component-specific styles
    const combinedStyles = {
        ...sidebarBusinessLogoStyles.base,
        ...(isClickable ? sidebarBusinessLogoStyles.clickable : {}),
        ...style, // Allow style overrides
    };
    // 🎯 Build logo content based on options
    const renderLogoContent = () => {
        // Text only mode
        if (textOnly) {
            return (_jsx("span", { style: sidebarBusinessLogoStyles.businessText, children: businessName }));
        }
        // Logo with text
        if (logoUrl && showTextWithLogo) {
            return (_jsxs("div", { style: sidebarBusinessLogoStyles.logoWithTextContainer, children: [_jsx("img", { src: logoUrl, alt: `${businessName} logo`, width: 32, height: 32, style: {
                            ...sidebarBusinessLogoStyles.logoImageWithText,
                            maxHeight: 32,
                        } }), _jsx("span", { style: sidebarBusinessLogoStyles.businessText, children: businessName })] }));
        }
        // Logo only
        if (logoUrl) {
            return (_jsx("img", { src: logoUrl, alt: `${businessName} logo`, width: width, height: height, style: {
                    ...sidebarBusinessLogoStyles.logoImage,
                    maxHeight: height,
                } }));
        }
        // Fallback: Icon + text
        return (_jsxs("div", { style: sidebarBusinessLogoStyles.fallbackIconContainer, children: [_jsx("div", { style: sidebarBusinessLogoStyles.fallbackIcon, children: _jsx(Building2, { style: sidebarBusinessLogoStyles.fallbackIconSvg }) }), _jsx("span", { style: sidebarBusinessLogoStyles.businessText, children: businessName })] }));
    };
    // Build final className using centralized CVA
    const finalClassName = cn(sidebarBusinessLogoVariants({ clickable: isClickable }), className);
    // 🎯 Render as button if clickable
    if (isClickable) {
        return (_jsx("button", { ...props, ref: elementRef, onClick: onClick, "aria-label": `${businessName} home`, className: finalClassName, style: combinedStyles, children: renderLogoContent() }));
    }
    // 🎯 Render as div if not clickable
    return (_jsx("div", { ref: elementRef, className: finalClassName, style: combinedStyles, ...props, children: renderLogoContent() }));
});
SidebarBusinessLogo.displayName = "SidebarBusinessLogo";
// 🎯 Named Exports for compatibility
export { SidebarBusinessLogo };
export default SidebarBusinessLogo;
