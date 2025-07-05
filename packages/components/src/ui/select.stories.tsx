// packages/components/src/ui/select.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SelectField, SelectItem, SelectGroup } from "./select";

const meta: Meta<typeof SelectField> = {
  title: "UI/Select",
  component: SelectField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form select component that fully inherits styling from Input components and follows the same design system patterns. Features proper label colors (navy-500), red (Required) text for required fields, hint text support, and solid white dropdown background.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Visual variant inherited from Input component",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size variant inherited from Input component",
    },
    labelState: {
      control: "select",
      options: ["default", "required", "optional"],
      description: "Label state indicator - required shows red (Required) text",
    },
    disabled: {
      control: "boolean",
      description: "Disable the select",
    },
    required: {
      control: "boolean",
      description: "Mark field as required - shows red (Required) text",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    hintText: {
      control: "text",
      description:
        "Hint text displayed above the select (like Input component)",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the select",
    },
    error: {
      control: "text",
      description:
        "Error message (overrides helperText and sets error variant)",
    },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

// FIXED: Default with proper design system conformance
export const Default: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    hintText: "Choose your primary country of residence",
    children: [
      <SelectItem key="us" value="us">
        United States
      </SelectItem>,
      <SelectItem key="ca" value="ca">
        Canada
      </SelectItem>,
      <SelectItem key="mx" value="mx">
        Mexico
      </SelectItem>,
      <SelectItem key="uk" value="uk">
        United Kingdom
      </SelectItem>,
      <SelectItem key="fr" value="fr">
        France
      </SelectItem>,
      <SelectItem key="de" value="de">
        Germany
      </SelectItem>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic select with proper navy-500 label color, hint text support, and solid white dropdown background. Fully conforms to design system tokens.",
      },
    },
  },
};

// FIXED: Required with red (Required) text to match Input component
export const Required: Story = {
  args: {
    label: "Required Field",
    labelState: "required",
    required: true,
    placeholder: "Please select an option",
    hintText: "This field is required for form submission",
    children: [
      <SelectItem key="option1" value="option1">
        Option 1
      </SelectItem>,
      <SelectItem key="option2" value="option2">
        Option 2
      </SelectItem>,
      <SelectItem key="option3" value="option3">
        Option 3
      </SelectItem>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Required field with red (Required) text indicator, exactly matching Input component pattern. Uses proper brand red color token.",
      },
    },
  },
};

// Label States Comparison - showcasing consistency with Input
export const LabelStates: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-sm">
      <SelectField
        label="Required Field"
        labelState="required"
        hintText="This field is required"
        placeholder="Select required option"
      >
        <SelectItem value="req1">Required Option 1</SelectItem>
        <SelectItem value="req2">Required Option 2</SelectItem>
      </SelectField>

      <SelectField
        label="Optional Field"
        labelState="optional"
        hintText="This field is optional"
        placeholder="Select optional item"
      >
        <SelectItem value="opt1">Optional Item 1</SelectItem>
        <SelectItem value="opt2">Optional Item 2</SelectItem>
      </SelectField>

      <SelectField
        label="Default Label"
        hintText="Default label state"
        placeholder="Select default option"
      >
        <SelectItem value="def1">Default Option 1</SelectItem>
        <SelectItem value="def2">Default Option 2</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Label states showing required (Required), optional (Optional), and default labels using proper design system colors. Navy-500 for labels, brand red for required indicator.",
      },
    },
  },
};

// FIXED: All variants with proper styling
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <SelectField
        label="Default State"
        placeholder="Default styling"
        hintText="Normal select field"
        helperText="Choose from the available options"
      >
        <SelectItem value="default">Default option</SelectItem>
      </SelectField>

      <SelectField
        label="Success State"
        defaultValue="success"
        success="Selection saved successfully" // ✅ Use success prop
        hintText="Operation completed"
      >
        <SelectItem value="success">Success option</SelectItem>
      </SelectField>

      <SelectField
        label="Warning State"
        defaultValue="warning"
        warning="Double-check your selection" // ✅ Use warning prop
        hintText="Please review"
      >
        <SelectItem value="warning">Warning option</SelectItem>
      </SelectField>

      <SelectField
        label="Error State"
        error="This field is required" // ✅ Already correct
        placeholder="Error styling"
        hintText="Fix the error below"
      >
        <SelectItem value="error">Error option</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All variants using inherited Input component styling with proper hint text and helper text support. Solid white dropdown backgrounds.",
      },
    },
  },
};

// Showcasing hint text feature
export const WithHintText: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <SelectField
        label="Department"
        hintText="Choose your primary department"
        placeholder="Select department"
        helperText="This will determine your access permissions"
      >
        <SelectItem value="eng">Engineering</SelectItem>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="product">Product</SelectItem>
        <SelectItem value="marketing">Marketing</SelectItem>
      </SelectField>

      <SelectField
        label="Priority Level"
        labelState="required"
        hintText="Select the urgency level for this task"
        placeholder="Choose priority"
        required
      >
        <SelectItem value="low">Low Priority</SelectItem>
        <SelectItem value="medium">Medium Priority</SelectItem>
        <SelectItem value="high">High Priority</SelectItem>
        <SelectItem value="critical">Critical</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates hint text functionality matching Input component pattern. Hint text appears above the select field using proper design system typography tokens.",
      },
    },
  },
};

// Size variants showing consistency
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <SelectField
        size="sm"
        label="Small"
        placeholder="Small select"
        hintText="Small size variant"
      >
        <SelectItem value="sm1">Small Option 1</SelectItem>
        <SelectItem value="sm2">Small Option 2</SelectItem>
      </SelectField>

      <SelectField
        size="md"
        label="Medium (Default)"
        placeholder="Medium select"
        hintText="Default medium size"
      >
        <SelectItem value="md1">Medium Option 1</SelectItem>
        <SelectItem value="md2">Medium Option 2</SelectItem>
      </SelectField>

      <SelectField
        size="lg"
        label="Large"
        placeholder="Large select"
        hintText="Large size variant"
      >
        <SelectItem value="lg1">Large Option 1</SelectItem>
        <SelectItem value="lg2">Large Option 2</SelectItem>
      </SelectField>

      <SelectField
        size="xl"
        label="Extra Large"
        placeholder="Extra large select"
        hintText="Extra large size variant"
      >
        <SelectItem value="xl1">XL Option 1</SelectItem>
        <SelectItem value="xl2">XL Option 2</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All select sizes using design system spacing tokens, maintaining consistency with Input component sizing.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Locked Setting",
    disabled: true,
    placeholder: "Cannot be changed",
    hintText: "This setting is managed by your administrator",
    helperText: "Contact support to modify this field",
    children: [
      <SelectItem key="option1" value="option1">
        Option 1
      </SelectItem>,
      <SelectItem key="option2" value="option2">
        Option 2
      </SelectItem>,
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

// Hint + Validation Simultaneous Display
export const HintWithValidation: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          🎯 Hint Text + Validation Helper Text
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Shows how Select inherits the same hint + validation pattern from
          Input components.
        </p>
      </div>

      {/* Department Example */}
      <SelectField
        label="Department"
        labelState="required"
        placeholder="Select your department"
        hintText="Choose your primary department for access permissions"
        success="Department selection saved successfully"
      >
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="product">Product</SelectItem>
        <SelectItem value="marketing">Marketing</SelectItem>
      </SelectField>

      {/* Priority Example */}
      <SelectField
        label="Priority Level"
        placeholder="Choose priority"
        hintText="Higher priority items will be processed first"
        warning="High priority should only be used for urgent items"
      >
        <SelectItem value="low">Low Priority</SelectItem>
        <SelectItem value="medium">Medium Priority</SelectItem>
        <SelectItem value="high">High Priority</SelectItem>
        <SelectItem value="critical">Critical Priority</SelectItem>
      </SelectField>

      {/* Status Example */}
      <SelectField
        label="Project Status"
        defaultValue="in-progress"
        hintText="Select current status to update team dashboard"
        error="Status change requires manager approval"
      >
        <SelectItem value="planning">Planning</SelectItem>
        <SelectItem value="in-progress">In Progress</SelectItem>
        <SelectItem value="review">Under Review</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "🎯 **Consistent UX Pattern**: Select components inherit the same hint + validation text behavior from Input, ensuring consistent form experiences across your design system.",
      },
    },
  },
};

// Focus behavior demonstration
export const FocusBehavior: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <p className="text-sm text-[var(--color-text-muted)]">
        Click on the select fields below to see the focus ring remain visible
        when the dropdown opens:
      </p>

      <SelectField
        label="Focus Demo"
        placeholder="Click to see focus ring"
        hintText="Focus ring should remain visible when dropdown opens"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectField>

      <SelectField
        label="Required Focus Demo"
        required
        placeholder="Click to see focus ring"
        hintText="Required field with persistent focus ring"
      >
        <SelectItem value="req1">Required Option 1</SelectItem>
        <SelectItem value="req2">Required Option 2</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates focus ring behavior - the focus ring remains visible when the dropdown is opened, providing better accessibility and visual feedback.",
      },
    },
  },
};

// Grouped options with solid background
export const WithGroups: Story = {
  render: () => (
    <SelectField
      label="Team Member"
      placeholder="Select team member"
      hintText="Choose from available team members"
      helperText="Groups are organized by role"
    >
      <SelectGroup>
        <SelectItem value="john-lead">John Smith (Lead)</SelectItem>
        <SelectItem value="jane-lead">Jane Doe (Lead)</SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectItem value="mike-dev">Mike Johnson (Developer)</SelectItem>
        <SelectItem value="sarah-dev">Sarah Wilson (Developer)</SelectItem>
        <SelectItem value="tom-dev">Tom Brown (Developer)</SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectItem value="lisa-design">Lisa Chen (Designer)</SelectItem>
        <SelectItem value="alex-design">Alex Rodriguez (Designer)</SelectItem>
      </SelectGroup>
    </SelectField>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grouped options with solid white dropdown background for better readability and visual separation.",
      },
    },
  },
};
