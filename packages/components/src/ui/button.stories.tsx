// packages/components/src/ui/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./button";

// Icon components for stories
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Design system button component with theme-specific disabled states, unified focus styling, and comprehensive variant support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "outline",
        "cta",
        "success",
        "warning",
        "destructive",
        "ghost",
      ],
      description: "Button variant using design system tokens",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Button size (32px, 40px, 48px, 56px)",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button with theme-specific styling",
    },
    leftIcon: {
      control: false,
      description: "Icon to display on the left side",
    },
    rightIcon: {
      control: false,
      description: "Icon to display on the right side",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// 🎨 Theme-Specific Disabled States Showcase
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            🎨 Theme-Specific Disabled States
          </h3>
          <p className="text-sm text-gray-600 max-w-4xl">
            Each disabled button maintains its visual identity with faded colors
            specific to its theme, providing better UX than generic gray
            disabled states. Loading states show spinners while maintaining
            theme colors.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Enabled Column */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 text-center">Enabled</h4>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                Primary Button
              </Button>
              <Button variant="outline" className="w-full">
                Outline Button
              </Button>
              <Button variant="cta" className="w-full">
                CTA Button
              </Button>
              <Button variant="success" className="w-full">
                Success Button
              </Button>
              <Button variant="warning" className="w-full">
                Warning Button
              </Button>
              <Button variant="destructive" className="w-full">
                Destructive Button
              </Button>
              <Button variant="ghost" className="w-full">
                Ghost Button
              </Button>
            </div>
          </div>

          {/* Disabled Column */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 text-center">Disabled</h4>
            <div className="space-y-3">
              <Button variant="primary" disabled className="w-full">
                Primary Button
              </Button>
              <Button variant="outline" disabled className="w-full">
                Outline Button
              </Button>
              <Button variant="cta" disabled className="w-full">
                CTA Button
              </Button>
              <Button variant="success" disabled className="w-full">
                Success Button
              </Button>
              <Button variant="warning" disabled className="w-full">
                Warning Button
              </Button>
              <Button variant="destructive" disabled className="w-full">
                Destructive Button
              </Button>
              <Button variant="ghost" disabled className="w-full">
                Ghost Button
              </Button>
            </div>
          </div>

          {/* Loading Column */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 text-center">Loading</h4>
            <div className="space-y-3">
              <Button variant="primary" loading className="w-full">
                Primary Button
              </Button>
              <Button variant="outline" loading className="w-full">
                Outline Button
              </Button>
              <Button variant="cta" loading className="w-full">
                CTA Button
              </Button>
              <Button variant="success" loading className="w-full">
                Success Button
              </Button>
              <Button variant="warning" loading className="w-full">
                Warning Button
              </Button>
              <Button variant="destructive" loading className="w-full">
                Destructive Button
              </Button>
              <Button variant="ghost" loading className="w-full">
                Ghost Button
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive Behavior Guide */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Hover:</strong> Darker
                theme-specific colors (enabled only)
              </div>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Active/Press:</strong> Subtle
                translateY animation + darker colors
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Focus:</strong> Orange
                background with navy text (keyboard only)
              </div>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Disabled:</strong> Faded
                theme-specific colors with not-allowed cursor
              </div>
            </div>
          </div>
        </div>

        {/* Focus Demo Section */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">🎯 Focus State Demo</h4>
          <p className="text-sm text-gray-600">
            Tab through these buttons to see the unified orange focus state with
            navy text and thick bottom border:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="success">Success</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive view of all button states: enabled, disabled (with theme-specific faded colors), and loading. Each disabled button maintains visual connection to its theme while clearly indicating the disabled state. Includes interactive behavior guide and focus state demonstration.",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            All Button Variants
          </h3>
          <p className="text-sm text-gray-600">
            All button variants using design system tokens directly. Features
            unified focus styling and hover states.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary" className="w-full">
            Primary
          </Button>
          <Button variant="outline" className="w-full">
            Outline
          </Button>
          <Button variant="cta" className="w-full">
            CTA
          </Button>
          <Button variant="success" className="w-full">
            Success
          </Button>
          <Button variant="warning" className="w-full">
            Warning
          </Button>
          <Button variant="destructive" className="w-full">
            Destructive
          </Button>
          <Button variant="ghost" className="w-full md:col-span-2">
            Ghost
          </Button>
        </div>

        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="space-y-2">
            <p className="text-sm font-medium text-blue-900">
              💡 Try keyboard navigation:
            </p>
            <p className="text-sm text-blue-800">
              Tab through these buttons to see the unified orange focus state
              with navy text and thick bottom border.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All button variants using design system tokens directly. Features unified focus styling and hover states.",
      },
    },
  },
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Button Sizes</h3>
          <p className="text-sm text-gray-600">
            Button sizes using exact pixel values from design tokens.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <Button size="sm" className="w-full">
              Small
            </Button>
            <Button size="md" className="w-full">
              Medium
            </Button>
            <Button size="lg" className="w-full">
              Large
            </Button>
            <Button size="xl" className="w-full">
              X-Large
            </Button>
          </div>

          <div className="flex items-end gap-6 mt-8">
            <div className="text-center">
              <Button size="sm">Small</Button>
              <div className="text-xs text-gray-500 mt-2">32px</div>
            </div>
            <div className="text-center">
              <Button size="md">Medium</Button>
              <div className="text-xs text-gray-500 mt-2">40px</div>
            </div>
            <div className="text-center">
              <Button size="lg">Large</Button>
              <div className="text-xs text-gray-500 mt-2">48px</div>
            </div>
            <div className="text-center">
              <Button size="xl">X-Large</Button>
              <div className="text-xs text-gray-500 mt-2">56px</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Heights: 32px, 40px, 48px, 56px (exact design token values)
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button sizes using exact pixel values from design tokens.",
      },
    },
  },
};

// Interactive states demo
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            🎯 Interactive States
          </h3>
          <p className="text-sm text-gray-600">
            Comprehensive interactive states including hover, focus, active,
            loading, and disabled states.
          </p>
        </div>

        {/* Main States Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Normal/Enabled state */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 text-center">Normal</h4>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                Primary
              </Button>
              <Button variant="success" className="w-full">
                Success
              </Button>
              <Button variant="warning" className="w-full">
                Warning
              </Button>
            </div>
          </div>

          {/* Loading state */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 text-center">Loading</h4>
            <div className="space-y-3">
              <Button variant="primary" loading className="w-full">
                Primary
              </Button>
              <Button variant="success" loading className="w-full">
                Success
              </Button>
              <Button variant="warning" loading className="w-full">
                Warning
              </Button>
            </div>
          </div>

          {/* Disabled state */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 text-center">Disabled</h4>
            <div className="space-y-3">
              <Button variant="primary" disabled className="w-full">
                Primary
              </Button>
              <Button variant="success" disabled className="w-full">
                Success
              </Button>
              <Button variant="warning" disabled className="w-full">
                Warning
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive Behavior Guide */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Hover:</strong> Darker
                theme-specific colors
              </div>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Active/Press:</strong> Subtle
                translateY animation + darker colors
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Focus:</strong> Orange
                background with navy text (keyboard only)
              </div>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Disabled:</strong> Faded
                theme-specific colors with not-allowed cursor
              </div>
            </div>
          </div>
        </div>

        {/* Focus Demo Section */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">🎯 Focus State Demo</h4>
          <p className="text-sm text-gray-600">
            Tab through these buttons to see the unified orange focus state with
            navy text and thick bottom border:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="success">Success</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive interactive states including hover, focus, active, loading, and disabled states.",
      },
    },
  },
};

// Icon usage examples
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Buttons with Icons
          </h3>
          <p className="text-sm text-gray-600">
            Icons can be placed on the left, right, or both sides of button
            text.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Left Icons</h4>
            <div className="space-y-3">
              <Button
                variant="primary"
                leftIcon={<PlusIcon />}
                className="w-full"
              >
                Add Item
              </Button>
              <Button
                variant="success"
                leftIcon={<DownloadIcon />}
                className="w-full"
              >
                Download
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Right Icons</h4>
            <div className="space-y-3">
              <Button
                variant="outline"
                rightIcon={<ArrowRightIcon />}
                className="w-full"
              >
                Continue
              </Button>
              <Button
                variant="ghost"
                rightIcon={<ArrowRightIcon />}
                className="w-full"
              >
                Next Step
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Both Icons</h4>
          <div className="flex justify-center">
            <Button
              variant="cta"
              leftIcon={<PlusIcon />}
              rightIcon={<ArrowRightIcon />}
            >
              Create & Continue
            </Button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Icons maintain proper spacing and alignment across all button
            variants and sizes.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with icons on left, right, or both sides.",
      },
    },
  },
};

// Individual variant stories for isolated testing
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const CTA: Story = {
  args: {
    variant: "cta",
    children: "CTA Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <PlusIcon />,
    children: "Add Item",
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRightIcon />,
    children: "Continue",
  },
};
