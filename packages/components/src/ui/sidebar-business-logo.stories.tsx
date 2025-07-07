// packages/components/src/ui/sidebar-business-logo.stories.tsx
// 🎯 Comprehensive stories for the refactored SidebarBusinessLogo component
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SidebarBusinessLogo } from "./sidebar-business-logo";

const meta: Meta<typeof SidebarBusinessLogo> = {
  title: "Navigation/SidebarBusinessLogo",
  component: SidebarBusinessLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# SidebarBusinessLogo

A flexible business logo component for sidebar navigation with enhanced logo display options and design tokens architecture.

## Features
- **Logo Only**: Display just the logo image
- **Logo + Text**: Show logo with business name alongside
- **Text Only**: Display only business name (no icon fallback)
- **Icon Fallback**: Default fallback with building icon + text
- **Clickable**: Optional click handling for navigation
- **Design Tokens**: Uses design tokens with robust fallbacks
- **Accessibility**: Full screen reader and keyboard support

## Architecture
- ✅ Design tokens with robust fallbacks
- ✅ Centralized CVA styling from sidebar.tsx
- ✅ Dynamic CSS injection for interactive states
- ✅ Self-contained with no external dependencies
        `,
      },
    },
  },
  argTypes: {
    businessName: {
      control: "text",
      description: "Business/company name for display and alt text",
    },
    logoUrl: {
      control: "text",
      description: "URL to logo image",
    },
    width: {
      control: { type: "range", min: 40, max: 200, step: 10 },
      description: "Logo image width (for logo-only mode)",
    },
    height: {
      control: { type: "range", min: 20, max: 100, step: 5 },
      description: "Logo image height (for logo-only mode)",
    },
    showTextWithLogo: {
      control: "boolean",
      description: "Show business name alongside logo image",
    },
    textOnly: {
      control: "boolean",
      description: "Show only text, no icon fallback",
    },
    onClick: {
      action: "clicked",
      description: "Click handler for navigation (makes component clickable)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarBusinessLogo>;

// 🎯 **Story: Default (Fallback)**
export const Default: Story = {
  args: {
    businessName: "Your Business",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default fallback display with building icon and business name when no logo is provided.",
      },
    },
  },
};

// 🎯 **Story: Logo Only**
export const LogoOnly: Story = {
  args: {
    businessName: "Acme Corporation",
    logoUrl: "https://via.placeholder.com/120x40/1e40af/ffffff?text=ACME",
    width: 120,
    height: 40,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Display only the logo image without text. Perfect for compact sidebars or when the logo includes text.",
      },
    },
  },
};

// 🎯 **Story: Logo with Text**
export const LogoWithText: Story = {
  args: {
    businessName: "Portal Pro",
    logoUrl: "https://via.placeholder.com/32x32/1e40af/ffffff?text=P",
    showTextWithLogo: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Show logo image alongside business name. Logo is automatically sized to 32x32 when used with text.",
      },
    },
  },
};

// 🎯 **Story: Text Only**
export const TextOnly: Story = {
  args: {
    businessName: "Design System Co",
    textOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Display only the business name without any icon fallback. Clean and minimal.",
      },
    },
  },
};

// 🎯 **Story: Clickable Logo**
export const ClickableLogo: Story = {
  args: {
    businessName: "Interactive Corp",
    logoUrl:
      "https://via.placeholder.com/120x40/1e40af/ffffff?text=INTERACTIVE",
    onClick: () => alert("Navigating to home page..."),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Clickable logo that can handle navigation. Shows hover states and focus rings for accessibility.",
      },
    },
  },
};

// 🎯 **Story: All Logo Options Comparison**
export const LogoOptionsComparison: Story = {
  render: () => {
    const [clickedOption, setClickedOption] = useState<string | null>(null);

    const logoOptions = [
      {
        title: "Logo Only",
        description: "Standard logo image display",
        props: {
          businessName: "Logo Corp",
          logoUrl: "https://via.placeholder.com/120x40/1e40af/ffffff?text=LOGO",
        },
      },
      {
        title: "Logo + Text",
        description: "Logo with business name",
        props: {
          businessName: "Logo & Text Co",
          logoUrl: "https://via.placeholder.com/32x32/059669/ffffff?text=LT",
          showTextWithLogo: true,
        },
      },
      {
        title: "Text Only",
        description: "Clean text-only display",
        props: {
          businessName: "Text Only Inc",
          textOnly: true,
        },
      },
      {
        title: "Icon Fallback",
        description: "Default fallback with icon",
        props: {
          businessName: "Fallback Corp",
        },
      },
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-heading,#111827)] mb-2">
            Logo Display Options
          </h2>
          <p className="text-[var(--color-text-body,#374151)]">
            Choose the right logo presentation for your use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {logoOptions.map((option, index) => (
            <div
              key={index}
              className="border border-[var(--color-border,#e5e7eb)] rounded-lg overflow-hidden bg-[var(--color-surface,#ffffff)]"
            >
              <div className="p-3 bg-[var(--color-surface-subtle,#f8fafc)] border-b border-[var(--color-border,#e5e7eb)]">
                <h3 className="font-semibold text-sm text-[var(--color-text-heading,#111827)]">
                  {option.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted,#6b7280)] mt-1">
                  {option.description}
                </p>
              </div>
              <div className="bg-[var(--color-surface,#ffffff)]">
                <SidebarBusinessLogo
                  {...option.props}
                  onClick={() => setClickedOption(option.title)}
                />
              </div>
            </div>
          ))}
        </div>

        {clickedOption && (
          <div className="p-4 bg-[var(--color-primary-50,#eff6ff)] border border-[var(--color-primary-200,#bfdbfe)] rounded-lg">
            <p className="text-[var(--color-primary-700,#1d4ed8)]">
              <strong>Clicked:</strong> {clickedOption} option
            </p>
            <button
              onClick={() => setClickedOption(null)}
              className="text-sm text-[var(--color-primary-600,#2563eb)] hover:text-[var(--color-primary-700,#1d4ed8)] mt-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compare all logo display options side by side. Each option is clickable to demonstrate interactivity.",
      },
    },
  },
};

// 🎯 **Story: Different Business Names**
export const DifferentBusinessNames: Story = {
  render: () => {
    const businesses = [
      {
        name: "A",
        logoUrl: "https://via.placeholder.com/32x32/dc2626/ffffff?text=A",
      },
      {
        name: "Medium Length Co",
        logoUrl: "https://via.placeholder.com/32x32/059669/ffffff?text=ML",
      },
      {
        name: "Very Long Business Name Corporation",
        logoUrl: "https://via.placeholder.com/32x32/d97706/ffffff?text=VL",
      },
      {
        name: "SpecialChars & Symbols Inc.",
        logoUrl: "https://via.placeholder.com/32x32/7c3aed/ffffff?text=SC",
      },
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[var(--color-text-heading,#111827)] mb-2">
            Text Truncation Examples
          </h2>
          <p className="text-[var(--color-text-body,#374151)]">
            See how different business name lengths are handled
          </p>
        </div>

        <div className="space-y-4">
          {businesses.map((business, index) => (
            <div
              key={index}
              className="border border-[var(--color-border,#e5e7eb)] rounded-lg overflow-hidden bg-[var(--color-surface,#ffffff)]"
            >
              <div className="p-2 bg-[var(--color-surface-subtle,#f8fafc)] border-b border-[var(--color-border,#e5e7eb)]">
                <p className="text-xs text-[var(--color-text-muted,#6b7280)]">
                  Business name: "{business.name}"
                </p>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <SidebarBusinessLogo
                    businessName={business.name}
                    logoUrl={business.logoUrl}
                    showTextWithLogo={true}
                  />
                </div>
                <div className="flex-1">
                  <SidebarBusinessLogo
                    businessName={business.name}
                    textOnly={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[var(--color-surface-subtle,#f8fafc)] rounded-lg border border-[var(--color-border,#e5e7eb)]">
          <h3 className="font-semibold text-[var(--color-text-heading,#111827)] mb-2">
            📐 Text Handling Features
          </h3>
          <ul className="text-sm text-[var(--color-text-body,#374151)] space-y-1">
            <li>• Automatic text truncation with ellipsis</li>
            <li>• Maximum width constraint (140px)</li>
            <li>• Proper accessibility with full text in alt/aria-label</li>
            <li>• Responsive font sizing with design tokens</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how the component handles different business name lengths with automatic truncation.",
      },
    },
  },
};

// 🎯 **Story: In Sidebar Context**
export const InSidebarContext: Story = {
  render: () => {
    const [isClickable, setIsClickable] = useState(true);
    const [logoOption, setLogoOption] = useState<
      "logo" | "logoText" | "textOnly" | "fallback"
    >("logo");

    const getLogoProps = () => {
      const baseProps = {
        businessName: "Portal Pro",
        onClick: isClickable ? () => alert("Home navigation") : undefined,
      };

      switch (logoOption) {
        case "logo":
          return {
            ...baseProps,
            logoUrl:
              "https://via.placeholder.com/120x40/1e40af/ffffff?text=PORTAL",
          };
        case "logoText":
          return {
            ...baseProps,
            logoUrl: "https://via.placeholder.com/32x32/1e40af/ffffff?text=P",
            showTextWithLogo: true,
          };
        case "textOnly":
          return { ...baseProps, textOnly: true };
        case "fallback":
        default:
          return baseProps;
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[var(--color-text-heading,#111827)] mb-2">
            Sidebar Integration Demo
          </h2>
          <p className="text-[var(--color-text-body,#374151)]">
            See how the logo looks in a real sidebar context
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[var(--color-text-body,#374151)]">
              Logo Option:
            </label>
            <select
              value={logoOption}
              onChange={(e) => setLogoOption(e.target.value as any)}
              className="px-3 py-1 border border-[var(--color-border,#e5e7eb)] rounded-md text-sm"
            >
              <option value="logo">Logo Only</option>
              <option value="logoText">Logo + Text</option>
              <option value="textOnly">Text Only</option>
              <option value="fallback">Icon Fallback</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-body,#374151)]">
            <input
              type="checkbox"
              checked={isClickable}
              onChange={(e) => setIsClickable(e.target.checked)}
              className="rounded border-[var(--color-border,#e5e7eb)]"
            />
            Make Clickable
          </label>
        </div>

        {/* Sidebar Demo */}
        <div className="max-w-md mx-auto border border-[var(--color-border,#e5e7eb)] rounded-lg overflow-hidden">
          <SidebarBusinessLogo {...getLogoProps()} />

          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--color-text-body,#374151)] hover:bg-[var(--color-navy-100,#f1f5f9)] rounded-md cursor-pointer">
              📊 Dashboard
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium bg-[var(--color-navy-600,#1e40af)] text-[var(--color-white,#ffffff)] rounded-md">
              👥 Users
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--color-text-body,#374151)] hover:bg-[var(--color-navy-100,#f1f5f9)] rounded-md cursor-pointer">
              📁 Files
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--color-text-body,#374151)] hover:bg-[var(--color-navy-100,#f1f5f9)] rounded-md cursor-pointer">
              ⚙️ Settings
            </div>
          </div>
        </div>

        {/* Architecture Info */}
        <div className="p-4 bg-[var(--color-surface,#ffffff)] rounded-lg border border-[var(--color-border,#e5e7eb)]">
          <h3 className="font-semibold text-[var(--color-text-heading,#111827)] mb-2">
            🎯 Architecture Highlights
          </h3>
          <ul className="text-sm text-[var(--color-text-body,#374151)] space-y-1">
            <li>
              • Design tokens with robust fallbacks:{" "}
              <code className="bg-[var(--color-surface-subtle,#f8fafc)] px-1 rounded">
                var(--token, fallback)
              </code>
            </li>
            <li>• Centralized CVA styling from sidebar.tsx</li>
            <li>• Dynamic CSS injection for focus states</li>
            <li>• Self-contained with no external dependencies</li>
            <li>• Full TypeScript support and accessibility</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing the logo component in a realistic sidebar context with different configuration options.",
      },
    },
  },
};

// 🎯 **Story: Accessibility Demo**
export const AccessibilityDemo: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[var(--color-text-heading,#111827)] mb-2">
            Accessibility Features
          </h2>
          <p className="text-[var(--color-text-body,#374151)]">
            Demonstrating screen reader and keyboard navigation support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--color-text-heading,#111827)]">
              Non-clickable Logos
            </h3>
            <div className="space-y-2">
              <div className="border border-[var(--color-border,#e5e7eb)] rounded-lg overflow-hidden">
                <SidebarBusinessLogo
                  businessName="Accessible Corp"
                  logoUrl="https://via.placeholder.com/120x40/1e40af/ffffff?text=ACCESSIBLE"
                />
              </div>
              <p className="text-xs text-[var(--color-text-muted,#6b7280)]">
                Proper alt text: "Accessible Corp logo"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--color-text-heading,#111827)]">
              Clickable Logos
            </h3>
            <div className="space-y-2">
              <div className="border border-[var(--color-border,#e5e7eb)] rounded-lg overflow-hidden">
                <SidebarBusinessLogo
                  businessName="Interactive Corp"
                  logoUrl="https://via.placeholder.com/120x40/059669/ffffff?text=INTERACTIVE"
                  onClick={() => alert("Home navigation")}
                />
              </div>
              <p className="text-xs text-[var(--color-text-muted,#6b7280)]">
                Accessible button with aria-label: "Interactive Corp home"
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[var(--color-surface-subtle,#f8fafc)] rounded-lg border border-[var(--color-border,#e5e7eb)]">
          <h3 className="font-semibold text-[var(--color-text-heading,#111827)] mb-2">
            ♿ Accessibility Features
          </h3>
          <ul className="text-sm text-[var(--color-text-body,#374151)] space-y-1">
            <li>
              • <strong>Screen Readers:</strong> Proper alt text and aria-labels
            </li>
            <li>
              • <strong>Keyboard Navigation:</strong> Tab-accessible with focus
              rings
            </li>
            <li>
              • <strong>Semantic HTML:</strong> Uses button/div elements
              appropriately
            </li>
            <li>
              • <strong>Focus Management:</strong> Clear focus indicators with
              design tokens
            </li>
            <li>
              • <strong>Color Contrast:</strong> Meets WCAG contrast
              requirements
            </li>
          </ul>
        </div>

        <div className="p-4 bg-[var(--color-primary-50,#eff6ff)] border border-[var(--color-primary-200,#bfdbfe)] rounded-lg">
          <h3 className="font-semibold text-[var(--color-primary-700,#1d4ed8)] mb-2">
            🧪 Testing Instructions
          </h3>
          <ol className="text-sm text-[var(--color-primary-700,#1d4ed8)] space-y-1 list-decimal list-inside">
            <li>Use Tab key to navigate between clickable logos</li>
            <li>Use Enter or Space to activate clickable logos</li>
            <li>Test with screen reader (NVDA, JAWS, VoiceOver)</li>
            <li>Verify focus indicators are clearly visible</li>
            <li>Check color contrast in different themes</li>
          </ol>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive accessibility demonstration showing proper screen reader support, keyboard navigation, and focus management.",
      },
    },
  },
};
