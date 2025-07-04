import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./button";
import { ButtonOld } from "./button-old";

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

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Gold standard button component using design system tokens directly. Compare with ButtonOld to see architectural improvements.",
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
      description:
        "Button size using design system spacing tokens (32px, 40px, 48px, 56px)",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
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

// 🔥 MIGRATION COMPARISON STORIES
export const MigrationComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🚀 New Button (Gold Standard Architecture)
        </h3>
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <div className="flex flex-wrap gap-4 mb-2">
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="cta">CTA</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="text-sm text-green-700">
            ✅ Uses CSS custom properties directly
            <br />
            ✅ Warning text: white (correct)
            <br />
            ✅ Destructive color: #D92B2B (correct)
            <br />
            ✅ CTA color: #A30134 (correct brand red)
            <br />
            ✅ Exact sizing: 32px, 40px, 48px, 56px
            <br />
            ✅ Working hover states for all variants
            <br />✅ Click animation: active:scale-95
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          ⚠️ Old Button (Problematic Implementation)
        </h3>
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <div className="flex flex-wrap gap-4 mb-2">
            <ButtonOld variant="primary">Primary</ButtonOld>
            <ButtonOld variant="outline">Outline</ButtonOld>
            <ButtonOld variant="cta">CTA</ButtonOld>
            <ButtonOld variant="success">Success</ButtonOld>
            <ButtonOld variant="warning">Warning</ButtonOld>
            <ButtonOld variant="destructive">Destructive</ButtonOld>
            <ButtonOld variant="ghost">Ghost</ButtonOld>
          </div>
          <div className="text-sm text-red-700">
            ❌ Uses Tailwind classes with wrong mappings
            <br />
            ❌ Warning text: orange (should be white)
            <br />
            ❌ Destructive color: may be #EF4343 (should be #D92B2B)
            <br />
            ❌ Tailwind sizing instead of design tokens
            <br />❌ Inconsistent hover states
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison showing the architectural improvements in the new button implementation. The new version uses CSS custom properties directly to ensure exact design token compliance.",
      },
    },
  },
};

// Size comparison between old and new
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🚀 New Button Sizes (Design Token Values)
        </h3>
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <div className="flex items-end gap-4 mb-2">
            <Button size="sm">Small (32px)</Button>
            <Button size="md">Medium (40px)</Button>
            <Button size="lg">Large (48px)</Button>
            <Button size="xl">XL (56px)</Button>
          </div>
          <div className="text-sm text-green-700">
            ✅ Heights: 32px, 40px, 48px, 56px (exact design token values)
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          ⚠️ Old Button Sizes (Tailwind Fallbacks)
        </h3>
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <div className="flex items-end gap-4 mb-2">
            <ButtonOld size="sm">Small (h-8)</ButtonOld>
            <ButtonOld size="md">Medium (h-10)</ButtonOld>
            <ButtonOld size="lg">Large (h-11)</ButtonOld>
            <ButtonOld size="xl">XL (h-12)</ButtonOld>
          </div>
          <div className="text-sm text-red-700">
            ❌ Heights: h-8, h-10, h-11, h-12 (Tailwind classes, not design
            tokens)
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of button sizing between old Tailwind-based approach and new design token approach. The new version uses exact pixel values from your design system.",
      },
    },
  },
};

// Warning & Destructive focus comparison
export const ColorComparisonFocus: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🎯 Color Issues Fixed
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Warning Buttons</h4>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="mb-2">
                <Button variant="warning">New (White Text)</Button>
              </div>
              <div className="text-xs text-green-700">
                ✅ Uses --button-warning-text: white
              </div>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="mb-2">
                <ButtonOld variant="warning">Old (Orange Text)</ButtonOld>
              </div>
              <div className="text-xs text-red-700">
                ❌ Uses text-warning-foreground (wrong)
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Destructive Buttons</h4>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="mb-2">
                <Button variant="destructive">New (#D92B2B)</Button>
              </div>
              <div className="text-xs text-green-700">
                ✅ Uses correct --color-destructive-500
              </div>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="mb-2">
                <ButtonOld variant="destructive">Old (Wrong Red)</ButtonOld>
              </div>
              <div className="text-xs text-red-700">
                ❌ May use #EF4343 instead of #D92B2B
              </div>
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
          "Specific comparison of the color issues that were fixed: Warning buttons now have white text, and Destructive buttons use the correct #D92B2B color.",
      },
    },
  },
};

// All variants with proper design tokens
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="cta">CTA</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All button variants using your design system tokens directly. Each variant matches your existing token values exactly.",
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
