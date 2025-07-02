// packages/components/src/ui/data-table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  DataTable,
  type DataTableColumn,
  createDefaultRowActions,
} from "./data-table";

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    createdOn: "2024-01-15",
    priority: "High",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Pending",
    createdOn: "2024-01-16",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Inactive",
    createdOn: "2024-01-17",
    priority: "Low",
  },
  {
    id: 4,
    name: "Alice Wilson",
    email: "alice@example.com",
    status: "Active",
    createdOn: "2024-01-18",
    priority: "High",
  },
];

const meta: Meta<typeof DataTable> = {
  title: "UI/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**DataTable with Toolbar Sort Controls**

Enhanced DataTable component with clean sorting interface:

- **Toolbar sorting**: Column selector dropdown + direction toggle button
- **Clean layout**: Sort controls positioned next to search field
- **Single source**: One set of controls for entire table
- **Better UX**: No cluttered column headers, clear sort state

**Layout:**
\`[Search Field] [Sort by: Column ▼] [↑/↓ Direction] [Actions...]\`

Features:
- **Column dropdown** - Shows all sortable columns
- **Direction button** - Ghost button with rotating arrow icon
- **Synchronized state** - All controls share same sort state
- **Auto-detection** - Only shows sort controls when sortable columns exist
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with toolbar sorting
export const ToolbarSorting: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      {
        key: "name",
        header: "Name",
        sortable: true,
      },
      {
        key: "email",
        header: "Email",
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
      },
      {
        key: "createdOn",
        header: "Created Date",
        sortable: true,
      },
      {
        key: "priority",
        header: "Priority",
        sortable: false, // Not sortable
      },
    ];

    return (
      <DataTable
        data={sampleData}
        columns={columns}
        title="Toolbar Sorting Demo"
        description="Sort controls are cleanly positioned in the toolbar next to search"
        rowActions={createDefaultRowActions(
          (row) => console.log("Edit:", row),
          (row) => console.log("Delete:", row)
        )}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Try the toolbar sorting:**
1. **Column dropdown** - Select which column to sort by
2. **Direction button** - Click to toggle between ascending ↑ and descending ↓
3. **No sorting** - Select "No sorting" to clear sort state

Notice how the table headers remain clean without cluttered dropdowns or complex controls.
        `,
      },
    },
  },
};

// Example with mixed sortable/non-sortable columns
export const MixedColumns: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      {
        key: "name",
        header: "Customer Name",
        sortable: true,
      },
      {
        key: "email",
        header: "Email Address",
        sortable: true,
      },
      {
        key: "status",
        header: "Account Status",
        sortable: true,
      },
      {
        key: "createdOn",
        header: "Registration Date",
        sortable: true,
      },
      {
        key: "priority",
        header: "Support Level",
        sortable: false, // This column won't appear in sort dropdown
      },
    ];

    return (
      <DataTable
        data={sampleData}
        columns={columns}
        title="Customer Management"
        description="Mix of sortable and non-sortable columns - only sortable ones appear in dropdown"
        searchable={true}
        striped={true}
        defaultSort={{ key: "name", direction: "asc" }}
        rowActions={createDefaultRowActions(
          (row) => console.log("Edit customer:", (row as any).name),
          (row) => console.log("Delete customer:", (row as any).name)
        )}
        toolbarActions={[
          {
            label: "Add Customer",
            onClick: () => console.log("Add new customer"),
            variant: "primary",
          },
          {
            label: "Export CSV",
            onClick: () => console.log("Export data"),
            variant: "outline",
          },
        ]}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Real-world example** with default sorting:
- Notice how "Support Level" doesn't appear in the sort dropdown (not sortable)
- Table starts with default sort by "Customer Name" ascending
- Clean toolbar layout with search, sort controls, and action buttons
        `,
      },
    },
  },
};

// No sortable columns - sort controls hidden
export const NoSortableColumns: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      {
        key: "name",
        header: "Name",
        sortable: false,
      },
      {
        key: "email",
        header: "Email",
        sortable: false,
      },
      {
        key: "status",
        header: "Status",
        sortable: false,
      },
    ];

    return (
      <DataTable
        data={sampleData}
        columns={columns}
        title="Read-Only Data"
        description="When no columns are sortable, sort controls are automatically hidden"
        searchable={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "When no columns are marked as sortable, the sort controls are automatically hidden from the toolbar. Only search remains visible.",
      },
    },
  },
};

// Large dataset with pagination
export const LargeDataset: Story = {
  render: () => {
    // Generate larger dataset
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: ["Active", "Pending", "Inactive"][i % 3],
      createdOn: `2024-01-${String((i % 28) + 1).padStart(2, "0")}`,
      priority: ["High", "Medium", "Low"][i % 3],
    }));

    const columns: DataTableColumn[] = [
      {
        key: "name",
        header: "Name",
        sortable: true,
      },
      {
        key: "email",
        header: "Email",
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
      },
      {
        key: "createdOn",
        header: "Created",
        sortable: true,
      },
      {
        key: "priority",
        header: "Priority",
        sortable: true,
      },
    ];

    return (
      <DataTable
        data={largeData}
        columns={columns}
        title="Large Dataset Performance Test"
        description="50 rows with pagination and toolbar sorting controls"
        pagination={{ pageSize: 10, showResults: true }}
        searchable={true}
        striped={true}
        defaultSort={{ key: "name", direction: "asc" }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Performance test with larger dataset. Sort controls remain responsive with pagination, search, and sorting all working together smoothly.",
      },
    },
  },
};

// Minimal layout example
export const MinimalLayout: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      {
        key: "name",
        header: "Name",
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
      },
    ];

    return (
      <DataTable
        data={sampleData.slice(0, 3)}
        columns={columns}
        searchable={false}
        // No title, description, or actions - just the essentials
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal layout showing just the table with toolbar sort controls. No search, title, or actions - perfect for embedded use cases.",
      },
    },
  },
};
