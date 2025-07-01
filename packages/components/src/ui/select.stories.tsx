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
          "A form select component that inherits styling from Input components and extends with dropdown-specific functionality. Built with Radix UI primitives and follows the same token system as other form components.",
      },
    },
  },
  tags: ["autodocs"], // 🎯 This generates the Docs page!
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
      description: "Label state indicator",
    },
    disabled: {
      control: "boolean",
      description: "Disable the select",
    },
    required: {
      control: "boolean",
      description: "Mark field as required",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
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

// Basic Examples
export const Default: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
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
          "Basic select with country options. Inherits all styling from Input component tokens.",
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Timezone",
    placeholder: "Select your timezone",
    helperText: "This will be used for scheduling and notifications",
    children: [
      <SelectItem key="est" value="est">
        Eastern Time (EST)
      </SelectItem>,
      <SelectItem key="cst" value="cst">
        Central Time (CST)
      </SelectItem>,
      <SelectItem key="mst" value="mst">
        Mountain Time (MST)
      </SelectItem>,
      <SelectItem key="pst" value="pst">
        Pacific Time (PST)
      </SelectItem>,
    ],
  },
};

export const Required: Story = {
  args: {
    label: "Priority Level",
    placeholder: "Choose priority",
    required: true,
    children: [
      <SelectItem key="low" value="low">
        Low Priority
      </SelectItem>,
      <SelectItem key="medium" value="medium">
        Medium Priority
      </SelectItem>,
      <SelectItem key="high" value="high">
        High Priority
      </SelectItem>,
      <SelectItem key="urgent" value="urgent">
        Urgent
      </SelectItem>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Required field shows asterisk (*) next to label automatically when required=true.",
      },
    },
  },
};

export const Optional: Story = {
  args: {
    label: "Department",
    labelState: "optional",
    placeholder: "Select department (optional)",
    children: [
      <SelectItem key="eng" value="eng">
        Engineering
      </SelectItem>,
      <SelectItem key="design" value="design">
        Design
      </SelectItem>,
      <SelectItem key="product" value="product">
        Product
      </SelectItem>,
      <SelectItem key="marketing" value="marketing">
        Marketing
      </SelectItem>,
    ],
  },
};

// State Variants - matching Input component pattern
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <SelectField
        label="Default State"
        placeholder="Default styling"
        helperText="Normal select field"
      >
        <SelectItem value="default">Default option</SelectItem>
      </SelectField>

      <SelectField
        label="Success State"
        variant="success"
        defaultValue="success"
        helperText="Operation completed successfully"
      >
        <SelectItem value="success">Success option</SelectItem>
      </SelectField>

      <SelectField
        label="Warning State"
        variant="warning"
        defaultValue="warning"
        helperText="Please review your selection"
      >
        <SelectItem value="warning">Warning option</SelectItem>
      </SelectField>

      <SelectField
        label="Error State"
        error="This field is required"
        placeholder="Error styling"
      >
        <SelectItem value="error">Error option</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All variants using inherited Input component styling. Error state automatically applied when error prop is provided.",
      },
    },
  },
};

// Error States
export const WithError: Story = {
  args: {
    label: "Required Field",
    error: "Please select an option",
    placeholder: "Select an option",
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
          "Error state automatically sets variant to 'error' and displays error message using inherited helper text styling.",
      },
    },
  },
};

// Size Variants
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <SelectField
        label="Small"
        size="sm"
        placeholder="Small select"
        defaultValue="sm"
      >
        <SelectItem value="sm">Small option</SelectItem>
      </SelectField>

      <SelectField
        label="Medium (Default)"
        size="md"
        placeholder="Medium select"
        defaultValue="md"
      >
        <SelectItem value="md">Medium option</SelectItem>
      </SelectField>

      <SelectField
        label="Large"
        size="lg"
        placeholder="Large select"
        defaultValue="lg"
      >
        <SelectItem value="lg">Large option</SelectItem>
      </SelectField>

      <SelectField
        label="Extra Large"
        size="xl"
        placeholder="Extra large select"
        defaultValue="xl"
      >
        <SelectItem value="xl">Extra large option</SelectItem>
      </SelectField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All size variants inherited from Input component system. Consistent sizing across form components.",
      },
    },
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Locked Setting",
    disabled: true,
    placeholder: "Cannot be changed",
    helperText: "This setting is managed by your administrator",
    children: [
      <SelectItem key="option1" value="option1">
        Option 1
      </SelectItem>,
      <SelectItem key="option2" value="option2">
        Option 2
      </SelectItem>,
    ],
  },
};

// Grouped Options
export const WithGroups: Story = {
  render: () => (
    <SelectField
      label="Team Member"
      placeholder="Select team member"
      helperText="Choose from available team members"
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
          "Grouped options for better organization. Groups are visually separated in the dropdown.",
      },
    },
  },
};

// Empty State (for testing the graceful handling)
export const EmptyOptions: Story = {
  args: {
    label: "No Options Available",
    placeholder: "No options to select",
    helperText: "Options will appear when available",
    children: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates graceful handling of empty options. Shows 'No options available' message in dropdown.",
      },
    },
  },
};
