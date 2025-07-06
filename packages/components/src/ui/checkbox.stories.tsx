// packages/components/src/ui/checkbox.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Checkbox component with design tokens + fallbacks architecture.

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
<Checkbox 
  label="Accept terms" 
  labelState="required"
  error="You must accept to continue"
  variant="error"
  size="md"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success", "warning"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    labelState: {
      control: { type: "select" },
      options: ["default", "required", "optional"],
    },
    checked: {
      control: { type: "select" },
      options: [false, true, "indeterminate"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    showLabel: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default checkbox
export const Default: Story = {
  args: {
    label: "Default checkbox",
    id: "default-checkbox",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic checkbox with navy-500 selected state and darker border for better visibility.",
      },
    },
  },
};

// All variants showing new orange focus behavior
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Default variant</h3>
        <Checkbox
          variant="default"
          label="Default checkbox"
          hintText="Click to see orange focus ring (14px hint text)"
          id="default-variant"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Error variant</h3>
        <Checkbox
          variant="error"
          label="Error checkbox"
          error="This field has an error"
          hintText="Border is red, but focus ring is orange (accessibility)"
          id="error-variant"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Success variant</h3>
        <Checkbox
          variant="success"
          label="Success checkbox"
          success="Validation passed"
          hintText="Border is teal, but focus ring is orange"
          id="success-variant"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Warning variant</h3>
        <Checkbox
          variant="warning"
          label="Warning checkbox"
          warning="Please review this selection"
          hintText="Border is orange, focus ring is also orange"
          id="warning-variant"
        />
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
    <div className="space-y-4">
      <Checkbox
        size="sm"
        label="Small checkbox (12px)"
        hintText="Compact size for dense layouts"
        id="small-size"
      />
      <Checkbox
        size="md"
        label="Medium checkbox (16px)"
        hintText="Default size for most use cases"
        id="medium-size"
      />
      <Checkbox
        size="lg"
        label="Large checkbox (20px)"
        hintText="Larger size for better accessibility"
        id="large-size"
      />
      <Checkbox
        size="xl"
        label="Extra large checkbox (24px)"
        hintText="Touch-friendly size for mobile interfaces"
        id="xl-size"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All checkbox sizes with design token-based dimensions and 14px hint text.",
      },
    },
  },
};

// Label states
export const LabelStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        label="Required field"
        labelState="required"
        hintText="This field is required for submission"
        id="required-field"
      />
      <Checkbox
        label="Optional field"
        labelState="optional"
        hintText="This field is optional"
        id="optional-field"
      />
      <Checkbox
        label="Default label"
        hintText="No indicator text"
        id="default-label"
      />
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

// Checked states with navy-500
export const CheckedStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        checked={false}
        label="Unchecked state"
        hintText="Default border color (#9ca3af)"
        id="unchecked-state"
      />
      <Checkbox
        checked={true}
        label="Checked state"
        hintText="Navy-500 background with white checkmark"
        id="checked-state"
      />
      <Checkbox
        checked="indeterminate"
        label="Indeterminate state"
        hintText="Navy-500 background with white minus icon"
        id="indeterminate-state"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All checkbox states using navy-500 for selected/indeterminate states.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
    hintText: "This option is currently unavailable",
    id: "disabled-checkbox",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled state with 50% opacity and not-allowed cursor.",
      },
    },
  },
};

// Error validation with consistent focus
export const WithValidation: Story = {
  args: {
    variant: "error",
    label: "Terms and conditions",
    labelState: "required",
    error: "You must accept the terms to continue",
    hintText: "Focus shows orange ring, not red (accessibility)",
    id: "validation-checkbox",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error validation with red border but orange focus ring for clear UX distinction.",
      },
    },
  },
};

// CheckboxGroup example
export const CheckboxGroupExample: Story = {
  render: () => (
    <CheckboxGroup
      label="Interests"
      labelState="required"
      hintText="Select all that apply"
      error="Please select at least one interest"
    >
      <Checkbox label="Design" id="interest-design" />
      <Checkbox label="Development" id="interest-dev" />
      <Checkbox label="Marketing" id="interest-marketing" />
      <Checkbox label="Sales" id="interest-sales" />
      <Checkbox label="Analytics" id="interest-analytics" />
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Group of checkboxes with form label, hint text, validation, and individual labels.",
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
        <Checkbox
          label="Newsletter subscription"
          hintText="Receive weekly updates about new features"
          id="hint-only"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">
          Helper text only (validation feedback)
        </h3>
        <Checkbox
          label="Terms and conditions"
          labelState="required"
          error="You must accept the terms to continue"
          id="helper-only"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">
          Hint text transitions to helper text on validation
        </h3>
        <Checkbox
          label="Privacy policy"
          labelState="required"
          hintText="Please read our privacy policy before accepting"
          error="You must accept the privacy policy"
          id="hint-to-helper"
        />
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
        <h3 className="font-semibold mb-3">Tab through these checkboxes:</h3>
        <div className="space-y-2">
          <Checkbox
            variant="default"
            label="Default - Orange focus"
            hintText="Focus ring is orange"
            id="focus-default"
          />
          <Checkbox
            variant="error"
            label="Error - Orange focus (not red)"
            hintText="Border red, focus orange"
            id="focus-error"
          />
          <Checkbox
            variant="success"
            label="Success - Orange focus (not teal)"
            hintText="Border teal, focus orange"
            id="focus-success"
          />
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
