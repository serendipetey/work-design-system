// packages/components/src/ui/sidebar-menu.stories.tsx
// 🎯 ENHANCED STORYBOOK DOCUMENTATION
// Demonstrates industry-standard usage patterns and migration examples

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FileText, DollarSign, Users, BarChart3, Shield } from "lucide-react";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarProfile, type SidebarProfileData } from "./sidebar-profile";
import { SidebarBusinessLogo } from "./sidebar-business-logo";
import { SidebarMenuItem } from "./sidebar-menu-item";
import {
  SidebarMenuSection,
  SidebarMenuSectionRoot,
} from "./sidebar-menu-section";
import {
  SimpleSidebarLayout,
  SidebarLayout,
  DashboardLayout,
} from "./sidebar-layout";
import { createSidebarContainer } from "./sidebar";

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# 🎯 Industry-Standard SidebarMenu Component

A layout-first sidebar component that follows industry best practices and eliminates width constraint conflicts.

## ✅ Key Features
- **Layout-first architecture**: Container controls dimensions, component handles styling
- **Zero layout conflicts**: No competing width constraints
- **Pre-built solutions**: Ready-to-use layout components
- **Backward compatible**: Existing code continues to work
- **Flexible variants**: \`layout\`, \`standalone\`, \`unstyled\` modes

## 🚀 Quick Start

### Recommended Pattern (Layout-First)
\`\`\`tsx
import { createSidebarContainer, SidebarMenu } from "@serendipetey/components";

<div className={createSidebarContainer("md")}>
  <SidebarMenu variant="layout" className="h-full">
    {/* Content */}
  </SidebarMenu>
</div>
\`\`\`

### Pre-built Solution (Easiest)
\`\`\`tsx
import { SimpleSidebarLayout } from "@serendipetey/components";

<SimpleSidebarLayout 
  sidebarWidth="md"
  sidebarContent={<MySidebarContent />}
>
  <MainContent />
</SimpleSidebarLayout>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["layout", "standalone", "unstyled"],
      description: "Styling variant for different use cases",
      table: {
        defaultValue: { summary: "layout" },
      },
    },
    mode: {
      control: "select",
      options: ["layout", "standalone"],
      description: "Usage mode (auto-selects appropriate variant)",
      table: {
        defaultValue: { summary: "layout" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "⚠️ DEPRECATED: Use container width classes instead",
    },
    collapsed: {
      control: "boolean",
      description: "Collapse state for responsive behavior",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

// Mock data
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

const sampleNavigation = (
  <>
    <div className="p-4 border-b border-gray-200">
      <SidebarBusinessLogo businessName="Portal Pro" showTextWithLogo />
    </div>

    <div className="border-b border-gray-200 p-4">
      <SidebarProfile user={adminUser} position="middle" />
    </div>

    <div className="flex-1 overflow-y-auto p-4">
      <SidebarMenuSectionRoot>
        <SidebarMenuSection title="Main" icon={FileText}>
          <div className="space-y-1">
            <SidebarMenuItem icon={FileText} active>
              Dashboard
            </SidebarMenuItem>
            <SidebarMenuItem icon={DollarSign} badge="3">
              Funding
            </SidebarMenuItem>
            <SidebarMenuItem icon={Users}>Team</SidebarMenuItem>
          </div>
        </SidebarMenuSection>

        <SidebarMenuSection title="Analytics" icon={BarChart3}>
          <div className="space-y-1">
            <SidebarMenuItem icon={BarChart3}>Reports</SidebarMenuItem>
            <SidebarMenuItem icon={Shield}>Compliance</SidebarMenuItem>
          </div>
        </SidebarMenuSection>
      </SidebarMenuSectionRoot>
    </div>
  </>
);

// 🎯 STORY 1: Layout-First Pattern (Recommended)
export const LayoutFirstPattern: Story = {
  render: () => (
    <div className="h-screen flex bg-gray-50">
      {/* ✅ RECOMMENDED: Container controls width */}
      <div className={createSidebarContainer("md")}>
        <SidebarMenu variant="layout" className="h-full">
          {sampleNavigation}
        </SidebarMenu>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ✅ Layout-First Pattern
          </h1>
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-3">Why This Works</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                • Container (<code>createSidebarContainer("md")</code>) controls
                width
              </li>
              <li>
                • Component (<code>SidebarMenu variant="layout"</code>) handles
                styling
              </li>
              <li>• Zero layout conflicts with consuming applications</li>
              <li>
                • Follows industry standards (Chakra UI, Mantine, Material-UI)
              </li>
              <li>• Easy to customize and maintain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "**Recommended approach**: Container controls layout, component handles styling. This eliminates width constraint conflicts.",
      },
    },
  },
};

// 🎯 STORY 2: Pre-built Layout Solutions
export const PrebuiltLayouts: Story = {
  render: () => {
    const [activeLayout, setActiveLayout] = useState<
      "simple" | "full" | "dashboard"
    >("simple");

    const renderLayout = () => {
      switch (activeLayout) {
        case "simple":
          return (
            <SimpleSidebarLayout
              sidebarWidth="md"
              sidebarContent={sampleNavigation}
            >
              <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  SimpleSidebarLayout
                </h1>
                <p className="text-gray-600">
                  The easiest way to add a sidebar to your app. Just provide
                  content and you're done!
                </p>
              </div>
            </SimpleSidebarLayout>
          );

        case "full":
          return (
            <SidebarLayout
              sidebarWidth="lg"
              sidebarVariant="layout"
              sidebarContent={sampleNavigation}
              collapsible
            >
              <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  SidebarLayout
                </h1>
                <p className="text-gray-600">
                  Full-featured layout with collapsible sidebar and advanced
                  customization options.
                </p>
              </div>
            </SidebarLayout>
          );

        case "dashboard":
          return (
            <DashboardLayout
              sidebarWidth="md"
              sidebarContent={sampleNavigation}
              header={
                <div className="p-4">
                  <h1 className="text-xl font-semibold">Dashboard Header</h1>
                </div>
              }
              footer={
                <div className="p-2 text-center text-sm text-gray-500">
                  © 2024 Your Company
                </div>
              }
            >
              <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  DashboardLayout
                </h1>
                <p className="text-gray-600">
                  Complete dashboard solution with header, footer, and sidebar.
                </p>
              </div>
            </DashboardLayout>
          );
      }
    };

    return (
      <div className="h-screen flex flex-col">
        {/* Layout Selector */}
        <div className="bg-white border-b p-4">
          <div className="flex gap-2">
            {[
              { id: "simple", label: "SimpleSidebarLayout" },
              { id: "full", label: "SidebarLayout" },
              { id: "dashboard", label: "DashboardLayout" },
            ].map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout.id as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLayout === layout.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {layout.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Layout */}
        <div className="flex-1">{renderLayout()}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Ready-to-use layout components that eliminate boilerplate and ensure correct implementation.",
      },
    },
  },
};

// 🎯 STORY 3: Migration Examples
export const MigrationExamples: Story = {
  render: () => (
    <div className="h-screen flex bg-gray-50">
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Migration Examples
            </h1>
            <p className="text-gray-600">
              How to upgrade from the old pattern to the new layout-first
              approach.
            </p>
          </div>

          {/* Before/After Examples */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Old Pattern */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-4">
                ❌ Old Pattern (Causes Issues)
              </h2>
              <pre className="bg-red-100 p-4 rounded text-sm overflow-x-auto">
                {`// Component controls width - causes conflicts
<SidebarMenu size="md">
  <SidebarBusinessLogo />
  <SidebarProfile />
  {/* Content */}
</SidebarMenu>`}
              </pre>
              <div className="mt-4 text-sm text-red-700">
                <strong>Problems:</strong>
                <ul className="list-disc list-inside mt-2">
                  <li>Width conflicts with layout containers</li>
                  <li>Difficult to integrate into flex layouts</li>
                  <li>Component controls what should be layout concern</li>
                </ul>
              </div>
            </div>

            {/* New Pattern */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                ✅ New Pattern (Industry Standard)
              </h2>
              <pre className="bg-green-100 p-4 rounded text-sm overflow-x-auto">
                {`// Container controls width, component handles styling
<div className={createSidebarContainer("md")}>
  <SidebarMenu variant="layout" className="h-full">
    <SidebarBusinessLogo />
    <SidebarProfile />
    {/* Content */}
  </SidebarMenu>
</div>`}
              </pre>
              <div className="mt-4 text-sm text-green-700">
                <strong>Benefits:</strong>
                <ul className="list-disc list-inside mt-2">
                  <li>Clear separation of layout vs styling concerns</li>
                  <li>Zero conflicts with consuming applications</li>
                  <li>Follows industry best practices</li>
                  <li>Easy to customize and maintain</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pre-built Solution */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              🚀 Even Better: Pre-built Solution
            </h2>
            <pre className="bg-blue-100 p-4 rounded text-sm overflow-x-auto">
              {`// Simplest approach with zero boilerplate
<SimpleSidebarLayout 
  sidebarWidth="md"
  sidebarContent={<MySidebarContent />}
>
  <MainContent />
</SimpleSidebarLayout>`}
            </pre>
          </div>

          {/* Code Comparison Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold">Code Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Aspect
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Old Pattern
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      New Pattern
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">
                      Width Control
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      Component (❌ Conflicts)
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600">
                      Container (✅ Clean)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">
                      Flexibility
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">Limited</td>
                    <td className="px-6 py-4 text-sm text-green-600">
                      Highly Flexible
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">
                      Layout Integration
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      Difficult
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600">
                      Seamless
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">
                      Maintenance
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">Complex</td>
                    <td className="px-6 py-4 text-sm text-green-600">Simple</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete migration examples showing how to upgrade from the old pattern to the new industry-standard approach.",
      },
    },
  },
};

// 🎯 STORY 4: Width Variants Demo
export const WidthVariants: Story = {
  render: () => {
    const [selectedWidth, setSelectedWidth] = useState<
      "sm" | "md" | "lg" | "xl" | "2xl"
    >("md");

    const widthOptions = [
      { id: "sm", label: "Small (240px)", value: "sm" as const },
      { id: "md", label: "Medium (256px)", value: "md" as const },
      { id: "lg", label: "Large (288px)", value: "lg" as const },
      { id: "xl", label: "XL (320px)", value: "xl" as const },
      { id: "2xl", label: "2XL (384px)", value: "2xl" as const },
    ];

    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Width Selector */}
        <div className="bg-white border-b p-4">
          <h2 className="text-lg font-semibold mb-3">Sidebar Width Options</h2>
          <div className="flex flex-wrap gap-2">
            {widthOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedWidth(option.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedWidth === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layout with Selected Width */}
        <div className="flex-1 flex">
          <div className={createSidebarContainer(selectedWidth)}>
            <SidebarMenu variant="layout" className="h-full">
              {sampleNavigation}
            </SidebarMenu>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Width:{" "}
                {widthOptions.find((w) => w.value === selectedWidth)?.label}
              </h1>
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Implementation</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  {`<div className={createSidebarContainer("${selectedWidth}")}>
  <SidebarMenu variant="layout" className="h-full">
    {/* Content */}
  </SidebarMenu>
</div>`}
                </pre>
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
          "Demonstrates different sidebar widths and how to control them using the container approach.",
      },
    },
  },
};

// 🎯 Default Story
export const Default: Story = {
  args: {
    variant: "layout",
    mode: "layout",
  },
  render: (args) => (
    <div className="h-96 flex bg-gray-50">
      <div className={createSidebarContainer("md")}>
        <SidebarMenu {...args} className="h-full">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">Interactive Demo</h3>
            <p className="text-sm text-gray-600 mt-1">
              Use the controls below to test different configurations.
            </p>
          </div>
        </SidebarMenu>
      </div>
      <div className="flex-1 p-6">
        <p className="text-gray-600">Main content area</p>
      </div>
    </div>
  ),
};
