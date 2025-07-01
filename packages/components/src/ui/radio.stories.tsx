// packages/components/src/ui/radio.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { RadioGroup, RadioItem } from "./checkbox";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A radio group component that inherits styling from Input components and follows the same design system patterns. Features unified focus states (--color-focus-500), semantic colors, and proper disabled states. Radio items use rounded styling with dot indicators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    labelState: {
      control: "select",
      options: ["default", "required", "optional"],
      description:
        "Label state indicator - required shows red (*) required text",
    },
    disabled: {
      control: "boolean",
      description: "Disable the entire radio group",
    },
    value: {
      control: "text",
      description: "Currently selected radio value",
    },
    label: {
      control: "text",
      description: "Label text for the radio group",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the radio group",
    },
    error: {
      control: "text",
      description:
        "Error message (overrides helperText and sets error variant)",
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: "Select your preferred size",
    defaultValue: "medium",
    children: [
      <RadioItem key="small" value="small" label="Small" />,
      <RadioItem key="medium" value="medium" label="Medium" />,
      <RadioItem key="large" value="large" label="Large" />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic radio group with proper design system integration. Uses --color-border for unchecked state and --color-primary for selected state.",
      },
    },
  },
};

// All variants showing inheritance from Input focus system
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        label="Default variant"
        helperText="Uses standard border and focus colors"
        defaultValue="option1"
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>

      <RadioGroup
        label="Error variant"
        error="Please select a valid option"
        defaultValue=""
      >
        <RadioItem value="error1" label="Error Option 1" variant="error" />
        <RadioItem value="error2" label="Error Option 2" variant="error" />
      </RadioGroup>

      <RadioGroup
        label="Success variant"
        success="Selection confirmed"
        defaultValue="success1"
      >
        <RadioItem
          value="success1"
          label="Success Option 1"
          variant="success"
        />
        <RadioItem
          value="success2"
          label="Success Option 2"
          variant="success"
        />
      </RadioGroup>

      <RadioGroup
        label="Warning variant"
        warning="Please review your selection"
        defaultValue="warning1"
      >
        <RadioItem
          value="warning1"
          label="Warning Option 1"
          variant="warning"
        />
        <RadioItem
          value="warning2"
          label="Warning Option 2"
          variant="warning"
        />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All radio group variants using inherited Input focus system. Each variant uses different focus shadow colors matching your design tokens.",
      },
    },
  },
};

// Size variants for radio items
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        label="Small radio buttons"
        helperText="Small size for compact layouts"
        defaultValue="sm1"
      >
        <RadioItem value="sm1" label="Small Option 1" size="sm" />
        <RadioItem value="sm2" label="Small Option 2" size="sm" />
      </RadioGroup>

      <RadioGroup
        label="Medium radio buttons (Default)"
        helperText="Default medium size"
        defaultValue="md1"
      >
        <RadioItem value="md1" label="Medium Option 1" size="md" />
        <RadioItem value="md2" label="Medium Option 2" size="md" />
      </RadioGroup>

      <RadioGroup
        label="Large radio buttons"
        helperText="Large size for better accessibility"
        defaultValue="lg1"
      >
        <RadioItem value="lg1" label="Large Option 1" size="lg" />
        <RadioItem value="lg2" label="Large Option 2" size="lg" />
      </RadioGroup>

      <RadioGroup
        label="Extra large radio buttons"
        helperText="Extra large size for touch interfaces"
        defaultValue="xl1"
      >
        <RadioItem value="xl1" label="XL Option 1" size="xl" />
        <RadioItem value="xl2" label="XL Option 2" size="xl" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All radio button sizes using design system spacing tokens, maintaining consistency with Input component sizing.",
      },
    },
  },
};

// Label states showing consistency with Input
export const LabelStates: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        label="Required field"
        labelState="required"
        helperText="This field is required for submission"
        defaultValue="req1"
      >
        <RadioItem value="req1" label="Required Option 1" />
        <RadioItem value="req2" label="Required Option 2" />
      </RadioGroup>

      <RadioGroup
        label="Optional field"
        labelState="optional"
        helperText="This field is optional"
        defaultValue="opt1"
      >
        <RadioItem value="opt1" label="Optional Option 1" />
        <RadioItem value="opt2" label="Optional Option 2" />
      </RadioGroup>

      <RadioGroup
        label="Default label"
        labelState="default"
        helperText="Default label state"
        defaultValue="def1"
      >
        <RadioItem value="def1" label="Default Option 1" />
        <RadioItem value="def2" label="Default Option 2" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Label states showing required (*), optional (optional), and default labels using proper design system colors. Navy-500 for labels, brand red for required indicator.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Locked setting",
    disabled: true,
    helperText: "This setting is managed by your administrator",
    defaultValue: "disabled1",
    children: [
      <RadioItem key="disabled1" value="disabled1" label="Disabled Option 1" />,
      <RadioItem key="disabled2" value="disabled2" label="Disabled Option 2" />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state with proper opacity and cursor styling, matching Input component disabled patterns.",
      },
    },
  },
};

// Real-world example - shipping options
export const ShippingOptions: Story = {
  render: () => (
    <RadioGroup
      label="Shipping method"
      labelState="required"
      helperText="Select your preferred delivery option"
      defaultValue="standard"
    >
      <RadioItem
        value="standard"
        label="Standard shipping (3-5 business days)"
      />
      <RadioItem
        value="express"
        label="Express shipping (1-2 business days) - $12.99"
      />
      <RadioItem value="overnight" label="Overnight delivery - $24.99" />
      <RadioItem value="pickup" label="Store pickup (free)" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world example showing radio group for shipping options with pricing information and proper design system styling.",
      },
    },
  },
};

// Error validation example
export const WithValidation: Story = {
  args: {
    label: "Payment method",
    labelState: "required",
    error: "Please select a payment method to continue",
    defaultValue: "",
    children: [
      <RadioItem
        key="card"
        value="card"
        label="Credit/Debit Card"
        variant="error"
      />,
      <RadioItem key="paypal" value="paypal" label="PayPal" variant="error" />,
      <RadioItem
        key="bank"
        value="bank"
        label="Bank Transfer"
        variant="error"
      />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error validation state with inherited Input error styling. Shows red border, error text, and error focus shadow on radio items.",
      },
    },
  },
};

// Radio group example (matches your screenshot)
export const RadioGroupExample: Story = {
  render: () => (
    <RadioGroup
      label="Form label"
      labelState="required"
      hintText="Hint text"
      helperText="Additional helper information"
      defaultValue="option1"
    >
      <RadioItem value="option1" label="Text label" />
      <RadioItem value="option2" label="Text label" />
      <RadioItem value="option3" label="Text label" />
      <RadioItem value="option4" label="Text label" />
      <RadioItem value="option5" label="Text label" />
      <RadioItem value="option6" label="Text label" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Group of radio buttons with form label (bold, navy), hint text, and individual radio labels (small paragraph text, charcoal). Matches the design in your screenshots.",
      },
    },
  },
};

// Radio group with different sizes
export const RadioGroupSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        label="Small radio group"
        hintText="Small size for compact forms"
        defaultValue="sm1"
      >
        <RadioItem value="sm1" label="Small Option 1" size="sm" />
        <RadioItem value="sm2" label="Small Option 2" size="sm" />
        <RadioItem value="sm3" label="Small Option 3" size="sm" />
      </RadioGroup>

      <RadioGroup
        label="Large radio group"
        hintText="Large size for better accessibility"
        defaultValue="lg1"
      >
        <RadioItem value="lg1" label="Large Option 1" size="lg" />
        <RadioItem value="lg2" label="Large Option 2" size="lg" />
        <RadioItem value="lg3" label="Large Option 3" size="lg" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Radio groups with different sizes showing proper form label and hint text styling across all size variants.",
      },
    },
  },
};
