// packages/components/src/ui/checkbox.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Checkbox, CheckboxGroup, RadioGroup, RadioItem } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A checkbox component that inherits styling from Input components and follows the same design system patterns. Features unified focus states (--color-focus-500), semantic colors, and proper disabled states. Fully integrates with your design token system.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Visual variant inherited from Input component focus system",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size variant following Input component sizing pattern",
    },
    labelState: {
      control: "select",
      options: ["default", "required", "optional"],
      description:
        "Label state indicator - required shows red (*) required text",
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
    },
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
      description: "Checkbox checked state - supports indeterminate",
    },
    label: {
      control: "text",
      description: "Label text for the checkbox",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the checkbox",
    },
    error: {
      control: "text",
      description:
        "Error message (overrides helperText and sets error variant)",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
    id: "terms-checkbox",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic checkbox with proper design system integration. Uses --color-border for unchecked state and --color-primary for checked state.",
      },
    },
  },
};

// All variants showing inheritance from Input focus system
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        variant="default"
        label="Default variant"
        helperText="Uses standard border and focus colors"
        id="default-variant"
      />
      <Checkbox
        variant="error"
        label="Error variant"
        error="This field has an error"
        id="error-variant"
      />
      <Checkbox
        variant="success"
        label="Success variant"
        success="Validation passed"
        id="success-variant"
      />
      <Checkbox
        variant="warning"
        label="Warning variant"
        warning="Please review this selection"
        id="warning-variant"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All checkbox variants using inherited Input focus system. Each variant uses different focus shadow colors matching your design tokens.",
      },
    },
  },
};

// Size variants showing consistency with Input
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        size="sm"
        label="Small checkbox (12px)"
        helperText="Small size for compact layouts"
        id="small-size"
      />
      <Checkbox
        size="md"
        label="Medium checkbox (16px)"
        helperText="Default medium size"
        id="medium-size"
      />
      <Checkbox
        size="lg"
        label="Large checkbox (20px)"
        helperText="Large size for better accessibility"
        id="large-size"
      />
      <Checkbox
        size="xl"
        label="Extra large checkbox (24px)"
        helperText="Extra large size for touch interfaces"
        id="xl-size"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All checkbox sizes using design system spacing tokens, maintaining consistency with Input component sizing.",
      },
    },
  },
};

// Label states showing consistency with Input
export const LabelStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        label="Required field"
        labelState="required"
        helperText="This field is required for submission"
        id="required-field"
      />
      <Checkbox
        label="Optional field"
        labelState="optional"
        helperText="This field is optional"
        id="optional-field"
      />
      <Checkbox
        label="Default label"
        labelState="default"
        helperText="Default label state"
        id="default-label"
      />
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

// Checked states
export const CheckedStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        checked={false}
        label="Unchecked state"
        helperText="Uses border color from design tokens"
        id="unchecked-state"
      />
      <Checkbox
        checked={true}
        label="Checked state"
        helperText="Uses primary color background"
        id="checked-state"
      />
      <Checkbox
        checked="indeterminate"
        label="Indeterminate state"
        helperText="Shows minus icon for partially selected"
        id="indeterminate-state"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All checkbox states using design system tokens. Checked state uses --color-primary background and --color-button-primary-text for icons.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
    helperText: "This option is currently unavailable",
    id: "disabled-checkbox",
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

// Error validation example
export const WithValidation: Story = {
  args: {
    variant: "error",
    label: "Terms and conditions",
    labelState: "required",
    error: "You must accept the terms to continue",
    id: "validation-checkbox",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error validation state with inherited Input error styling. Shows red border, error text, and error focus shadow.",
      },
    },
  },
};

// Group of checkboxes (matches your screenshot)
export const CheckboxGroupExample: Story = {
  render: () => (
    <CheckboxGroup
      label="Form label"
      labelState="required"
      hintText="Hint text"
      helperText="Additional helper information"
    >
      <Checkbox label="Text label" id="group-option1" />
      <Checkbox label="Text label" id="group-option2" />
      <Checkbox label="Text label" id="group-option3" />
      <Checkbox label="Text label" id="group-option4" />
      <Checkbox label="Text label" id="group-option5" />
      <Checkbox label="Text label" id="group-option6" />
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Group of checkboxes with form label (bold, navy), hint text, and individual checkbox labels (small paragraph text, charcoal). Matches the design in your screenshots.",
      },
    },
  },
};

// Checkbox group with validation
export const CheckboxGroupWithValidation: Story = {
  render: () => (
    <CheckboxGroup
      label="Skills"
      labelState="required"
      hintText="Select all skills that apply to you"
      error="Please select at least one skill"
    >
      <Checkbox label="JavaScript" id="skill-js" variant="error" />
      <Checkbox label="TypeScript" id="skill-ts" variant="error" />
      <Checkbox label="React" id="skill-react" variant="error" />
      <Checkbox label="Vue.js" id="skill-vue" variant="error" />
      <Checkbox label="Angular" id="skill-angular" variant="error" />
      <Checkbox label="Node.js" id="skill-node" variant="error" />
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox group with error validation. Shows how error states cascade to individual checkboxes while maintaining proper typography hierarchy.",
      },
    },
  },
};
