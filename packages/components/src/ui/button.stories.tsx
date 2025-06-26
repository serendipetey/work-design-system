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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
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
          "A button component built with your design system tokens. Supports all variants, sizes, states, and icons defined in your token system.",
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
      description: "Button size using design system spacing tokens",
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

// Variant validation stories
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
          "All button variants using your design system tokens. Each variant should match your existing token values exactly.",
      },
    },
  },
};

// Size validation stories
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All button sizes using design system height and padding tokens.",
      },
    },
  },
};

// State validation stories
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Normal</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" loading>
        Loading
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button states: normal, disabled, and loading. Tests token application for different states.",
      },
    },
  },
};

// Icon integration validation
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<PlusIcon />}>Add Item</Button>
      <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
      <Button leftIcon={<DownloadIcon />} variant="outline">
        Download
      </Button>
      <Button leftIcon={<PlusIcon />} size="sm">
        Small with Icon
      </Button>
      <Button rightIcon={<ArrowRightIcon />} size="lg">
        Large with Icon
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons with left and right icons. Tests icon spacing and alignment.",
      },
    },
  },
};

// Icon-only validation
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<PlusIcon />} aria-label="Add item" />
      <Button
        leftIcon={<DownloadIcon />}
        variant="outline"
        aria-label="Download"
      />
      <Button
        leftIcon={<PlusIcon />}
        variant="ghost"
        size="sm"
        aria-label="Add small"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon-only buttons with proper ARIA labels for accessibility.",
      },
    },
  },
};

// Accessibility validation story
export const AccessibilityTest: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button>Focusable Button</Button>
        <Button disabled>Disabled Button</Button>
        <Button loading>Loading Button</Button>
      </div>
      <div className="flex gap-4">
        <Button leftIcon={<PlusIcon />} aria-label="Add item (icon only)" />
        <Button variant="destructive">Delete Item</Button>
      </div>
      <p className="text-sm text-gray-600">
        Test keyboard navigation: Tab to focus, Enter/Space to activate
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility test: keyboard navigation, focus states, ARIA labels, and screen reader support.",
      },
    },
  },
};

// Token validation story - shows how tokens are applied
export const TokenValidation: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Primary Token Mapping</h3>
        <Button variant="primary">Primary Button</Button>
        <div className="mt-2 text-sm text-gray-600">
          <p>Background: var(--button-primary-bg)</p>
          <p>Text: var(--button-primary-text)</p>
          <p>Border: var(--button-primary-border)</p>
          <p>Hover: var(--button-primary-bg-hover)</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Outline Token Mapping</h3>
        <Button variant="outline">Outline Button</Button>
        <div className="mt-2 text-sm text-gray-600">
          <p>Background: var(--button-outline-bg)</p>
          <p>Text: var(--button-outline-text)</p>
          <p>Border: var(--button-outline-border)</p>
          <p>Hover: var(--button-outline-bg-hover)</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Size Token Mapping</h3>
        <div className="flex gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>
            Small: height var(--button-height-sm), padding
            var(--button-padding-x-sm)
          </p>
          <p>
            Large: height var(--button-height-lg), padding
            var(--button-padding-x-lg)
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Visual validation that design tokens are correctly applied to button variants and sizes.",
      },
    },
  },
};

// AI tool copy-paste validation
export const CopyPasteExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Common AI Patterns</h3>
        <div className="flex flex-wrap gap-2">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="cta">Get Started</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Form Actions</h3>
        <div className="flex gap-2">
          <Button type="submit" loading>
            Submit Form
          </Button>
          <Button type="button" variant="outline">
            Reset
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Icon Actions</h3>
        <div className="flex gap-2">
          <Button leftIcon={<PlusIcon />}>Add New</Button>
          <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
          <Button leftIcon={<DownloadIcon />} variant="outline">
            Export
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common button patterns that AI tools would generate. Tests copy-paste compatibility.",
      },
    },
  },
};

// Responsive validation
export const ResponsiveTest: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="w-full">Full Width Small</Button>
        <Button className="w-full" variant="outline">
          Full Width Outline
        </Button>
        <Button className="w-full" variant="cta">
          Full Width CTA
        </Button>
        <Button className="w-full" variant="success">
          Full Width Success
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm">Flex Small</Button>
        <Button size="md">Flex Medium</Button>
        <Button size="lg">Flex Large</Button>
        <Button size="xl">Flex XL</Button>
      </div>

      <div>
        <Button className="w-full max-w-xs">Constrained Width Button</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Responsive behavior testing: full width, flex layouts, and constrained widths.",
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
