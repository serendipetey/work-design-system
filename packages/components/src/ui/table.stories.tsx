// File: packages/components/src/ui/table.stories.tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table";
import { Button } from "./button";

// Sample icons for demo
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M7.333 2.667H2.667A1.333 1.333 0 0 0 1.333 4v9.333A1.333 1.333 0 0 0 2.667 14.667H12a1.333 1.333 0 0 0 1.333-1.334V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.333 1.667a1.414 1.414 0 1 1 2 2L8 10l-2.667.667L6 8l6.333-6.333Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h8.667Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Sample data
const sampleData = [
  {
    id: "1",
    createdOn: "15/01/2024",
    name: "John Doe",
    contactNo: "+61 404 123 456",
    email: "john.doe@example.com",
    label: "Customer",
  },
  {
    id: "2",
    createdOn: "16/01/2024",
    name: "Jane Smith",
    contactNo: "+61 404 789 012",
    email: "jane.smith@example.com",
    label: "Prospect",
  },
  {
    id: "3",
    createdOn: "17/01/2024",
    name: "Bob Johnson",
    contactNo: "+61 404 345 678",
    email: "bob.johnson@example.com",
    label: "Partner",
  },
  {
    id: "4",
    createdOn: "18/01/2024",
    name: "Alice Wilson",
    contactNo: "+61 404 901 234",
    email: "alice.wilson@example.com",
    label: "Customer",
  },
  {
    id: "5",
    createdOn: "19/01/2024",
    name: "Charlie Brown",
    contactNo: "+61 404 567 890",
    email: "charlie.brown@example.com",
    label: "Lead",
  },
];

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Enhanced table component with improved interaction states:

- **Hover states on all variants** - properly working across default and striped tables
- **Destructive delete actions** with proper visual treatment (destructive colored icons)  
- **Striped rows with dual hover behavior** - all rows respond to hover with appropriate styling
- **Larger, more accessible sort arrows** with navy-colored indicators
- **Responsive design** with horizontal scroll
- **Full accessibility** with ARIA labels and improved visual feedback

Built using design tokens and follows established component patterns.
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
    <div className="w-full">
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
              <TableCell>{item.label}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
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
                    className="text-destructive hover:text-destructive"
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
};

// Sortable columns demo
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
      <div className="w-full">
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
                  <div className="flex justify-center gap-2">
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
                      className="text-destructive hover:text-destructive"
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
    );
  },
};

// Striped rows with enhanced hover behavior
export const StripedRows: Story = {
  render: () => (
    <div className="w-full">
      <Table variant="striped">
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
            <TableRow key={item.id} variant="striped">
              <TableCell>{item.createdOn}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.contactNo}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.label}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
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
                    className="text-destructive hover:text-destructive"
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
};

// Minimal table without actions
export const Minimal: Story = {
  render: () => (
    <div className="w-full">
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
};

// Different sizes
export const SmallTable: Story = {
  render: () => (
    <div className="w-full">
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
  ),
};

// Large table
export const LargeTable: Story = {
  render: () => (
    <div className="w-full">
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
  ),
};

// Empty state
export const EmptyState: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="text-center py-8 text-gray-500">
              No data available
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
