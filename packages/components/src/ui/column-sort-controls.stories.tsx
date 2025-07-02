// packages/components/src/ui/column-sort-controls.stories.tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColumnSortControls } from "./column-sort-controls";
import type { DataTableColumn } from "./data-table";

const sampleColumns: DataTableColumn[] = [
  { key: "name", header: "Customer Name", sortable: true },
  { key: "email", header: "Email Address", sortable: true },
  { key: "status", header: "Account Status", sortable: true },
  { key: "createdOn", header: "Registration Date", sortable: true },
  { key: "priority", header: "Support Level", sortable: false }, // Not sortable
];

const meta: Meta<typeof ColumnSortControls> = {
  title: "UI/ColumnSortControls",
  component: ColumnSortControls,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Column Sort Controls**

Clean toolbar sorting interface combining column selection with direction toggle:

**Components:**
- **Column Dropdown**: Shows only sortable columns from table
- **Direction Button**: Ghost button with rotating arrow icon
- **Auto-detection**: Filters to only sortable columns automatically

**Layout:**
\`[Sort by: Column Name ▼] [↑/↓]\`

**Features:**
- **Unified state** - Single point of control for table sorting
- **Clean UI** - No cluttered column headers
- **Smart filtering** - Only sortable columns appear in dropdown
- **Rotating arrow** - Same arrow used throughout system
- **Disabled states** - Direction button disabled when no column selected
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentColumn: {
      control: "select",
      options: [null, "name", "email", "status", "createdOn"],
      description: "Currently selected column for sorting",
    },
    currentDirection: {
      control: "select",
      options: ["asc", "desc"],
      description: "Current sort direction",
    },
    disabled: {
      control: "boolean",
      description: "Disable all controls",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive demo
export const Default: Story = {
  render: () => {
    const [currentColumn, setCurrentColumn] = useState<string | null>("name");
    const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">(
      "asc"
    );

    return (
      <div className="space-y-6 p-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-navy-500)] mb-4">
            Column Sort Controls Demo
          </h3>
          <ColumnSortControls
            columns={sampleColumns}
            currentColumn={currentColumn}
            currentDirection={currentDirection}
            onColumnChange={setCurrentColumn}
            onDirectionChange={setCurrentDirection}
          />
        </div>

        <div className="text-sm text-[var(--color-charcoal-500)] bg-[var(--color-gray-50)] p-4 rounded-lg">
          <strong>Current State:</strong>
          <br />
          <div className="mt-2 space-y-1">
            <div>
              <strong>Column:</strong> {currentColumn || "None"}
            </div>
            <div>
              <strong>Direction:</strong> {currentDirection}
            </div>
            <div>
              <strong>Button State:</strong>{" "}
              {currentColumn ? "Enabled" : "Disabled"}
            </div>
          </div>
        </div>

        <div className="text-xs text-[var(--color-charcoal-400)]">
          Notice how "Support Level" doesn't appear in the dropdown (not
          sortable)
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing column selection and direction toggle. The direction button is automatically disabled when no column is selected.",
      },
    },
  },
};

// All sortable columns
export const AllSortable: Story = {
  render: () => {
    const [currentColumn, setCurrentColumn] = useState<string | null>(null);
    const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">(
      "asc"
    );

    const allSortableColumns: DataTableColumn[] = [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "status", header: "Status", sortable: true },
      { key: "date", header: "Date", sortable: true },
    ];

    return (
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-navy-500)] mb-4">
            All Columns Sortable
          </h3>
          <ColumnSortControls
            columns={allSortableColumns}
            currentColumn={currentColumn}
            currentDirection={currentDirection}
            onColumnChange={setCurrentColumn}
            onDirectionChange={setCurrentDirection}
          />
        </div>

        <div className="text-sm text-[var(--color-charcoal-500)]">
          When all columns are sortable, they all appear in the dropdown.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example where all columns are sortable - all appear in the dropdown selection.",
      },
    },
  },
};

// No sortable columns
export const NoSortableColumns: Story = {
  render: () => {
    const [currentColumn, setCurrentColumn] = useState<string | null>(null);
    const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">(
      "asc"
    );

    const nonSortableColumns: DataTableColumn[] = [
      { key: "name", header: "Name", sortable: false },
      { key: "email", header: "Email", sortable: false },
      { key: "status", header: "Status", sortable: false },
    ];

    return (
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-navy-500)] mb-4">
            No Sortable Columns
          </h3>
          <ColumnSortControls
            columns={nonSortableColumns}
            currentColumn={currentColumn}
            currentDirection={currentDirection}
            onColumnChange={setCurrentColumn}
            onDirectionChange={setCurrentDirection}
          />
        </div>

        <div className="text-sm text-[var(--color-charcoal-500)]">
          When no columns are sortable, only "No sorting" option is available.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Edge case where no columns are sortable. Only the 'No sorting' option appears in the dropdown.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [currentColumn, setCurrentColumn] = useState<string | null>("name");
    const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">(
      "desc"
    );

    return (
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-navy-500)] mb-4">
            Disabled State
          </h3>
          <ColumnSortControls
            columns={sampleColumns}
            currentColumn={currentColumn}
            currentDirection={currentDirection}
            onColumnChange={setCurrentColumn}
            onDirectionChange={setCurrentDirection}
            disabled={true}
          />
        </div>

        <div className="text-sm text-[var(--color-charcoal-500)]">
          Use disabled state during loading or when sorting is temporarily
          unavailable.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state for loading scenarios or when sorting is temporarily unavailable.",
      },
    },
  },
};

// Simulated toolbar layout
export const InToolbarLayout: Story = {
  render: () => {
    const [currentColumn, setCurrentColumn] = useState<string | null>("status");
    const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">(
      "asc"
    );

    return (
      <div className="space-y-6 p-6">
        <h3 className="text-lg font-semibold text-[var(--color-navy-500)]">
          Simulated Toolbar Layout
        </h3>

        {/* Simulated toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-[var(--color-gray-50)] rounded-lg border">
          {/* Left side: Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Simulated search */}
            <div className="w-full sm:w-auto sm:min-w-[300px]">
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md text-sm"
                disabled
              />
            </div>

            {/* Sort controls */}
            <ColumnSortControls
              columns={sampleColumns}
              currentColumn={currentColumn}
              currentDirection={currentDirection}
              onColumnChange={setCurrentColumn}
              onDirectionChange={setCurrentDirection}
            />
          </div>

          {/* Right side: Actions */}
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm border border-[var(--color-border)] rounded-md text-[var(--color-charcoal-500)] bg-white">
              Export
            </button>
            <button className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-md">
              Add Customer
            </button>
          </div>
        </div>

        <div className="text-sm text-[var(--color-charcoal-500)]">
          <strong>Current sort:</strong> {currentColumn || "None"}{" "}
          {currentColumn && `(${currentDirection})`}
        </div>

        <div className="text-xs text-[var(--color-charcoal-400)]">
          This shows how ColumnSortControls integrates naturally into a toolbar
          layout alongside search and action buttons.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Realistic example showing ColumnSortControls in a complete toolbar layout with search field and action buttons.",
      },
    },
  },
};
