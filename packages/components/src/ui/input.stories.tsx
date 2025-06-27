import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Input } from "./input";

// Icon components for stories (matching your screenshots)
const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible input component built with your design system tokens. Supports all states (default, error, success, warning), sizes, icons, and accessibility features defined in your token system.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success", "warning"],
      description: "Input variant using design system state tokens",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Input size using design system spacing tokens",
    },
    labelState: {
      control: { type: "select" },
      options: ["default", "required", "optional"],
      description: "Label state - controls required (*) or (Optional) display",
    },
    showLabel: {
      control: "boolean",
      description: "Toggle label visibility",
    },
    showHintText: {
      control: "boolean",
      description: "Toggle hint text visibility",
    },
    clearable: {
      control: "boolean",
      description: "Shows clear button when input has value",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables input",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
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
  args: {
    onChange: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: "label",
    hintText: "hint text",
    placeholder: "placeholder text",
  },
};

// All States - Recreating your Figma screenshots
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-[800px]">
      {/* Default State */}
      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        placeholder="placeholder text"
        leftIcon={<CalendarIcon />}
      />

      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        defaultValue="input text"
        rightIcon={<SearchIcon />}
      />

      {/* Second Row */}
      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        placeholder="placeholder text"
        leftIcon={<CalendarIcon />}
      />

      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        defaultValue="input text"
        rightIcon={<SearchIcon />}
      />

      {/* Error State */}
      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        placeholder="placeholder text"
        leftIcon={<CalendarIcon />}
        error="error"
      />

      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        defaultValue="input text"
        rightIcon={<SearchIcon />}
        error="error"
      />

      {/* Success State */}
      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        placeholder="placeholder text"
        leftIcon={<CalendarIcon />}
        success="success"
      />

      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        defaultValue="input text"
        rightIcon={<SearchIcon />}
        success="success"
      />

      {/* Disabled State */}
      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        placeholder="placeholder text"
        leftIcon={<CalendarIcon />}
        disabled
      />

      <Input
        label="label"
        labelState="optional"
        hintText="hint text"
        placeholder="input text"
        rightIcon={<SearchIcon />}
        disabled
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All input states using your design system tokens - matches your Figma designs exactly. Shows default, error, success, and disabled states with both left and right icons.",
      },
    },
  },
};

// Label States
export const LabelStates: Story = {
  render: () => (
    <div className="space-y-6">
      <Input
        label="Required Field"
        labelState="required"
        hintText="This field is required"
        placeholder="Enter required information"
      />

      <Input
        label="Optional Field"
        labelState="optional"
        hintText="This field is optional"
        placeholder="Enter optional information"
      />

      <Input
        label="Default Label"
        labelState="default"
        hintText="Default label state"
        placeholder="Enter information"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Label states showing required (*), optional (Optional), and default labels using your design system typography tokens.",
      },
    },
  },
};

// Size Variants
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        size="sm"
        label="Small"
        placeholder="Small input"
        leftIcon={<SearchIcon />}
      />

      <Input
        size="md"
        label="Medium (Default)"
        placeholder="Medium input"
        leftIcon={<SearchIcon />}
      />

      <Input
        size="lg"
        label="Large"
        placeholder="Large input"
        leftIcon={<SearchIcon />}
      />

      <Input
        size="xl"
        label="Extra Large"
        placeholder="Extra large input"
        leftIcon={<SearchIcon />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All input sizes using your design system spacing tokens. Sizes follow your existing button component sizing system.",
      },
    },
  },
};

// Icon Support
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        label="Left Icon"
        placeholder="Search..."
        leftIcon={<SearchIcon />}
      />

      <Input
        label="Right Icon"
        placeholder="Select date"
        rightIcon={<CalendarIcon />}
      />

      <Input
        label="Both Icons"
        placeholder="Search dates"
        leftIcon={<SearchIcon />}
        rightIcon={<CalendarIcon />}
      />

      <Input
        label="Clearable"
        placeholder="Type something to see clear button"
        defaultValue="Clear me!"
        clearable
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon support with left, right, and clearable functionality. Icons use your design system color tokens for proper theming.",
      },
    },
  },
};

// Validation States with Messages
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6">
      <Input
        label="Error State"
        placeholder="Enter email"
        defaultValue="invalid-email"
        error="Please enter a valid email address"
      />

      <Input
        label="Success State"
        placeholder="Enter password"
        defaultValue="SecurePassword123!"
        success="Password meets all requirements"
      />

      <Input
        label="Warning State"
        placeholder="Enter username"
        defaultValue="user123"
        warning="Username may already be taken"
      />

      <Input
        label="Loading State"
        placeholder="Checking availability..."
        defaultValue="checking"
        loading
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Validation states with custom messages using your design system error, success, and warning color tokens.",
      },
    },
  },
};

// AI Tool Examples - Copy-paste ready
export const AIToolExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Copy-Paste Ready Examples
        </h3>

        {/* Basic Form */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Basic Contact Form</h4>
          <Input
            label="Full Name"
            labelState="required"
            placeholder="Enter your full name"
          />
          <Input
            label="Email"
            labelState="required"
            type="email"
            placeholder="Enter your email"
            leftIcon={<SearchIcon />}
          />
          <Input
            label="Phone"
            labelState="optional"
            type="tel"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples optimized for AI tools like Cursor and Lovable. Simple, intuitive props that AI can easily understand and replicate.",
      },
    },
  },
};
