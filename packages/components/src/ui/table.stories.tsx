// packages/components/src/ui/table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table";

// Mock data for stories
const mockTableData = [
  {
    id: 1,
    createdOn: "15/01/2024",
    name: "John Smith",
    contactNo: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    label: "Customer",
  },
  {
    id: 2,
    createdOn: "14/01/2024",
    name: "Sarah Johnson",
    contactNo: "+1 (555) 987-6543",
    email: "sarah.johnson@example.com",
    label: "Lead",
  },
  {
    id: 3,
    createdOn: "13/01/2024",
    name: "Michael Chen",
    contactNo: "+1 (555) 456-7890",
    email: "michael.chen@example.com",
    label: "Prospect",
  },
  {
    id: 4,
    createdOn: "12/01/2024",
    name: "Emily Davis",
    contactNo: "+1 (555) 234-5678",
    email: "emily.davis@example.com",
    label: "Customer",
  },
  {
    id: 5,
    createdOn: "11/01/2024",
    name: "David Wilson",
    contactNo: "+1 (555) 345-6789",
    email: "david.wilson@example.com",
    label: "Lead",
  },
];

// Icons for action buttons
const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2" />
  </svg>
);

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A table component that inherits sizing from Input components and follows the same design system patterns. Features unified focus states (--color-focus-500), semantic colors, sortable headers, and proper accessibility. Fully integrates with your design token system.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "bordered"],
      description: "Table visual variant using design system tokens",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Table size inherited from Input component sizing system",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Created On</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTableData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.createdOn}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.contactNo}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.label}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <EditIcon />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded text-red-600">
                    <DeleteIcon />
                  </button>
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
          "Basic table using your design system tokens. Inherits sizing from Input component and uses --color-border, --color-surface, and --color-text-primary tokens.",
      },
    },
  },
};

// All Size Variants
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-6xl">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size}>
          <h3 className="mb-2 text-lg font-medium capitalize">Size: {size}</h3>
          <Table size={size}>
            <TableHeader>
              <TableRow>
                <TableHead size={size}>Created On</TableHead>
                <TableHead size={size}>Name</TableHead>
                <TableHead size={size}>Email</TableHead>
                <TableHead size={size}>Label</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTableData.slice(0, 3).map((item) => (
                <TableRow key={item.id}>
                  <TableCell size={size}>{item.createdOn}</TableCell>
                  <TableCell size={size}>{item.name}</TableCell>
                  <TableCell size={size}>{item.email}</TableCell>
                  <TableCell size={size}>{item.label}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All table sizes (sm/md/lg/xl) inheriting from Input component sizing system. Each size adjusts padding and typography consistently.",
      },
    },
  },
};

// Table Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      {(["default", "striped", "bordered"] as const).map((variant) => (
        <div key={variant}>
          <h3 className="mb-2 text-lg font-medium capitalize">
            Variant: {variant}
          </h3>
          <Table variant={variant}>
            <TableHeader>
              <TableRow>
                <TableHead>Created On</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Label</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTableData.slice(0, 4).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.createdOn}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.label}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All table variants using design system tokens. Striped uses --color-surface-subtle, bordered adds --color-border to cells.",
      },
    },
  },
};

// Sortable Headers
export const SortableHeaders: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              onSort={() => console.log("Sort by Created On")}
            >
              Created On
            </TableHead>
            <TableHead sortable onSort={() => console.log("Sort by Name")}>
              Name
            </TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead sortable onSort={() => console.log("Sort by Email")}>
              Email
            </TableHead>
            <TableHead sortable onSort={() => console.log("Sort by Label")}>
              Label
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTableData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.createdOn}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.contactNo}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.label}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <EditIcon />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded text-red-600">
                    <DeleteIcon />
                  </button>
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
          "Sortable table headers with hover states. Click headers to sort. Uses --color-accent for hover effects.",
      },
    },
  },
};

// Row States (Error/Success/Warning)
export const RowStates: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Label</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow variant="default">
            <TableCell>Default</TableCell>
            <TableCell>John Smith</TableCell>
            <TableCell>john.smith@example.com</TableCell>
            <TableCell>Customer</TableCell>
          </TableRow>
          <TableRow variant="success">
            <TableCell>Success</TableCell>
            <TableCell>Sarah Johnson</TableCell>
            <TableCell>sarah.johnson@example.com</TableCell>
            <TableCell>Verified</TableCell>
          </TableRow>
          <TableRow variant="warning">
            <TableCell>Warning</TableCell>
            <TableCell>Michael Chen</TableCell>
            <TableCell>michael.chen@example.com</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>
          <TableRow variant="error">
            <TableCell>Error</TableCell>
            <TableCell>Emily Davis</TableCell>
            <TableCell>emily.davis@example.com</TableCell>
            <TableCell>Failed</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Table rows with semantic states inherited from Input component. Uses --color-border-error, --color-border-success, and --color-border-warning tokens with matching focus states.",
      },
    },
  },
};

// Clickable Rows
export const ClickableRows: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created On</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Label</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTableData.slice(0, 4).map((item) => (
            <TableRow
              key={item.id}
              clickable
              onClick={() => alert(`Clicked on ${item.name}`)}
            >
              <TableCell>{item.createdOn}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.label}</TableCell>
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
          "Clickable table rows with proper focus states inherited from Input component. Features keyboard navigation (Enter/Space) and --color-focus-500 focus rings.",
      },
    },
  },
};

// Cell Alignment
export const CellAlignment: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Left (Default)</TableHead>
            <TableHead>Center</TableHead>
            <TableHead>Right</TableHead>
            <TableHead>Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTableData.slice(0, 3).map((item, index) => (
            <TableRow key={item.id}>
              <TableCell textAlign="left">{item.name}</TableCell>
              <TableCell textAlign="center">{item.label}</TableCell>
              <TableCell textAlign="right">{item.email}</TableCell>
              <TableCell textAlign="right">${(index + 1) * 1250.0}</TableCell>
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
          "Table cells with different text alignment options (left/center/right). Useful for proper data presentation.",
      },
    },
  },
};
