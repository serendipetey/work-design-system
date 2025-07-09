// packages/components/src/ui/sidebar-menu.stories.tsx
// 🎯 COMPLETE WORKING STORYBOOK: Simple Examples First
// Shows both simple usage and smart layout detection

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

// Simple navigation state management for stories
function useSimpleNavigation(initialPath: string = "/dashboard") {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "funding",
    "compliance",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
  };

  // Simple active item detection
  const getActiveItemId = () => {
    if (currentPath === "/dashboard") return "dashboard";
    if (currentPath.startsWith("/funding/apply")) return "apply-funding";
    if (currentPath.startsWith("/funding/returns")) return "submit-returns";
    if (currentPath.startsWith("/funding/applications"))
      return "view-applications";
    if (currentPath.startsWith("/compliance")) return "compliance-overview";
    if (currentPath.startsWith("/notifications")) return "notifications";
    return null;
  };

  return {
    currentPath,
    expandedSections,
    activeItemId: getActiveItemId(),
    toggleSection,
    handleNavigation,
    isSectionExpanded: (id: string) => expandedSections.includes(id),
  };
}

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# SidebarMenu - Simple & Smart

A sidebar component that **just works** with intelligent layout detection.

## ✅ Key Features
- **Simple API**: \`<SidebarMenu size="md">\` handles everything
- **Smart detection**: Automatically adapts to layout containers
- **No conflicts**: Works perfectly in flex layouts and consuming apps
- **Complete styling**: Rounded corners, borders, shadows out of the box

## 🚀 Basic Usage

\`\`\`tsx
// This just works - no containers, no complexity
<SidebarMenu size="md">
  <SidebarBusinessLogo businessName="My App" />
  <SidebarProfile user={userData} />
  {/* Navigation content */}
</SidebarMenu>
\`\`\`

## 🎯 Layout Integration

\`\`\`tsx
// Container constrains width, component auto-adapts
<div className="flex h-screen">
  <div className="w-64">
    <SidebarMenu size="md" className="h-full">
      {/* Same content, automatically adapts */}
    </SidebarMenu>
  </div>
  <div className="flex-1">
    {/* Page content */}
  </div>
</div>
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
    variant: {
      control: { type: "select" },
      options: ["standalone", "layout"],
      description: "Styling variant (usually auto-detected)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 👤 Sample User Data
const sampleUser: SidebarProfileData = {
  contact: {
    name: "Jane Doe",
    role: "Administrator",
  },
  entity: {
    name: "Acme Corp",
    id: "acme-corp-1",
  },
};

// 🎯 **Story 1: Simple Usage (Primary Example)**
export const SimpleUsage: Story = {
  args: {
    size: "md",
  },
  render: (args) => {
    const navigation = useSimpleNavigation("/funding/returns");

    const handleLogoClick = () => {
      console.log("Navigate to dashboard");
      navigation.handleNavigation("/dashboard");
    };

    return (
      <div className="h-screen bg-[var(--color-background,#f8fafc)] p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ✨ Simple Usage
            </h1>
            <p className="text-gray-600">
              Just use <code>&lt;SidebarMenu size="md"&gt;</code> - it works
              perfectly!
            </p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            {/* 🎯 This is the main example - simple and complete */}
            <SidebarMenu {...args}>
              {/* Business Logo */}
              <SidebarBusinessLogo
                businessName="Portal Pro"
                logoUrl="https://via.placeholder.com/140x45/1e40af/ffffff?text=Portal+Pro"
                onClick={handleLogoClick}
              />

              {/* User Profile */}
              <SidebarProfile
                user={sampleUser}
                onSwitchEntity={() => console.log("Switch entity")}
              />

              {/* Navigation Content */}
              <div className="flex-1 py-4">
                {/* Standalone Items */}
                <div className="px-2 mb-4 space-y-1">
                  <SidebarMenuItem
                    icon={BarChart3}
                    active={navigation.activeItemId === "dashboard"}
                    onNavigate={navigation.handleNavigation}
                    href="/dashboard"
                  >
                    Dashboard
                  </SidebarMenuItem>
                </div>

                {/* Collapsible Sections */}
                <SidebarMenuSectionRoot
                  value={navigation.expandedSections}
                  onValueChange={() => {}}
                >
                  {/* Funding Section */}
                  <SidebarMenuSection
                    title="Funding"
                    icon={DollarSign}
                    value="funding"
                    expanded={navigation.isSectionExpanded("funding")}
                    onToggle={() => navigation.toggleSection("funding")}
                  >
                    <div className="space-y-1 px-2">
                      <SidebarMenuItem
                        size="sm"
                        active={navigation.activeItemId === "apply-funding"}
                        onNavigate={navigation.handleNavigation}
                        href="/funding/apply"
                      >
                        Apply for Funding
                      </SidebarMenuItem>
                      <SidebarMenuItem
                        size="sm"
                        active={navigation.activeItemId === "submit-returns"}
                        onNavigate={navigation.handleNavigation}
                        href="/funding/returns"
                        badge="3"
                      >
                        Submit Returns
                      </SidebarMenuItem>
                      <SidebarMenuItem
                        size="sm"
                        active={navigation.activeItemId === "view-applications"}
                        onNavigate={navigation.handleNavigation}
                        href="/funding/applications"
                      >
                        View Applications
                      </SidebarMenuItem>
                    </div>
                  </SidebarMenuSection>

                  {/* Compliance Section */}
                  <SidebarMenuSection
                    title="Compliance"
                    icon={Shield}
                    value="compliance"
                    expanded={navigation.isSectionExpanded("compliance")}
                    onToggle={() => navigation.toggleSection("compliance")}
                  >
                    <div className="space-y-1 px-2">
                      <SidebarMenuItem
                        size="sm"
                        active={
                          navigation.activeItemId === "compliance-overview"
                        }
                        onNavigate={navigation.handleNavigation}
                        href="/compliance"
                      >
                        Overview
                      </SidebarMenuItem>
                      <SidebarMenuItem
                        size="sm"
                        onNavigate={navigation.handleNavigation}
                        href="/compliance/audits"
                      >
                        Audit Reports
                      </SidebarMenuItem>
                    </div>
                  </SidebarMenuSection>
                </SidebarMenuSectionRoot>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-[var(--color-border,#e5e7eb)] p-2 space-y-1">
                <SidebarMenuItem
                  icon={Bell}
                  size="sm"
                  active={navigation.currentPath === "/notifications"}
                  onNavigate={navigation.handleNavigation}
                  href="/notifications"
                  badge="5"
                >
                  Notifications
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
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              ✅ What You Get Automatically:
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Perfect rounded corners and shadows</li>
              <li>• Proper width sizing (w-64 for "md")</li>
              <li>• Complete border styling</li>
              <li>• All design tokens and theming</li>
              <li>• Responsive and accessible</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The primary usage pattern - just use `<SidebarMenu size="md">` and it works perfectly with complete styling.',
      },
    },
  },
};

// 🎯 **Story 2: Layout Integration (Shows Smart Detection)**
export const LayoutIntegration: Story = {
  args: {
    size: "md",
  },
  render: (args) => {
    const navigation = useSimpleNavigation("/funding/apply");

    // Simplified navigation content for demo
    const sidebarContent = (
      <>
        <SidebarBusinessLogo businessName="Smart Layout Demo" />
        <SidebarProfile user={sampleUser} />

        <div className="flex-1 p-2 space-y-1">
          <SidebarMenuItem
            icon={BarChart3}
            active={navigation.activeItemId === "dashboard"}
            onNavigate={navigation.handleNavigation}
            href="/dashboard"
          >
            Dashboard
          </SidebarMenuItem>
          <SidebarMenuItem
            icon={DollarSign}
            active={navigation.currentPath.startsWith("/funding")}
            badge="3"
          >
            Funding
          </SidebarMenuItem>
          <SidebarMenuItem icon={Users}>Team</SidebarMenuItem>
        </div>
      </>
    );

    return (
      <div className="h-screen bg-gray-50">
        <div className="flex h-full">
          {/* 🎯 Container constrains width - component auto-adapts */}
          <div className="w-64">
            <SidebarMenu {...args} className="h-full">
              {sidebarContent}
            </SidebarMenu>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b border-gray-200 p-4">
              <h1 className="text-xl font-semibold text-gray-900">
                🎯 Smart Layout Detection Demo
              </h1>
            </header>

            <main className="flex-1 p-6 overflow-auto">
              <div className="max-w-3xl">
                <div className="bg-white rounded-lg border p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">How It Works</h2>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <strong>Container:</strong>{" "}
                      <code>&lt;div className="w-64"&gt;</code> constrains the
                      width
                    </p>
                    <p>
                      <strong>Component:</strong>{" "}
                      <code>
                        &lt;SidebarMenu size="md" className="h-full"&gt;
                      </code>{" "}
                      auto-detects the constraint
                    </p>
                    <p>
                      <strong>Result:</strong> No width conflicts, perfect
                      layout integration
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    ✅ Smart Detection Features:
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Automatically removes component width when container has
                      width
                    </li>
                    <li>
                      • Adapts border styling (no rounded corners, just
                      border-right)
                    </li>
                    <li>
                      • Perfect for flex layouts and consuming applications
                    </li>
                    <li>
                      • No API changes needed - same component, smart behavior
                    </li>
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Container integration demo - shows how the component automatically adapts when placed in a width-constrained container.",
      },
    },
  },
};

// 🎯 **Story 3: Flat Navigation (Clickable Sections, No Expansion)**
export const FlatNavigation: Story = {
  args: {
    size: "md",
  },
  render: (args) => {
    const [currentPath, setCurrentPath] = useState("/funding");

    const handleNavigation = (path: string) => {
      console.log("Navigate to:", path);
      setCurrentPath(path);
    };

    const handleLogoClick = () => {
      console.log("Navigate to dashboard");
      setCurrentPath("/dashboard");
    };

    return (
      <div className="h-screen bg-[var(--color-background,#f8fafc)] p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              📋 Flat Navigation Pattern
            </h1>
            <p className="text-gray-600">
              Sections as direct navigation links - simpler, cleaner UI pattern
            </p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <SidebarMenu {...args}>
              {/* Business Logo */}
              <SidebarBusinessLogo
                businessName="Portal Pro"
                logoUrl="https://via.placeholder.com/140x45/1e40af/ffffff?text=Portal+Pro"
                onClick={handleLogoClick}
              />

              {/* User Profile */}
              <SidebarProfile
                user={sampleUser}
                onSwitchEntity={() => console.log("Switch entity")}
              />

              {/* Flat Navigation - All Items Clickable */}
              <div className="flex-1 py-4">
                <div className="px-2 space-y-1">
                  {/* Primary Navigation */}
                  <SidebarMenuItem
                    icon={BarChart3}
                    active={currentPath === "/dashboard"}
                    onNavigate={handleNavigation}
                    href="/dashboard"
                  >
                    Dashboard
                  </SidebarMenuItem>

                  {/* Section-Level Navigation (no sub-items) */}
                  <SidebarMenuItem
                    icon={DollarSign}
                    active={currentPath.startsWith("/funding")}
                    onNavigate={handleNavigation}
                    href="/funding"
                    badge="3"
                  >
                    Funding
                  </SidebarMenuItem>

                  <SidebarMenuItem
                    icon={Shield}
                    active={currentPath.startsWith("/compliance")}
                    onNavigate={handleNavigation}
                    href="/compliance"
                  >
                    Compliance
                  </SidebarMenuItem>

                  <SidebarMenuItem
                    icon={FileText}
                    active={currentPath.startsWith("/reports")}
                    onNavigate={handleNavigation}
                    href="/reports"
                  >
                    Reports
                  </SidebarMenuItem>

                  <SidebarMenuItem
                    icon={Users}
                    active={currentPath.startsWith("/team")}
                    onNavigate={handleNavigation}
                    href="/team"
                  >
                    Team Management
                  </SidebarMenuItem>
                </div>
              </div>

              {/* Bottom Actions */}
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
                  icon={LogOut}
                  size="sm"
                  onClick={() => console.log("Sign out")}
                >
                  Sign Out
                </SidebarMenuItem>
              </div>
            </SidebarMenu>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                ✅ Flat Navigation Benefits:
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Simpler mental model for users</li>
                <li>• Cleaner visual hierarchy</li>
                <li>• Faster navigation (no expanding/collapsing)</li>
                <li>• Better for mobile interfaces</li>
                <li>• Easier to implement and maintain</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                📊 Current State:
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Active Page:</strong> {currentPath}
                </p>
                <p>
                  <strong>Navigation Style:</strong> Flat (section-level)
                </p>
                <p>
                  <strong>Total Items:</strong> 7 main sections
                </p>
                <p>
                  <strong>Badge Notifications:</strong> Funding (3),
                  Notifications (5)
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
          "Alternative navigation pattern with sections as direct links rather than expandable containers. Great for simpler apps or mobile interfaces.",
      },
    },
  },
};

// 🎯 **Story 4: Size Variants**
export const SizeVariants: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg", "xl"] as const;

    const sampleContent = (
      <>
        <SidebarBusinessLogo businessName="Demo" />
        <div className="flex-1 p-2 space-y-1">
          <SidebarMenuItem icon={BarChart3} active>
            Dashboard
          </SidebarMenuItem>
          <SidebarMenuItem icon={Users}>Users</SidebarMenuItem>
          <SidebarMenuItem icon={FileText} badge="3">
            Documents
          </SidebarMenuItem>
        </div>
      </>
    );

    return (
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold mb-2">Size Variants</h1>
          <p className="text-gray-600">
            All sizes work perfectly with the simple API
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sizes.map((size) => (
            <div
              key={size}
              className="bg-white rounded-lg border overflow-hidden"
            >
              <div className="p-3 bg-gray-50 border-b">
                <h3 className="font-medium">Size: {size}</h3>
                <p className="text-sm text-gray-600">
                  <code>&lt;SidebarMenu size="{size}"&gt;</code>
                </p>
              </div>
              <div className="h-64 flex">
                <SidebarMenu size={size}>{sampleContent}</SidebarMenu>
                <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center">
                  <span className="text-sm text-gray-500">Page Content</span>
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
        story: "All available size variants with the simple API pattern.",
      },
    },
  },
};

// 🎯 **Story 5: Import Tester Pattern (Real-World Usage)**
export const ImportTesterPattern: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState("navigation");

    const handleNavigation = (page: string) => {
      setCurrentPage(page);
    };

    return (
      <div className="flex h-screen bg-gray-50">
        {/* 🎯 This is the exact pattern from import tester */}
        <div className="w-64">
          <SidebarMenu size="md" className="h-full">
            <SidebarBusinessLogo businessName="Design System" />
            <SidebarProfile user={sampleUser} position="middle" />

            <div className="flex-1 overflow-y-auto p-4">
              <SidebarMenuSectionRoot>
                <SidebarMenuSection title="Form Components" icon={FileText}>
                  <div className="space-y-1">
                    <SidebarMenuItem
                      icon={FileText}
                      active={currentPage === "form"}
                      onClick={() => handleNavigation("form")}
                    >
                      Buttons & Actions
                    </SidebarMenuItem>
                    <SidebarMenuItem icon={Users}>Input Fields</SidebarMenuItem>
                  </div>
                </SidebarMenuSection>

                <SidebarMenuSection title="Navigation" icon={BarChart3}>
                  <div className="space-y-1">
                    <SidebarMenuItem
                      icon={BarChart3}
                      active={currentPage === "navigation"}
                      onClick={() => handleNavigation("navigation")}
                    >
                      Sidebar Components
                    </SidebarMenuItem>
                    <SidebarMenuItem icon={DollarSign}>
                      Menu Items
                    </SidebarMenuItem>
                  </div>
                </SidebarMenuSection>
              </SidebarMenuSectionRoot>
            </div>
          </SidebarMenu>
        </div>

        {/* Main content - this is what was broken before */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Import Tester Layout Pattern
            </h2>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl">
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  ✅ Layout Problem Solved!
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-green-50 border border-green-200 rounded">
                    <strong className="text-green-800">Before (Broken):</strong>
                    <br />
                    <code className="text-green-700">
                      SidebarMenu size="md" → w-72 (288px) conflicts with
                      container w-64 (256px)
                    </code>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <strong className="text-blue-800">After (Fixed):</strong>
                    <br />
                    <code className="text-blue-700">
                      Smart detection → respects container width, adapts styling
                      automatically
                    </code>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                    <strong>Current page:</strong> {currentPage}
                    <br />
                    <strong>Container:</strong> w-64 (256px)
                    <br />
                    <strong>Component:</strong> Auto-adapted to container
                    <br />
                    <strong>Page content:</strong> Uses remaining space
                    perfectly
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exact pattern from import tester - shows how the smart detection fixes layout conflicts in consuming applications.",
      },
    },
  },
};
