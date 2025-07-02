// packages/components/src/ui/sidebar-business-logo.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SidebarBusinessLogo } from "./sidebar-business-logo";

const meta: Meta<typeof SidebarBusinessLogo> = {
  title: "UI/SidebarBusinessLogo",
  component: SidebarBusinessLogo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A business logo component designed for sidebar navigation with:

- **Logo Display**: Shows business logo image or fallback placeholder
- **Click Functionality**: Optional navigation to dashboard/home
- **Accessibility**: Proper alt text and focus states
- **Responsive Design**: Scales appropriately for sidebar width
- **Design Token Integration**: Uses consistent styling tokens

Perfect for portal applications where users need quick access to the main dashboard.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    businessName: {
      control: "text",
      description: "Business/company name for alt text and fallback display",
    },
    logoUrl: {
      control: "text",
      description: "URL to the business logo image (optional)",
    },
    width: {
      control: { type: "number", min: 50, max: 300 },
      description: "Logo width in pixels",
    },
    height: {
      control: { type: "number", min: 20, max: 100 },
      description: "Logo height in pixels",
    },
    onClick: {
      description: "Click handler for logo interaction",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "280px",
          backgroundColor: "var(--color-surface, #ffffff)",
          border: "1px solid var(--color-border, #e4e4e4)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic placeholder logo (no image URL)
export const Placeholder: Story = {
  args: {
    businessName: "Acme Corporation",
  },
};

// Clickable placeholder with navigation
export const ClickablePlaceholder: Story = {
  args: {
    businessName: "Tech Startup Inc",
    onClick: () => console.log("navigate-to-dashboard"),
  },
};

// With actual logo image
export const WithLogoImage: Story = {
  args: {
    businessName: "Your Company",
    logoUrl: "https://via.placeholder.com/120x40/0e3a6c/ffffff?text=LOGO",
    width: 120,
    height: 40,
  },
};

// Clickable with logo image
export const ClickableWithLogo: Story = {
  args: {
    businessName: "Portal Pro",
    logoUrl: "https://via.placeholder.com/140x45/0e3a6c/ffffff?text=Portal+Pro",
    width: 140,
    height: 45,
    onClick: () => console.log("navigate-to-home"),
  },
};

// Small logo variation
export const SmallLogo: Story = {
  args: {
    businessName: "Micro Corp",
    logoUrl: "https://via.placeholder.com/80x30/0e3a6c/ffffff?text=MC",
    width: 80,
    height: 30,
    onClick: () => console.log("navigate"),
  },
};

// Long business name (tests truncation)
export const LongBusinessName: Story = {
  args: {
    businessName: "Very Long Business Name That Should Truncate",
  },
};

// Different logo sizes
export const CustomSizing: Story = {
  args: {
    businessName: "Custom Size Co",
    logoUrl: "https://via.placeholder.com/100x60/0e3a6c/ffffff?text=Custom",
    width: 100,
    height: 60,
  },
};

// Sidebar integration example
export const SidebarIntegration: Story = {
  render: () => (
    <div
      style={{
        width: "280px",
        backgroundColor: "var(--color-surface, #ffffff)",
        border: "1px solid var(--color-border, #e4e4e4)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <SidebarBusinessLogo
        businessName="Integrated Portal"
        onClick={() => console.log("navigate-to-dashboard")}
      />

      {/* Example content below logo */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid var(--color-border, #e4e4e4)",
          backgroundColor: "var(--color-gray-50, #f7f8f9)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "var(--color-navy-500, #0e3a6c)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            JD
          </div>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--color-navy-500, #0e3a6c)",
              }}
            >
              John Doe
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-gray-500, #8f949a)",
              }}
            >
              Administrator
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of how the business logo integrates with other sidebar components like user profile.",
      },
    },
  },
};
