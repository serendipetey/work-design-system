// File: packages/components/src/ui/pagination.stories.tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationResults,
} from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A comprehensive pagination component that provides navigation through large datasets. Features include:

- Smart page number generation with ellipsis handling
- Previous/Next navigation with disabled states  
- Results count display ("Showing X to Y of Z results")
- Keyboard navigation and full accessibility
- Responsive design that works on all screen sizes
- Consistent focus states inherited from Button component

Built with design tokens and follows the established component patterns.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    totalItems: {
      control: { type: "number", min: 0, max: 1000 },
      description: "Total number of items across all pages",
    },
    currentPage: {
      control: { type: "number", min: 1, max: 50 },
      description: "Currently active page number",
    },
    itemsPerPage: {
      control: { type: "number", min: 1, max: 100 },
      description: "Number of items to display per page",
    },
    showResults: {
      control: "boolean",
      description: "Whether to show the results count text",
    },
    maxVisiblePages: {
      control: { type: "number", min: 3, max: 15 },
      description: "Maximum number of page links to show before using ellipsis",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive pagination with state management
export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={500}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          showResults={true}
          maxVisiblePages={7}
        />
      </div>
    );
  },
};

// Different configurations
export const SmallDataset: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={25}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(15);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={2000}
          currentPage={currentPage}
          itemsPerPage={20}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const NoResults: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={0}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          showResults={false}
        />
      </div>
    );
  },
};

export const WithoutResultsText: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={500}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          showResults={false}
        />
      </div>
    );
  },
};

export const MinimalVisiblePages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(10);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={1000}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          maxVisiblePages={3}
        />
      </div>
    );
  },
};

export const MaxVisiblePages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(8);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={1000}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          maxVisiblePages={15}
        />
      </div>
    );
  },
};

// Edge cases
export const FirstPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={500}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const LastPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(50);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={500}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const SinglePage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={5}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
        <p className="text-sm text-[var(--color-charcoal-500)] mt-4 text-center">
          Note: Pagination doesn't render when there's only one page
        </p>
      </div>
    );
  },
};

// Individual component demos
export const PaginationItemDemo: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <PaginationItem page={1} onClick={() => {}} />
      <PaginationItem page={2} isActive onClick={() => {}} />
      <PaginationItem page={3} onClick={() => {}} />
      <PaginationItem page={4} disabled onClick={() => {}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Individual pagination item components with different states",
      },
    },
  },
};

export const PaginationNavigationDemo: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <PaginationPrevious onClick={() => {}} />
      <PaginationNext onClick={() => {}} />
      <PaginationPrevious disabled onClick={() => {}} />
      <PaginationNext disabled onClick={() => {}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Previous and Next navigation buttons in enabled and disabled states",
      },
    },
  },
};

export const PaginationEllipsisDemo: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <PaginationItem page={1} onClick={() => {}} />
      <PaginationEllipsis />
      <PaginationItem page={15} isActive onClick={() => {}} />
      <PaginationEllipsis />
      <PaginationItem page={50} onClick={() => {}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Ellipsis component used to indicate skipped pages",
      },
    },
  },
};

export const PaginationResultsDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <PaginationResults currentPage={1} itemsPerPage={10} totalItems={250} />
      <PaginationResults currentPage={5} itemsPerPage={20} totalItems={250} />
      <PaginationResults currentPage={13} itemsPerPage={20} totalItems={250} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Results count display component showing different page states",
      },
    },
  },
};

// Responsive demo
export const ResponsiveDemo: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(15);

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Desktop View</h3>
          <div className="w-full max-w-4xl border border-[var(--color-border)] rounded-lg p-6">
            <Pagination
              totalItems={1000}
              currentPage={currentPage}
              itemsPerPage={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Mobile View</h3>
          <div className="w-full max-w-sm border border-[var(--color-border)] rounded-lg p-4">
            <Pagination
              totalItems={1000}
              currentPage={currentPage}
              itemsPerPage={10}
              onPageChange={setCurrentPage}
              maxVisiblePages={3}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pagination component adapts to different container sizes. Use maxVisiblePages to control how many page links show on smaller screens.",
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    totalItems: 500,
    currentPage: 10,
    itemsPerPage: 20,
    showResults: true,
    maxVisiblePages: 7,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <div className="w-full max-w-2xl">
        <Pagination
          totalItems={args.totalItems}
          currentPage={currentPage}
          itemsPerPage={args.itemsPerPage}
          onPageChange={setCurrentPage}
          showResults={args.showResults}
          maxVisiblePages={args.maxVisiblePages}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground - use the controls below to test different configurations",
      },
    },
  },
};
