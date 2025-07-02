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
          id: "funding-apply",
          label: "Apply for Funding",
          href: "/funding/apply",
        },
        {
          id: "funding-returns",
          label: "Submit Returns",
          href: "/funding/returns",
          badge: "3",
        },
        {
          id: "funding-history",
          label: "Application History",
          href: "/funding/history",
        },
        {
          id: "funding-reports",
          label: "Financial Reports",
          href: "/funding/reports",
        },
      ],
    },
    {
      id: "registration",
      title: "Registration Services",
      icon: Building2,
      items: [
        { id: "reg-new", label: "New Registration", href: "/registration/new" },
        {
          id: "reg-renewals",
          label: "Renewals",
          href: "/registration/renewals",
          badge: "2",
        },
        {
          id: "reg-amendments",
          label: "Amendments",
          href: "/registration/amendments",
        },
        {
          id: "reg-certificates",
          label: "Certificates",
          href: "/registration/certificates",
        },
      ],
    },
    {
      id: "licensing",
      title: "Licensing",
      icon: FileText,
      items: [
        {
          id: "lic-apply",
          label: "Apply for License",
          href: "/licensing/apply",
        },
        {
          id: "lic-manage",
          label: "Manage Licenses",
          href: "/licensing/manage",
        },
        {
          id: "lic-renewals",
          label: "License Renewals",
          href: "/licensing/renewals",
          badge: "1",
        },
      ],
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: Shield,
      items: [
        {
          id: "comp-audits",
          label: "Audit Reports",
          href: "/compliance/audits",
        },
        {
          id: "comp-requirements",
          label: "Requirements",
          href: "/compliance/requirements",
        },
        {
          id: "comp-violations",
          label: "Violations",
          href: "/compliance/violations",
          badge: "!",
        },
      ],
    },
  ],
};

const limitedNavigationConfig: NavigationConfig = {
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
      id: "registration",
      title: "Registration",
      icon: Building2,
      defaultOpen: true,
      items: [
        {
          id: "reg-view",
          label: "View Registration",
          href: "/registration/view",
        },
        {
          id: "reg-renew",
          label: "Renew Registration",
          href: "/registration/renew",
          badge: "Due",
        },
      ],
    },
  ],
};

// Interactive stories
export const Default: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState("/dashboard");

    const { activeItemId, expandedSections, toggleSection, isSectionExpanded } =
      useNavigationState(fullNavigationConfig, currentPath);

    const handleNavigation = (href: string) => {
      setCurrentPath(href);
    };

    return (
      <div className="h-screen flex">
        <SidebarMenu>
          <SidebarProfile
            user={adminUser}
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
              onClick={() => console.log("Sign out")}
            >
              Sign Out
            </SidebarMenuItem>
          </div>
        </SidebarMenu>

        <div className="flex-1 p-8 bg-[var(--color-surface-subtle)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-heading)]">
            Current Page: {currentPath}
          </h1>
          <p className="text-[var(--color-text-body)] mt-2">
            Active Item: {activeItemId || "None"}
          </p>
          <p className="text-[var(--color-text-muted)] mt-1">
            Expanded: {expandedSections.join(", ") || "None"}
          </p>
        </div>
      </div>
    );
  },
};

export const LimitedAccess: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState("/dashboard");

    const { activeItemId, expandedSections, toggleSection, isSectionExpanded } =
      useNavigationState(limitedNavigationConfig, currentPath);

    return (
      <div className="h-screen flex">
        <SidebarMenu>
          <SidebarProfile
            user={regularUser}
            onSwitchEntity={() => console.log("Switch entity")}
          />

          <div className="flex-1 py-4">
            <div className="px-2 mb-4 space-y-1">
              {limitedNavigationConfig.standalone?.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  icon={item.icon}
                  active={activeItemId === item.id}
                  onNavigate={(href: string) => setCurrentPath(href)}
                  href={item.href}
                >
                  {item.label}
                </SidebarMenuItem>
              ))}
            </div>

            <SidebarMenuSectionRoot type="multiple" value={expandedSections}>
              {limitedNavigationConfig.sections.map((section) => (
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
                        onNavigate={(href: string) => setCurrentPath(href)}
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
              icon={Users}
              size="sm"
              active={currentPath === "/profile"}
              onNavigate={(href: string) => setCurrentPath(href)}
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

        <div className="flex-1 p-8 bg-[var(--color-surface-subtle)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-heading)]">
            Limited User Access
          </h1>
          <p className="text-[var(--color-text-body)] mt-2">
            Current Page: {currentPath}
          </p>
          <p className="text-[var(--color-text-muted)] mt-1">
            This user has restricted access to only essential functions.
          </p>
        </div>
      </div>
    );
  },
};

export const WithBadges: Story = {
  render: () => (
    <div className="h-screen flex">
      <SidebarMenu>
        <SidebarProfile
          user={managerUser}
          onSwitchEntity={() => console.log("Switch entity")}
        />

        <div className="flex-1 py-4">
          <div className="px-2 mb-4">
            <SidebarMenuItem icon={BarChart3} active>
              Dashboard
            </SidebarMenuItem>
          </div>

          <SidebarMenuSectionRoot type="multiple" value={["urgent", "pending"]}>
            <SidebarMenuSection
              title="Urgent Actions"
              icon={AlertCircle}
              value="urgent"
              badge="!"
            >
              <div className="space-y-1 px-2">
                <SidebarMenuItem size="sm" badge="Overdue">
                  License Renewal
                </SidebarMenuItem>
                <SidebarMenuItem size="sm" badge="2 Days">
                  Compliance Filing
                </SidebarMenuItem>
              </div>
            </SidebarMenuSection>

            <SidebarMenuSection
              title="Pending Items"
              icon={Clock}
              value="pending"
              badge="12"
            >
              <div className="space-y-1 px-2">
                <SidebarMenuItem size="sm" badge="5">
                  Document Reviews
                </SidebarMenuItem>
                <SidebarMenuItem size="sm" badge="3">
                  Approval Requests
                </SidebarMenuItem>
                <SidebarMenuItem size="sm" badge="4">
                  Status Updates
                </SidebarMenuItem>
              </div>
            </SidebarMenuSection>
          </SidebarMenuSectionRoot>
        </div>

        <div className="border-t border-[var(--color-border)] p-2 space-y-1">
          <SidebarMenuItem icon={Bell} size="sm" badge="23">
            Notifications
          </SidebarMenuItem>
          <SidebarMenuItem icon={Users} size="sm">
            Profile
          </SidebarMenuItem>
          <SidebarMenuItem icon={LogOut} size="sm">
            Sign Out
          </SidebarMenuItem>
        </div>
      </SidebarMenu>

      <div className="flex-1 p-8 bg-[var(--color-surface-subtle)]">
        <h1 className="text-2xl font-bold text-[var(--color-text-heading)]">
          Badge Notifications Demo
        </h1>
        <p className="text-[var(--color-text-body)] mt-2">
          Shows various badge types for urgent items, counts, and status
          indicators.
        </p>
      </div>
    </div>
  ),
};

export const NoEntitySwitch: Story = {
  render: () => (
    <div className="h-screen flex">
      <SidebarMenu>
        <SidebarProfile user={adminUser} />

        <div className="flex-1 py-4">
          <div className="px-2 space-y-1">
            <SidebarMenuItem icon={BarChart3} active>
              Dashboard
            </SidebarMenuItem>
            <SidebarMenuItem icon={DollarSign}>Funding</SidebarMenuItem>
            <SidebarMenuItem icon={Building2}>Registration</SidebarMenuItem>
            <SidebarMenuItem icon={FileText}>Licensing</SidebarMenuItem>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] p-2 space-y-1">
          <SidebarMenuItem icon={Users} size="sm">
            Profile
          </SidebarMenuItem>
          <SidebarMenuItem icon={LogOut} size="sm">
            Sign Out
          </SidebarMenuItem>
        </div>
      </SidebarMenu>

      <div className="flex-1 p-8 bg-[var(--color-surface-subtle)]">
        <h1 className="text-2xl font-bold text-[var(--color-text-heading)]">
          Single Entity User
        </h1>
        <p className="text-[var(--color-text-body)] mt-2">
          No entity switching option when user only has access to one entity.
        </p>
      </div>
    </div>
  ),
};

export const ResponsiveMobile: Story = {
  render: () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("/dashboard");

    const { activeItemId, expandedSections, toggleSection, isSectionExpanded } =
      useNavigationState(fullNavigationConfig, currentPath);

    const handleNavigation = (href: string) => {
      setCurrentPath(href);
      // Auto-close mobile sidebar on navigation
      setMobileOpen(false);
    };

    return (
      <div className="h-screen flex">
        {/* Mobile header with toggle */}
        <div className="sm:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[var(--color-text-heading)]">
            {adminUser.entity.name}
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
              Responsive Sidebar Demo
            </h1>
            <p className="text-[var(--color-text-body)] mt-2">
              Current Page: {currentPath}
            </p>
            <p className="text-[var(--color-text-muted)] mt-1 text-sm">
              Active Item: {activeItemId || "None"}
            </p>

            <div className="mt-6 p-4 bg-[var(--color-surface)] rounded border">
              <h3 className="font-semibold mb-3">Responsive Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  <strong>Mobile:</strong> Overlay sidebar with backdrop and
                  hamburger toggle
                </li>
                <li>
                  <strong>Tablet+:</strong> Fixed sidebar that remains visible
                </li>
                <li>
                  <strong>Touch:</strong> Larger touch targets (44px minimum)
                </li>
                <li>
                  <strong>Keyboard:</strong> Full keyboard navigation with
                  proper focus management
                </li>
                <li>
                  <strong>Screen Readers:</strong> Comprehensive ARIA labels and
                  live regions
                </li>
                <li>
                  <strong>Auto-close:</strong> Mobile sidebar closes on
                  navigation
                </li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-[var(--color-surface)] rounded border">
              <h3 className="font-semibold mb-3">Accessibility Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Proper semantic navigation structure</li>
                <li>Active page announcement for screen readers</li>
                <li>Badge counts announced appropriately</li>
                <li>Focus management with visible focus indicators</li>
                <li>Keyboard shortcuts (Escape to close mobile menu)</li>
                <li>High contrast focus states</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates responsive behavior across screen sizes:
- **Mobile**: Overlay sidebar with backdrop, hamburger menu toggle
- **Desktop**: Fixed sidebar that remains visible
- **Accessibility**: Enhanced keyboard navigation and screen reader support
- **Touch**: Larger touch targets for mobile devices

Try resizing your browser window to see the responsive behavior in action.
        `,
      },
    },
  },
};
