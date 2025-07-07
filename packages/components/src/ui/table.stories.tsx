// Test hover states specifically
export const HoverStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <h4 className="font-semibold text-orange-800 mb-2">🎯 Hover Test</h4>
        <p className="text-sm text-orange-700">
          Move your mouse over any row below. Each row should change to a{" "}
          <strong>light grey background</strong> on hover. If you don't see this
          happening, there's an issue with the hover states.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Item</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Expected Behavior</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Row 1</TableCell>
            <TableCell>Default white background</TableCell>
            <TableCell>Should turn grey on hover</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
            <TableCell>Default white background</TableCell>
            <TableCell>Should turn grey on hover</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 3</TableCell>
            <TableCell>Default white background</TableCell>
            <TableCell>Should turn grey on hover</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="text-xs text-gray-600">
        💡 If rows don't change color on hover, the hover states aren't working
        properly.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Isolated test for hover states. Each row should show a grey background when hovered.",
      },
    },
  },
};

// packages/components/src/ui/table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "./button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

// Sample data for stories
const sampleData = [
  {
    id: 1,
    createdOn: "2024-01-15",
    name: "John Doe",
    contactNo: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    label: "Premium",
  },
  {
    id: 2,
    createdOn: "2024-01-16",
    name: "Jane Smith",
    contactNo: "+1 (555) 987-6543",
    email: "jane.smith@example.com",
    label: "Standard",
  },
  {
    id: 3,
    createdOn: "2024-01-17",
    name: "Bob Johnson",
    contactNo: "+1 (555) 246-8135",
    email: "bob.johnson@example.com",
    label: "Basic",
  },
  {
    id: 4,
    createdOn: "2024-01-18",
    name: "Alice Wilson",
    contactNo: "+1 (555) 369-2580",
    email: "alice.wilson@example.com",
    label: "Premium",
  },
  {
    id: 5,
    createdOn: "2024-01-19",
    name: "Charlie Brown",
    contactNo: "+1 (555) 147-2589",
    email: "charlie.brown@example.com",
    label: "Standard",
  },
];

// Action icons
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064L11.189 6.25Z" />
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

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**Enhanced Table Component with Design Tokens + Fallbacks**

A comprehensive table implementation featuring all requested improvements:

🎨 **Design & Interaction Improvements:**
- **Visible grey hover states**: Row hovers use distinct grey (#f3f4f6) that's clearly visible
- **Proper edit icon**: Clean pencil/edit icon matching the design
- **Enhanced clickable headers**: Strong visual feedback with grey background + blue text
- **True alternating rows**: Clear white → grey → white → grey pattern in striped variant
- **Tighter button spacing**: Reduced gap between action buttons for cleaner layout
- **Full-width tables**: Tables now properly fill container width without scroll issues

🏗️ **Technical Features:**
- **Design Token Integration**: Uses CSS custom properties with robust fallbacks
- **Multiple Variants**: Default, striped, and minimal layouts
- **Size Options**: Small, medium, and large sizing
- **Interactive Sorting**: Click headers to sort with visual direction indicators
- **Responsive Design**: Horizontal scroll container for mobile compatibility
- **Accessibility**: Proper ARIA attributes and keyboard navigation

**Variants:**
- \`default\`: Standard white background with grey hover
- \`striped\`: Alternating white/grey rows with enhanced hover states  
- \`minimal\`: Clean borderless design

**Architecture:**
- 🎯 **Token + Fallback Pattern**: \`var(--color-token, #fallback)\`
- 🏗️ **CVA Structure**: Class variance authority for consistent variants
- 📱 **Mobile Ready**: Overflow scroll container handles wide tables
- ♿ **Accessible**: Screen reader friendly with proper semantics

**File Location:** \`packages/components/src/ui/table.tsx\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic table with all features
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-[var(--color-text-muted, #6b7280)]">
        Default table with design tokens + fallbacks architecture
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable>Created On</TableHead>
            <TableHead sortable>Name</TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Label</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.createdOn}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.contactNo}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-50, #eff6ff)] text-[var(--color-primary-700, #1d4ed8)]">
                  {item.label}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Edit ${item.name}`}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[var(--color-red-600, #dc2626)] hover:text-[var(--color-red-700, #b91c1c)]"
                    aria-label={`Delete ${item.name}`}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default table showcasing all improvements: visible grey hover states, proper edit/delete icons, and design token integration with robust fallbacks.",
      },
    },
  },
};

// Sortable columns demo with interactive state
export const SortableColumns: Story = {
  render: () => {
    const [sortField, setSortField] = useState<string | null>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSort = (field: string) => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    };

    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortField) return 0;
      const aValue = (a as any)[sortField];
      const bValue = (b as any)[sortField];
      const multiplier = sortDirection === "asc" ? 1 : -1;
      return aValue.localeCompare(bValue) * multiplier;
    });

    return (
      <div className="w-full space-y-4">
        <div className="text-sm text-[var(--color-text-muted, #6b7280)]">
          Interactive sorting with proper state management and visual indicators
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                sortable
                sortDirection={
                  sortField === "createdOn" ? sortDirection : false
                }
                onSort={() => handleSort("createdOn")}
              >
                Created On
              </TableHead>
              <TableHead
                sortable
                sortDirection={sortField === "name" ? sortDirection : false}
                onSort={() => handleSort("name")}
              >
                Name
              </TableHead>
              <TableHead>Contact No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.createdOn}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.contactNo}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Edit ${item.name}`}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--color-red-600, #dc2626)] hover:text-[var(--color-red-700, #b91c1c)]"
                      aria-label={`Delete ${item.name}`}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="text-xs text-[var(--color-text-muted, #6b7280)]">
          Currently sorted by: <strong>{sortField || "none"}</strong> (
          {sortDirection})
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive table with sortable columns and proper state management. Click column headers to sort.",
      },
    },
  },
};

// Striped rows variant
export const AlternatingRows: Story = {
  render: () => (
    <div className="w-full space-y-4">
      <div className="text-sm text-[var(--color-text-muted, #6b7280)]">
        Striped variant with alternating row backgrounds (white → grey → white →
        grey). Hover over any row to see the distinct grey hover effects.
      </div>
      <Table variant="striped">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((item, index) => (
            <TableRow key={item.id} variant="striped">
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    index % 3 === 0
                      ? "bg-[var(--color-green-50, #f0fdf4)] text-[var(--color-green-700, #15803d)]"
                      : index % 3 === 1
                      ? "bg-[var(--color-yellow-50, #fefce8)] text-[var(--color-yellow-700, #a16207)]"
                      : "bg-[var(--color-gray-50, #f9fafb)] text-[var(--color-gray-700, #374151)]"
                  }`}
                >
                  {index % 3 === 0
                    ? "Active"
                    : index % 3 === 1
                    ? "Pending"
                    : "Inactive"}
                </span>
              </TableCell>
              <TableCell>{item.createdOn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-xs text-[var(--color-text-muted, #6b7280)] space-y-1">
        <p>
          <strong>Expected Pattern:</strong>
        </p>
        <ul className="list-disc list-inside ml-4 space-y-0.5">
          <li>Row 1 (John Doe): White background</li>
          <li>Row 2 (Jane Smith): Grey background (even row)</li>
          <li>Row 3 (Bob Johnson): White background</li>
          <li>Row 4 (Alice Wilson): Grey background (even row)</li>
          <li>Row 5 (Charlie Brown): White background</li>
        </ul>
        <p className="mt-2">
          <strong>Hover Effect:</strong> All rows should turn darker grey when
          hovered.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Striped table variant with clear alternating white/grey row backgrounds. Each even row (#2, #4, etc.) has a grey background (#f9fafb) while odd rows remain white. Hover states are enhanced for both background types.",
      },
    },
  },
};

// Minimal table without borders
export const Minimal: Story = {
  render: () => (
    <div className="w-full space-y-4">
      <div className="text-sm text-[var(--color-text-muted, #6b7280)]">
        Minimal variant without borders for cleaner presentation
      </div>
      <Table variant="minimal">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>Inactive</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Clean minimal table without borders, perfect for dashboard widgets or embedded content.",
      },
    },
  },
};

// Size variants showcase
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
          Small Table
        </h3>
        <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
          Compact sizing for dense data display
        </div>
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell size="sm">John Doe</TableCell>
              <TableCell size="sm">john@example.com</TableCell>
              <TableCell size="sm">Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="sm">Jane Smith</TableCell>
              <TableCell size="sm">jane@example.com</TableCell>
              <TableCell size="sm">Pending</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
          Medium Table (Default)
        </h3>
        <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
          Standard sizing for most use cases
        </div>
        <Table size="md">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell size="md">John Doe</TableCell>
              <TableCell size="md">john@example.com</TableCell>
              <TableCell size="md">Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="md">Jane Smith</TableCell>
              <TableCell size="md">jane@example.com</TableCell>
              <TableCell size="md">Pending</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-heading, #1f2937)]">
          Large Table
        </h3>
        <div className="text-sm text-[var(--color-text-muted, #6b7280)] mb-3">
          Spacious sizing for improved readability
        </div>
        <Table size="lg">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell size="lg">John Doe</TableCell>
              <TableCell size="lg">john@example.com</TableCell>
              <TableCell size="lg">Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="lg">Jane Smith</TableCell>
              <TableCell size="lg">jane@example.com</TableCell>
              <TableCell size="lg">Pending</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All three size variants showing different padding and typography scales using design tokens.",
      },
    },
  },
};

// Empty state example
export const EmptyState: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-[var(--color-text-muted, #6b7280)]">
        Proper empty state handling with accessibility considerations
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center py-12 text-[var(--color-text-muted, #6b7280)]"
            >
              <div className="flex flex-col items-center gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[var(--color-text-muted, #6b7280)]"
                >
                  <path
                    d="M9 7H15M9 11H15M9 15H13M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="font-medium">No data available</p>
                  <p className="text-sm">
                    Get started by adding your first entry
                  </p>
                </div>
                <Button variant="primary" size="sm">
                  Add Entry
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Well-designed empty state with clear messaging and call-to-action, following design system patterns.",
      },
    },
  },
};
