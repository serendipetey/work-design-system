// packages/components/src/ui/sidebar-menu.stories.tsx
// 🎯 Updated to use refactored sidebar components with centralized architecture
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  FileText,
  DollarSign,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Shield,
} from "lucide-react";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarProfile, type SidebarProfileData } from "./sidebar-profile";
import { SidebarBusinessLogo } from "./sidebar-business-logo";
import { SidebarMenuItem } from "./sidebar-menu-item";
import {
  SidebarMenuSection,
  SidebarMenuSectionRoot,
} from "./sidebar-menu-section";
import {
  useNavigationState,
  type NavigationConfig,
} from "./sidebar-navigation-utils";

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# SidebarMenu

A comprehensive sidebar navigation system built with centralized architecture.

## Features

- **Smart Navigation**: URL-based active states with auto-expansion
- **Collapsible Sections**: Accordion-style grouping of related services  
- **Badge Notifications**: Visual indicators for pending items
- **Accessibility**: Full keyboard navigation and screen reader support
- **Design Token Integration**: Uses centralized styling with robust fallbacks

## Usage

\`\`\`tsx
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuSection,
  SidebarMenuSectionRoot,
  SidebarProfile,
  SidebarBusinessLogo 
} from "@serendipetey/components";

<SidebarMenu size="md">
  <SidebarBusinessLogo businessName="Portal Pro" />
  <SidebarProfile user={userData} />
  
  <SidebarMenuSectionRoot value={expandedSections}>
    <SidebarMenuSection title="Funding" icon={DollarSign}>
      <SidebarMenuItem href="/funding/apply">Apply for Funding</SidebarMenuItem>
    </SidebarMenuSection>
  </SidebarMenuSectionRoot>
</SidebarMenu>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Sidebar width size",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 📋 Navigation Configuration (matching your current setup)
const fullNavigationConfig: NavigationConfig = {
  standalone: [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
  ],
  sections: [
    {
      id: "funding",
      title: "Funding",
      icon: DollarSign,
      items: [
        {
          id: "apply-funding",
          label: "Apply for Funding",
          href: "/funding/apply",
        },
        {
          id: "submit-returns",
          label: "Submit Returns",
          href: "/funding/returns",
          badge: "3",
        },
        {
          id: "view-applications",
          label: "View Applications",
          href: "/funding/applications",
        },
        {
          id: "funding-calculator",
          label: "Funding Calculator",
          href: "/funding/calculator",
        },
      ],
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: Shield,
      items: [
        {
          id: "compliance-overview",
          label: "Overview",
          href: "/compliance",
        },
        {
          id: "audit-reports",
          label: "Audit Reports",
          href: "/compliance/audits",
        },
        {
          id: "policy-management",
          label: "Policy Management",
          href: "/compliance/policies",
        },
      ],
    },
    {
      id: "reports",
      title: "Reports",
      icon: FileText,
      items: [
        {
          id: "financial-reports",
          label: "Financial Reports",
          href: "/reports/financial",
        },
        {
          id: "analytics",
          label: "Analytics",
          href: "/reports/analytics",
        },
        {
          id: "export-data",
          label: "Export Data",
          href: "/reports/export",
        },
      ],
    },
  ],
};

// 👤 User Profile Data
const adminUser: SidebarProfileData = {
  contact: {
    name: "Jane Doe",
    role: "Administrator",
  },
  entity: {
    name: "Acme Corp",
    id: "acme-corp-1",
  },
};

// 🎯 **Main Story: Complete Sidebar with Refactored Architecture**
export const CompleteSidebar: Story = {
  args: {
    size: "md",
  },
  render: (args) => {
    const [currentPath, setCurrentPath] = useState("/funding/returns");

    // 🔄 Smart navigation state management using refactored utilities
    const { activeItemId, expandedSections, toggleSection, isSectionExpanded } =
      useNavigationState(fullNavigationConfig, currentPath);

    const handleNavigation = (href: string) => {
      console.log("Navigate to:", href);
      setCurrentPath(href);
    };

    const handleLogoClick = () => {
      console.log("Navigate to dashboard");
      setCurrentPath("/dashboard");
    };

    const handleSwitchEntity = () => {
      console.log("Switch entity clicked");
    };

    return (
      <div className="flex h-screen bg-[var(--color-background,#f8fafc)]">
        {/* 🎯 Refactored Sidebar Menu */}
        <SidebarMenu {...args}>
          {/* 🏢 Business Logo */}
          <SidebarBusinessLogo
            businessName="Portal Pro"
            logoUrl="https://via.placeholder.com/140x45/1e40af/ffffff?text=Portal+Pro"
            onClick={handleLogoClick}
          />

          {/* 👤 User Profile */}
          <SidebarProfile
            user={adminUser}
            onSwitchEntity={handleSwitchEntity}
          />

          {/* 🧭 Navigation using refactored components */}
          <div className="flex-1 py-4">
            {/* Standalone Items */}
            <div className="px-2 mb-4 space-y-1">
              {fullNavigationConfig.standalone?.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  icon={item.icon}
                  active={activeItemId === item.id}
                  onNavigate={handleNavigation}
                  href={item.href}
                >
                  {item.label}
                </SidebarMenuItem>
              ))}
            </div>

            {/* 📁 Collapsible Sections using refactored accordion */}
            <SidebarMenuSectionRoot
              value={expandedSections}
              onValueChange={(sections) => {
                // Handle section state changes
                console.log("Expanded sections changed:", sections);
              }}
            >
              {fullNavigationConfig.sections.map((section) => (
                <SidebarMenuSection
                  key={section.id}
                  title={section.title}
                  icon={section.icon}
                  value={section.id}
                  expanded={isSectionExpanded(section.id)}
                  onToggle={() => toggleSection(section.id)}
                >
                  <div className="space-y-1 px-2">
                    {section.items.map((item) => (
                      <SidebarMenuItem
                        key={item.id}
                        size="sm"
                        active={activeItemId === item.id}
                        onNavigate={handleNavigation}
                        href={item.href}
                        badge={item.badge}
                      >
                        {item.label}
                      </SidebarMenuItem>
                    ))}
                  </div>
                </SidebarMenuSection>
              ))}
            </SidebarMenuSectionRoot>
          </div>

          {/* 🔗 Bottom Actions */}
          <div className="border-t border-[var(--color-border,#e5e7eb)] p-2 space-y-1">
            <SidebarMenuItem
              icon={Bell}
              size="sm"
              active={currentPath === "/notifications"}
              onNavigate={handleNavigation}
              href="/notifications"
              badge="5"
            >
              Notifications
            </SidebarMenuItem>
            <SidebarMenuItem
              icon={Users}
              size="sm"
              active={currentPath === "/profile"}
              onNavigate={handleNavigation}
              href="/profile"
            >
              Profile
            </SidebarMenuItem>
            <SidebarMenuItem
              icon={LogOut}
              size="sm"
              onClick={() => console.log("Sign out")}
            >
              Sign Out
            </SidebarMenuItem>
          </div>
        </SidebarMenu>

        {/* 📄 Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-4 sm:p-8 bg-[var(--color-surface-subtle,#f8fafc)] overflow-auto">
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold text-[var(--color-text-heading,#111827)] mb-4">
                🎯 Refactored Sidebar Components
              </h1>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-[var(--color-surface,#ffffff)] rounded-lg border border-[var(--color-border,#e5e7eb)]">
                  <h3 className="font-semibold text-[var(--color-text-heading,#111827)] mb-2">
                    Current State
                  </h3>
                  <p className="text-sm text-[var(--color-text-body,#374151)]">
                    <strong>Current Page:</strong> {currentPath}
                  </p>
                  <p className="text-sm text-[var(--color-text-body,#374151)]">
                    <strong>Active Item:</strong> {activeItemId || "None"}
                  </p>
                  <p className="text-sm text-[var(--color-text-body,#374151)]">
                    <strong>Expanded Sections:</strong>{" "}
                    {expandedSections.join(", ") || "None"}
                  </p>
                </div>

                <div className="p-4 bg-[var(--color-surface,#ffffff)] rounded-lg border border-[var(--color-border,#e5e7eb)]">
                  <h3 className="font-semibold text-[var(--color-text-heading,#111827)] mb-2">
                    ✅ Architecture Benefits
                  </h3>
                  <ul className="text-sm text-[var(--color-text-body,#374151)] space-y-1">
                    <li>• Centralized styling utilities</li>
                    <li>• Design tokens with fallbacks</li>
                    <li>• DRY principles throughout</li>
                    <li>• Better TypeScript support</li>
                    <li>• Enhanced maintainability</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--color-surface,#ffffff)] rounded-lg border border-[var(--color-border,#e5e7eb)]">
                <h3 className="font-semibold text-[var(--color-text-heading,#111827)] mb-2">
                  🔧 Implementation Notes
                </h3>
                <p className="text-sm text-[var(--color-text-body,#374151)] leading-relaxed">
                  This sidebar now uses the same centralized architecture
                  pattern as your form components. All styling is managed
                  through{" "}
                  <code className="bg-[var(--color-surface-subtle,#f8fafc)] px-1 rounded">
                    sidebar.tsx
                  </code>{" "}
                  utilities, ensuring consistency and maintainability across
                  your design system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete sidebar implementation showcasing all refactored components using the centralized architecture pattern. Features smart navigation state management, design token integration, and robust accessibility support.",
      },
    },
  },
};

// 🎯 **Story: Different Sizes**
export const SidebarSizes: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg", "xl"] as const;

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Sidebar Size Variants</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sizes.map((size) => (
            <div
              key={size}
              className="border border-[var(--color-border,#e5e7eb)] rounded-lg overflow-hidden"
            >
              <div className="p-3 bg-[var(--color-surface-subtle,#f8fafc)] border-b border-[var(--color-border,#e5e7eb)]">
                <h3 className="font-medium">Size: {size}</h3>
              </div>
              <div className="h-64 flex">
                <SidebarMenu size={size}>
                  <SidebarBusinessLogo businessName="Portal Pro" />
                  <div className="flex-1 p-2">
                    <SidebarMenuItem icon={BarChart3} active>
                      Dashboard
                    </SidebarMenuItem>
                    <SidebarMenuItem icon={Users}>Users</SidebarMenuItem>
                  </div>
                </SidebarMenu>
                <div className="flex-1 p-4 bg-[var(--color-surface-subtle,#f8fafc)]">
                  <p className="text-sm text-[var(--color-text-muted,#6b7280)]">
                    Content area for {size} sidebar
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Showcases all available sidebar size variants using the centralized sizing system.",
      },
    },
  },
};

// 🎯 **Story: Individual Components**
export const IndividualComponents: Story = {
  render: () => {
    return (
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold">Individual Refactored Components</h2>

        {/* SidebarMenuItem Examples */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            SidebarMenuItem Variants
          </h3>
          <div className="space-y-2 max-w-xs">
            <SidebarMenuItem icon={BarChart3} active>
              Active Item
            </SidebarMenuItem>
            <SidebarMenuItem icon={Users}>Default Item</SidebarMenuItem>
            <SidebarMenuItem icon={Bell} badge="5">
              With Badge
            </SidebarMenuItem>
            <SidebarMenuItem icon={FileText} size="sm">
              Small Size
            </SidebarMenuItem>
            <SidebarMenuItem icon={Shield} disabled>
              Disabled
            </SidebarMenuItem>
          </div>
        </div>

        {/* SidebarProfile Example */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SidebarProfile</h3>
          <div className="max-w-xs">
            <SidebarProfile
              user={adminUser}
              onSwitchEntity={() => console.log("Switch entity")}
            />
          </div>
        </div>

        {/* SidebarBusinessLogo Example */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SidebarBusinessLogo</h3>
          <div className="max-w-xs">
            <SidebarBusinessLogo
              businessName="Portal Pro"
              onClick={() => console.log("Logo clicked")}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Individual component examples showing the refactored components in isolation with their various states and configurations.",
      },
    },
  },
};
