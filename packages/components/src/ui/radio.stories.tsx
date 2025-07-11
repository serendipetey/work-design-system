// packages/components/src/ui/radio.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioItem } from "./checkbox";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
RadioGroup component with design tokens + fallbacks architecture.

### Key Features:
- **Navy-500 selected state** for brand consistency
- **Darker border (#9ca3af)** for better visibility  
- **Orange focus ring** for all variants (accessibility)
- **14px hint text** for proper hierarchy
- **Consistent validation states** (error/success/warning)
- **Size variants** (sm/md/lg/xl)
- **Centralized form utilities** from form.tsx

### Usage:
\`\`\`tsx
<RadioGroup 
  label="Payment method" 
  labelState="required"
  error="Please select a payment method"
>
  <RadioItem value="card" label="Credit Card" />
  <RadioItem value="paypal" label="PayPal" />
</RadioGroup>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    labelState: {
      control: { type: "select" },
      options: ["default", "required", "optional"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    defaultValue: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default radio group
export const Default: Story = {
  args: {
    label: "Select an option",
    defaultValue: "option1",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="option1" label="Option 1" />
      <RadioItem value="option2" label="Option 2" />
      <RadioItem value="option3" label="Option 3" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic radio group with navy-500 selected state and darker borders for better visibility.",
      },
    },
  },
};

// All validation variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="font-semibold">Default variant</h3>
        <RadioGroup
          label="Default radio group"
          hintText="Click any option to see orange focus ring (14px hint text)"
          defaultValue="default1"
        >
          <RadioItem value="default1" label="Default Option 1" />
          <RadioItem value="default2" label="Default Option 2" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Error variant</h3>
        <RadioGroup
          label="Error radio group"
          error="Please select a valid option"
          hintText="Border is red, but focus ring is orange (accessibility)"
        >
          <RadioItem value="error1" label="Error Option 1" variant="error" />
          <RadioItem value="error2" label="Error Option 2" variant="error" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Success variant</h3>
        <RadioGroup
          label="Success radio group"
          success="Selection confirmed"
          hintText="Border is teal, but focus ring is orange"
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
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Warning variant</h3>
        <RadioGroup
          label="Warning radio group"
          warning="Please review your selection"
          hintText="Border is orange, focus ring is also orange"
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All variants with consistent orange focus rings for accessibility. Border colors indicate state, focus ring is always orange.",
      },
    },
  },
};

// Size variants
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Small (12px)</h3>
        <RadioGroup
          label="Small radio group"
          hintText="Compact size for dense layouts"
          defaultValue="small1"
        >
          <RadioItem value="small1" label="Small Option 1" size="sm" />
          <RadioItem value="small2" label="Small Option 2" size="sm" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Medium (16px) - Default</h3>
        <RadioGroup
          label="Medium radio group"
          hintText="Default size for most use cases"
          defaultValue="medium1"
        >
          <RadioItem value="medium1" label="Medium Option 1" size="md" />
          <RadioItem value="medium2" label="Medium Option 2" size="md" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Large (20px)</h3>
        <RadioGroup
          label="Large radio group"
          hintText="Larger size for better accessibility"
          defaultValue="large1"
        >
          <RadioItem value="large1" label="Large Option 1" size="lg" />
          <RadioItem value="large2" label="Large Option 2" size="lg" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Extra Large (24px)</h3>
        <RadioGroup
          label="Extra large radio group"
          hintText="Touch-friendly size for mobile interfaces"
          defaultValue="xl1"
        >
          <RadioItem value="xl1" label="XL Option 1" size="xl" />
          <RadioItem value="xl2" label="XL Option 2" size="xl" />
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All radio sizes with design token-based dimensions and 14px hint text.",
      },
    },
  },
};

// Label states
export const LabelStates: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        label="Required field"
        labelState="required"
        hintText="This field is required for submission"
        defaultValue="req1"
      >
        <RadioItem value="req1" label="Required Option 1" />
        <RadioItem value="req2" label="Required Option 2" />
      </RadioGroup>

      <RadioGroup
        label="Optional field"
        labelState="optional"
        hintText="This field is optional"
      >
        <RadioItem value="opt1" label="Optional Option 1" />
        <RadioItem value="opt2" label="Optional Option 2" />
      </RadioGroup>

      <RadioGroup label="Default label" hintText="No indicator text">
        <RadioItem value="def1" label="Default Option 1" />
        <RadioItem value="def2" label="Default Option 2" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Label states with brand red required indicator and grey optional indicator.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <RadioGroup
      label="Disabled radio group"
      hintText="These options are currently unavailable"
      disabled
    >
      <RadioItem value="disabled1" label="Disabled Option 1" />
      <RadioItem value="disabled2" label="Disabled Option 2" />
      <RadioItem value="disabled3" label="Disabled Option 3" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled radio group with 50% opacity and not-allowed cursor.",
      },
    },
  },
};

// Error validation example
export const WithValidation: Story = {
  render: () => (
    <RadioGroup
      label="Payment method"
      labelState="required"
      error="Please select a payment method"
      hintText="Focus shows orange ring, not red (accessibility)"
    >
      <RadioItem value="card" label="Credit Card" variant="error" />
      <RadioItem value="paypal" label="PayPal" variant="error" />
      <RadioItem value="bank" label="Bank Transfer" variant="error" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Error validation with red borders but orange focus rings for clear UX distinction.",
      },
    },
  },
};

// Real-world example
export const PaymentMethodExample: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <RadioGroup
        label="Payment method"
        labelState="required"
        hintText="Choose how you'd like to pay for your order"
        defaultValue="card"
      >
        <RadioItem value="card" label="Credit or Debit Card" />
        <RadioItem value="paypal" label="PayPal" />
        <RadioItem value="apple" label="Apple Pay" />
        <RadioItem value="google" label="Google Pay" />
        <RadioItem value="bank" label="Bank Transfer" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world example of a payment method selector with multiple options.",
      },
    },
  },
};

// Hint + Helper Text demonstration (like Input/Select)
export const HintAndHelperText: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Hint text only (14px, neutral)</h3>
        <RadioGroup
          label="Notification preference"
          hintText="Choose how you'd like to receive updates"
        >
          <RadioItem value="email" label="Email notifications" />
          <RadioItem value="sms" label="SMS notifications" />
          <RadioItem value="none" label="No notifications" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">
          Helper text only (validation feedback)
        </h3>
        <RadioGroup
          label="Payment method"
          labelState="required"
          error="Please select a payment method"
        >
          <RadioItem value="card" label="Credit Card" variant="error" />
          <RadioItem value="paypal" label="PayPal" variant="error" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Both hint AND helper text</h3>
        <RadioGroup
          label="Shipping method"
          hintText="Select your preferred delivery option (14px hint)"
          success="Shipping method confirmed!"
          defaultValue="standard"
        >
          <RadioItem
            value="standard"
            label="Standard (5-7 days)"
            variant="success"
          />
          <RadioItem
            value="express"
            label="Express (2-3 days)"
            variant="success"
          />
          <RadioItem value="overnight" label="Overnight" variant="success" />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">
          Hint text transitions to helper text on validation
        </h3>
        <RadioGroup
          label="Account type"
          labelState="required"
          hintText="Choose the account type that best fits your needs"
          warning="Business accounts require additional verification"
        >
          <RadioItem
            value="personal"
            label="Personal Account"
            variant="warning"
          />
          <RadioItem
            value="business"
            label="Business Account"
            variant="warning"
          />
        </RadioGroup>
        <p className="text-xs text-gray-500">
          Note: Hint text disappears when validation message appears
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates hint text (14px, neutral instructions) vs helper text (validation feedback). Matches Input/Select behavior.",
      },
    },
  },
};

// Focus demonstration
export const FocusDemonstration: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 border border-gray-200 rounded">
        <h3 className="font-semibold mb-3">Tab through these radio groups:</h3>
        <div className="space-y-4">
          <RadioGroup
            label="Default - Orange focus"
            hintText="Focus ring is orange"
          >
            <RadioItem value="focus-default1" label="Default Option 1" />
            <RadioItem value="focus-default2" label="Default Option 2" />
          </RadioGroup>

          <RadioGroup
            label="Error - Orange focus (not red)"
            error="Example error message"
            hintText="Border red, focus orange"
          >
            <RadioItem
              value="focus-error1"
              label="Error Option 1"
              variant="error"
            />
            <RadioItem
              value="focus-error2"
              label="Error Option 2"
              variant="error"
            />
          </RadioGroup>

          <RadioGroup
            label="Success - Orange focus (not teal)"
            success="Selection confirmed"
            hintText="Border teal, focus orange"
            defaultValue="focus-success1"
          >
            <RadioItem
              value="focus-success1"
              label="Success Option 1"
              variant="success"
            />
            <RadioItem
              value="focus-success2"
              label="Success Option 2"
              variant="success"
            />
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of consistent orange focus rings across all variants for accessibility.",
      },
    },
  },
};
