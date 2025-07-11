// packages/components/src/ui/data-table.stories.tsx
// 🎯 OPTIMAL ARCHITECTURE: Design Tokens with Robust Fallbacks

import type { Meta, StoryObj } from "@storybook/react-vite";
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
**Enhanced DataTable with Design Tokens + Fallbacks**

Complete data table component featuring:

🎨 **Design System Integration:**
- **Design Tokens + Fallbacks**: Uses \`var(--token-name, fallback)\` pattern
- **CVA Variants**: Consistent styling with class-variance-authority
- **Multiple Sizes**: Small, medium, large variants
- **Surface Variants**: Default and elevated styling options

🔧 **Core Features:**
- **Toolbar Sorting**: Clean column dropdown + direction toggle
- **Search & Filter**: Integrated search with customizable placeholder
- **Pagination**: Configurable page sizes with result counts
- **Row Actions**: Icon-only buttons with proper styling
- **Loading States**: Design token-based loading and empty states

🎯 **Button Styling** (matches table.stories.tsx):
- \`data-icon-only="true"\` and \`data-size="sm"\` attributes
- Design token colors for destructive actions
- Proper accessibility with aria-labels

**Architecture:**
- 🏗️ **Token + Fallback Pattern**: All colors use design tokens with fallbacks
- 📱 **Responsive Design**: Mobile-friendly toolbar and table layout
- ♿ **Accessibility**: Proper ARIA attributes and semantic markup
- 🔄 **State Management**: Built-in hooks for search, sort, and pagination

**File Location:** \`packages/components/src/ui/data-table.tsx\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with all features
export const Default: Story = {
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
        sortable: false,
      },
    ];

    const EditIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Z" />
      </svg>
    );

    const DeleteIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path
          fillRule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    );

    return (
      <DataTable
        data={sampleData}
        columns={columns}
        title="Enhanced DataTable Demo"
        description="Featuring design tokens + fallbacks with toolbar sorting controls"
        variant="default"
        size="md"
        searchable={true}
        searchPlaceholder="Search users..."
        pagination={{ pageSize: 10, showResults: true }}
        rowActions={[
          {
            label: "Edit",
            icon: <EditIcon />,
            onClick: (row) => console.log("Edit:", row),
            variant: "ghost",
          },
          {
            label: "Delete",
            icon: <DeleteIcon />,
            onClick: (row) => console.log("Delete:", row),
            variant: "destructive",
          },
        ]}
        toolbarActions={[
          {
            label: "Add User",
            onClick: () => console.log("Add User"),
            variant: "primary",
          },
          {
            label: "Export",
            onClick: () => console.log("Export"),
            variant: "outline",
          },
        ]}
        striped={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Complete DataTable demo** with all features enabled:
- ✅ **Design Tokens**: All styling uses design tokens with fallbacks
- ✅ **Toolbar Sorting**: Clean dropdown + direction controls
- ✅ **Search & Pagination**: Full data management
- ✅ **Row Actions**: Icon-only buttons with proper styling
- ✅ **Striped Layout**: Alternating row backgrounds

**Try the features:**
1. **Search**: Type in the search field to filter results
2. **Sort**: Use the dropdown to select column and direction
3. **Actions**: Click edit/delete buttons (styled per table.stories.tsx)
4. **Pagination**: Navigate through pages with result counts
        `,
      },
    },
  },
};

// Toolbar sorting focus story
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
        variant="default"
        size="md"
        searchable={true}
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
**Toolbar sorting demonstration:**
1. **Column dropdown** - Select which column to sort by
2. **Direction button** - Click to toggle between ascending ↑ and descending ↓
3. **No sorting** - Select "No sorting" to clear sort state

Notice how the table headers remain clean without cluttered dropdowns or complex controls.
        `,
      },
    },
  },
};

// Size variants showcase
export const SizeVariants: Story = {
  render: () => {
    const simpleColumns: DataTableColumn[] = [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ];

    const simpleData = sampleData.slice(0, 3);

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
            Small DataTable
          </h3>
          <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
            Compact sizing for dense data displays
          </div>
          <DataTable
            data={simpleData}
            columns={simpleColumns}
            size="sm"
            searchable={true}
            rowActions={createDefaultRowActions()}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
            Medium DataTable (Default)
          </h3>
          <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
            Standard sizing for most use cases
          </div>
          <DataTable
            data={simpleData}
            columns={simpleColumns}
            size="md"
            searchable={true}
            rowActions={createDefaultRowActions()}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
            Large DataTable
          </h3>
          <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
            Spacious sizing for improved readability
          </div>
          <DataTable
            data={simpleData}
            columns={simpleColumns}
            size="lg"
            searchable={true}
            rowActions={createDefaultRowActions()}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All three size variants showing different padding and typography scales using design tokens + fallbacks.",
      },
    },
  },
};

// Variant showcase (default vs elevated)
export const VariantShowcase: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ];

    const simpleData = sampleData.slice(0, 3);

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
            Default Variant
          </h3>
          <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
            Standard flat appearance with design tokens
          </div>
          <DataTable
            data={simpleData}
            columns={columns}
            variant="default"
            searchable={true}
            rowActions={createDefaultRowActions()}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
            Elevated Variant
          </h3>
          <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
            Enhanced with subtle shadow for prominence
          </div>
          <DataTable
            data={simpleData}
            columns={columns}
            variant="elevated"
            searchable={true}
            rowActions={createDefaultRowActions()}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Variant comparison showing default vs elevated styling using design tokens with shadow fallbacks.",
      },
    },
  },
};

// Search only example
export const SearchOnly: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      { key: "name", header: "Name" }, // No sorting
      { key: "email", header: "Email" },
      { key: "status", header: "Status" },
    ];

    return (
      <DataTable
        data={sampleData}
        columns={columns}
        title="Search-Only DataTable"
        description="No sortable columns means toolbar sort controls are hidden. Only search remains visible."
        searchable={true}
        searchPlaceholder="Search users..."
        rowActions={createDefaultRowActions()}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "When no columns are sortable, the sort controls automatically hide. Only search remains visible.",
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
        variant="default"
        size="md"
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
        variant="default"
        size="sm"
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

// Loading and empty states
export const StateExamples: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
            Loading State
          </h3>
          <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
            Uses design token colors for loading message
          </div>
          <DataTable
            data={[]}
            columns={columns}
            loading={true}
            searchable={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
            Empty State
          </h3>
          <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
            Custom empty message with design token styling
          </div>
          <DataTable
            data={[]}
            columns={columns}
            emptyMessage="No users found. Try adjusting your search criteria."
            searchable={true}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading and empty states showcase design token integration for consistent text colors and styling.",
      },
    },
  },
};
