import type { Meta, StoryObj } from "@storybook/react";
import { SelectField, SelectItem } from "./select";

const meta: Meta<typeof SelectField> = {
  title: "UI/Select",
  component: SelectField,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Country",
    placeholder: "Select country",
    children: [
      <SelectItem key="us" value="us">
        United States
      </SelectItem>,
      <SelectItem key="ca" value="ca">
        Canada
      </SelectItem>,
    ],
  },
};

export const Error: Story = {
  args: {
    label: "Required Field",
    error: "This field is required",
    children: [
      <SelectItem key="option1" value="option1">
        Option 1
      </SelectItem>,
    ],
  },
};
