// packages/components/src/ui/sidebar-menu.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Building2,
  FileText,
  DollarSign,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Shield,
  AlertCircle,
  Clock,
} from "lucide-react";
import { SidebarMenu, SidebarToggle } from "./sidebar-menu";
import { SidebarProfile, type SidebarProfileData } from "./sidebar-profile";
import { SidebarBusinessLogo } from "./sidebar-business-logo";
import { SidebarMenuItem } from "./sidebar-menu-item";
import {
  SidebarMenuSection,
  SidebarMenuSectionRoot,
} from "./sidebar-menu-section";
import {
  useNavigationState,
  type NavigationConfig,
} from "./sidebar-navigation-utils";

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A comprehensive sidebar navigation menu for logged-in users with:

- **Business Logo**: Prominent branding with optional dashboard navigation
- **User Profile Section**: Entity name, contact info, role, and entity switching
- **Collapsible Sections**: Accordion-style grouping of related services
- **Smart Active States**: URL-based navigation with auto-expansion
- **Badge Notifications**: Visual indicators for pending items
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Works across all screen sizes
- **Design Token Integration**: 100% token-based styling

Built for portal applications where users represent entities and need to navigate between different services and functions.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user configurations
const adminUser: SidebarProfileData = {
  contact: { name: "Jane Doe", role: "Administrator" },
  entity: { name: "Acme Corp", id: "acme-001" },
};

const regularUser: SidebarProfileData = {
  contact: { name: "John Smith", role: "User" },
  entity: { name: "Beta Industries Ltd", id: "beta-002" },
};

const managerUser: SidebarProfileData = {
  contact: { name: "Sarah Johnson", role: "Manager" },
  entity: { name: "Gamma Solutions", id: "gamma-003" },
};

// Sample navigation configurations
const fullNavigationConfig: NavigationConfig = {
  standalone: [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
  ],
  sections: [
    {
      id: "funding",
      title: "Funding",
      icon: DollarSign,
      defaultOpen: true,
      items: [
        {
          id: "apply-funding",
          label: "Apply for Funding",
          href: "/funding/apply",
        },
        {
          id: "submit-returns",
          label: "Submit Returns",
          href: "/funding/returns",
          badge: "3",
        },
        {
          id: "view-applications",
          label: "View Applications",
          href: "/funding/applications",
        },
        {
          id: "funding-calculator",
          label: "Funding Calculator",
          href: "/funding/calculator",
        },
      ],
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: Shield,
      items: [
        {
          id: "compliance-overview",
          label: "Overview",
          href: "/compliance",
        },
        {
          id: "audit-reports",
          label: "Audit Reports",
          href: "/compliance/audits",
        },
        {
          id: "policy-management",
          label: "Policy Management",
          href: "/compliance/policies",
        },
      ],
    },
    {
      id: "reports",
      title: "Reports",
      icon: FileText,
      items: [
        {
          id: "financial-reports",
          label: "Financial Reports",
          href: "/reports/financial",
        },
        {
          id: "analytics",
          label: "Analytics",
          href: "/reports/analytics",
        },
        {
          id: "export-data",
          label: "Export Data",
          href: "/reports/export",
        },
      ],
    },
  ],
};

// Complete sidebar with all components including business logo
export const CompleteWithLogo: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState("/funding/apply");

    const { activeItemId, expandedSections, toggleSection, isSectionExpanded } =
      useNavigationState(fullNavigationConfig, currentPath);

    const handleNavigation = (href: string) => {
      console.log("Navigate to:", href);
      setCurrentPath(href);
    };

    const handleLogoClick = () => {
      console.log("Navigate to dashboard");
      setCurrentPath("/dashboard");
    };

    return (
      <div className="h-screen flex">
        <SidebarMenu size="md">
          {/* Business Logo */}
          <SidebarBusinessLogo
            businessName="Portal Pro"
            onClick={handleLogoClick}
          />

          {/* User Profile */}
          <SidebarProfile
            user={adminUser}
            onSwitchEntity={() => console.log("Switch entity")}
          />

          {/* Navigation */}
          <div className="flex-1 py-4">
            {/* Standalone Items */}
            <div className="px-2 mb-4 space-y-1">
              {fullNavigationConfig.standalone?.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  icon={item.icon}
                  active={activeItemId === item.id}
                  onNavigate={handleNavigation}
                  href={item.href}
                >
                  {item.label}
                </SidebarMenuItem>
              ))}
            </div>

            {/* Collapsible Sections */}
            <SidebarMenuSectionRoot type="multiple" value={expandedSections}>
              {fullNavigationConfig.sections.map((section) => (
                <SidebarMenuSection
                  key={section.id}
                  title={section.title}
                  icon={section.icon}
                  value={section.id}
                  expanded={isSectionExpanded(section.id)}
                  onToggle={() => toggleSection(section.id)}
                >
                  <div className="space-y-1 px-2">
                    {section.items.map((item) => (
                      <SidebarMenuItem
                        key={item.id}
                        size="sm"
                        active={activeItemId === item.id}
                        onNavigate={handleNavigation}
                        href={item.href}
                        badge={item.badge}
                      >
                        {item.label}
                      </SidebarMenuItem>
                    ))}
                  </div>
                </SidebarMenuSection>
              ))}
            </SidebarMenuSectionRoot>
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-[var(--color-border)] p-2 space-y-1">
            <SidebarMenuItem
              icon={Bell}
              size="sm"
              active={currentPath === "/notifications"}
              onNavigate={handleNavigation}
              href="/notifications"
              badge="5"
            >
              Notifications
            </SidebarMenuItem>
            <SidebarMenuItem
              icon={Users}
              size="sm"
              active={currentPath === "/profile"}
              onNavigate={handleNavigation}
              href="/profile"
            >
              Profile
            </SidebarMenuItem>
            <SidebarMenuItem
              icon={LogOut}
              size="sm"
              onClick={() => console.log("Sign out")}
            >
              Sign Out
            </SidebarMenuItem>
          </div>
        </SidebarMenu>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-4 sm:p-8 bg-[var(--color-surface-subtle)] overflow-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-heading)]">
              Complete Sidebar with Business Logo
            </h1>
            <p className="text-[var(--color-text-body)] mt-2">
              Current Page: {currentPath}
            </p>
            <p className="text-[var(--color-text-muted)] mt-1 text-sm">
              Active Item: {activeItemId || "None"}
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete sidebar implementation showcasing the business logo integration with all navigation components and Option A styling refinements.",
      },
    },
  },
};

// With custom logo image
export const WithCustomLogo: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState("/dashboard");

    const { activeItemId, expandedSections, toggleSection, isSectionExpanded } =
      useNavigationState(fullNavigationConfig, currentPath);

    const handleNavigation = (href: string) => {
      setCurrentPath(href);
    };

    return (
      <div className="h-screen flex">
        <SidebarMenu size="md">
          {/* Custom Logo */}
          <SidebarBusinessLogo
            businessName="Tech Solutions Inc"
            logoUrl="https://via.placeholder.com/130x42/0e3a6c/ffffff?text=TechSol"
            width={130}
            height={42}
            onClick={() => handleNavigation("/dashboard")}
          />

          <SidebarProfile
            user={managerUser}
            onSwitchEntity={() => console.log("Switch entity")}
          />

          <div className="flex-1 py-4">
            <div className="px-2 mb-4 space-y-1">
              {fullNavigationConfig.standalone?.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  icon={item.icon}
                  active={activeItemId === item.id}
                  onNavigate={handleNavigation}
                  href={item.href}
                >
                  {item.label}
                </SidebarMenuItem>
              ))}
            </div>

            <SidebarMenuSectionRoot type="multiple" value={expandedSections}>
              {fullNavigationConfig.sections.slice(0, 2).map((section) => (
                <SidebarMenuSection
                  key={section.id}
                  title={section.title}
                  icon={section.icon}
                  value={section.id}
                  expanded={isSectionExpanded(section.id)}
                  onToggle={() => toggleSection(section.id)}
                >
                  <div className="space-y-1 px-2">
                    {section.items.slice(0, 3).map((item) => (
                      <SidebarMenuItem
                        key={item.id}
                        size="sm"
                        active={activeItemId === item.id}
                        onNavigate={handleNavigation}
                        href={item.href}
                        badge={item.badge}
                      >
                        {item.label}
                      </SidebarMenuItem>
                    ))}
                  </div>
                </SidebarMenuSection>
              ))}
            </SidebarMenuSectionRoot>
          </div>
        </SidebarMenu>

        <div className="flex-1 p-8 bg-[var(--color-surface-subtle)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-heading)]">
            Custom Logo Integration
          </h1>
          <p className="text-[var(--color-text-body)] mt-2">
            Demonstrates sidebar with a custom logo image instead of
            placeholder.
          </p>
        </div>
      </div>
    );
  },
};

// Mobile responsive version with logo
export const ResponsiveMobileWithLogo: Story = {
  render: () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("/dashboard");

    const { activeItemId, expandedSections, toggleSection, isSectionExpanded } =
      useNavigationState(fullNavigationConfig, currentPath);

    const handleNavigation = (href: string) => {
      setCurrentPath(href);
      setMobileOpen(false);
    };

    return (
      <div className="h-screen flex">
        {/* Mobile header with toggle */}
        <div className="sm:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[var(--color-text-heading)]">
            Portal Pro
          </h1>
          <SidebarToggle open={mobileOpen} onToggle={setMobileOpen} />
        </div>

        {/* Sidebar with mobile overlay behavior */}
        <SidebarMenu
          mobile="overlay"
          mobileOpen={mobileOpen}
          onMobileToggle={setMobileOpen}
          size="md"
        >
          <SidebarBusinessLogo
            businessName="Portal Pro"
            onClick={() => {
              handleNavigation("/dashboard");
              setMobileOpen(false);
            }}
          />

          <SidebarProfile
            user={adminUser}
            onSwitchEntity={() => {
              console.log("Switch entity");
              setMobileOpen(false);
            }}
          />

          <div className="flex-1 py-4">
            <div className="px-2 mb-4 space-y-1">
              {fullNavigationConfig.standalone?.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  icon={item.icon}
                  active={activeItemId === item.id}
                  onNavigate={handleNavigation}
                  href={item.href}
                >
                  {item.label}
                </SidebarMenuItem>
              ))}
            </div>

            <SidebarMenuSectionRoot type="multiple" value={expandedSections}>
              {fullNavigationConfig.sections.map((section) => (
                <SidebarMenuSection
                  key={section.id}
                  title={section.title}
                  icon={section.icon}
                  value={section.id}
                  expanded={isSectionExpanded(section.id)}
                  onToggle={() => toggleSection(section.id)}
                >
                  <div className="space-y-1 px-2">
                    {section.items.map((item) => (
                      <SidebarMenuItem
                        key={item.id}
                        size="sm"
                        active={activeItemId === item.id}
                        onNavigate={handleNavigation}
                        href={item.href}
                        badge={item.badge}
                      >
                        {item.label}
                      </SidebarMenuItem>
                    ))}
                  </div>
                </SidebarMenuSection>
              ))}
            </SidebarMenuSectionRoot>
          </div>

          <div className="border-t border-[var(--color-border)] p-2 space-y-1">
            <SidebarMenuItem
              icon={Bell}
              size="sm"
              active={currentPath === "/notifications"}
              onNavigate={handleNavigation}
              href="/notifications"
              badge="5"
            >
              Notifications
            </SidebarMenuItem>
            <SidebarMenuItem
              icon={Users}
              size="sm"
              active={currentPath === "/profile"}
              onNavigate={handleNavigation}
              href="/profile"
            >
              Profile
            </SidebarMenuItem>
            <SidebarMenuItem
              icon={LogOut}
              size="sm"
              onClick={() => {
                console.log("Sign out");
                setMobileOpen(false);
              }}
            >
              Sign Out
            </SidebarMenuItem>
          </div>
        </SidebarMenu>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile spacer */}
          <div className="h-16 sm:h-0 flex-shrink-0" />

          <div className="flex-1 p-4 sm:p-8 bg-[var(--color-surface-subtle)] overflow-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-heading)]">
              Responsive Sidebar with Logo
            </h1>
            <p className="text-[var(--color-text-body)] mt-2">
              Current Page: {currentPath}
            </p>
            <p className="text-[var(--color-text-muted)] mt-1 text-sm">
              Try resizing the window or using mobile view to see responsive
              behavior.
            </p>
          </div>
        </div>
      </div>
    );
  },
};
