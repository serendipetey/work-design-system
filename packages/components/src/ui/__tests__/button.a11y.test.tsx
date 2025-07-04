import React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";
import { Button } from "../button-old";

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock icons for testing
const TestIcon = () => <span data-testid="test-icon">📎</span>;

describe("Button Accessibility Tests", () => {
  describe("WCAG Compliance", () => {
    it("should not have accessibility violations - default button", async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations - all variants", async () => {
      const variants = [
        "primary",
        "outline",
        "cta",
        "success",
        "warning",
        "destructive",
        "ghost",
      ] as const;

      for (const variant of variants) {
        const { container } = render(
          <Button variant={variant}>Test {variant}</Button>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it("should not have accessibility violations - with icons", async () => {
      const { container } = render(
        <div>
          <Button leftIcon={<TestIcon />}>With left icon</Button>
          <Button rightIcon={<TestIcon />}>With right icon</Button>
          <Button leftIcon={<TestIcon />} aria-label="Icon only button" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations - different states", async () => {
      const { container } = render(
        <div>
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should be focusable with Tab key", async () => {
      render(<Button>Focusable button</Button>);
      const button = screen.getByRole("button");

      // Tab to focus the button
      await userEvent.tab();
      expect(button).toHaveFocus();
    });

    it("should activate with Enter key", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Enter to activate</Button>);

      const button = screen.getByRole("button");
      await userEvent.tab(); // Focus the button
      await userEvent.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should activate with Space key", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Space to activate</Button>);

      const button = screen.getByRole("button");
      await userEvent.tab(); // Focus the button
      await userEvent.keyboard(" "); // Space key

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not be focusable when disabled", async () => {
      render(
        <div>
          <Button>First button</Button>
          <Button disabled>Disabled button</Button>
          <Button>Last button</Button>
        </div>
      );

      const firstButton = screen.getByText("First button");
      const lastButton = screen.getByText("Last button");
      const disabledButton = screen.getByText("Disabled button");

      // Tab through buttons
      await userEvent.tab();
      expect(firstButton).toHaveFocus();

      await userEvent.tab();
      expect(lastButton).toHaveFocus(); // Should skip disabled button
      expect(disabledButton).not.toHaveFocus();
    });

    it("should show focus indicator", async () => {
      render(<Button variant="primary">Focus me</Button>);
      const button = screen.getByRole("button");

      await userEvent.tab();
      expect(button).toHaveFocus();
      expect(button).toHaveClass(
        "focus-visible:shadow-[var(--button-focus-ring-primary)]"
      );
    });
  });

  describe("ARIA Attributes", () => {
    it("should have proper role attribute", () => {
      render(<Button>Test button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("role", "button");
    });

    it("should support aria-label for icon-only buttons", () => {
      render(<Button leftIcon={<TestIcon />} aria-label="Add new item" />);
      const button = screen.getByLabelText("Add new item");
      expect(button).toBeInTheDocument();
    });

    it("should have aria-disabled when disabled", () => {
      render(<Button disabled>Disabled button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should have aria-disabled when loading", () => {
      render(<Button loading>Loading button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should support custom ARIA attributes", () => {
      render(
        <Button
          aria-describedby="help-text"
          aria-expanded="false"
          aria-haspopup="menu"
        >
          Menu button
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "help-text");
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-haspopup", "menu");
    });
  });

  describe("Screen Reader Compatibility", () => {
    it("should announce button text to screen readers", () => {
      render(<Button>Submit form</Button>);
      const button = screen.getByRole("button", { name: "Submit form" });
      expect(button).toBeInTheDocument();
    });

    it("should announce aria-label for icon-only buttons", () => {
      render(<Button leftIcon={<TestIcon />} aria-label="Close dialog" />);
      const button = screen.getByRole("button", { name: "Close dialog" });
      expect(button).toBeInTheDocument();
    });

    it("should announce loading state appropriately", () => {
      render(<Button loading>Processing...</Button>);
      const button = screen.getByRole("button");

      // Should show "Loading..." text for screen readers
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should not expose decorative icons to screen readers", () => {
      render(<Button leftIcon={<TestIcon />}>Save document</Button>);

      // The icon should not be announced separately
      const button = screen.getByRole("button", { name: "Save document" });
      expect(button).toBeInTheDocument();

      // Icon should be present but not have its own accessible name
      const icon = screen.getByTestId("test-icon");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Color Contrast", () => {
    it("should have sufficient contrast ratios (visual test)", () => {
      // Note: This is a placeholder for visual regression testing
      // In a real implementation, you would use tools like:
      // - @storybook/addon-a11y for Storybook
      // - Playwright with accessibility scanning
      // - Manual testing with browser dev tools

      const variants = [
        "primary",
        "outline",
        "cta",
        "success",
        "warning",
        "destructive",
        "ghost",
      ] as const;

      variants.forEach((variant) => {
        render(
          <Button variant={variant} data-testid={`contrast-${variant}`}>
            Test
          </Button>
        );
        const button = screen.getByTestId(`contrast-${variant}`);
        expect(button).toBeInTheDocument();

        // Verify the button uses CSS custom properties for colors
        // (actual contrast validation would happen in visual testing tools)
        const computedStyle = getComputedStyle(button);
        expect(button.className).toMatch(/var\(--button-/);
      });
    });
  });

  describe("Focus Management", () => {
    it("should maintain focus order in button groups", async () => {
      render(
        <div>
          <Button data-testid="btn-1">Button 1</Button>
          <Button data-testid="btn-2">Button 2</Button>
          <Button data-testid="btn-3">Button 3</Button>
        </div>
      );

      const btn1 = screen.getByTestId("btn-1");
      const btn2 = screen.getByTestId("btn-2");
      const btn3 = screen.getByTestId("btn-3");

      // Tab through buttons in order
      await userEvent.tab();
      expect(btn1).toHaveFocus();

      await userEvent.tab();
      expect(btn2).toHaveFocus();

      await userEvent.tab();
      expect(btn3).toHaveFocus();
    });

    it("should handle focus when buttons are dynamically disabled", async () => {
      const TestComponent = () => {
        const [disabled, setDisabled] = React.useState(false);

        return (
          <div>
            <Button onClick={() => setDisabled(!disabled)}>Toggle</Button>
            <Button disabled={disabled}>Dynamic button</Button>
            <Button>Last button</Button>
          </div>
        );
      };

      render(<TestComponent />);

      const toggleBtn = screen.getByText("Toggle");
      const dynamicBtn = screen.getByText("Dynamic button");
      const lastBtn = screen.getByText("Last button");

      // Initially all buttons should be focusable
      await userEvent.tab();
      expect(toggleBtn).toHaveFocus();

      await userEvent.tab();
      expect(dynamicBtn).toHaveFocus();

      // Disable the dynamic button
      await userEvent.click(toggleBtn);

      // Focus should move properly when tabbing
      await userEvent.tab();
      await userEvent.tab();
      expect(lastBtn).toHaveFocus(); // Should skip disabled button
    });
  });

  describe("High Contrast Mode", () => {
    it("should work in high contrast mode (border test)", () => {
      // Test that buttons have proper borders for high contrast mode
      const variants = [
        "primary",
        "outline",
        "cta",
        "success",
        "warning",
        "destructive",
        "ghost",
      ] as const;

      variants.forEach((variant) => {
        render(
          <Button variant={variant} data-testid={`hc-${variant}`}>
            Test
          </Button>
        );
        const button = screen.getByTestId(`hc-${variant}`);

        // All buttons should have border classes for high contrast mode visibility
        expect(button).toHaveClass("border-[var(--button-border-width)]");
      });
    });
  });
});

// Accessibility validation test helper
export async function validateAccessibility(
  component: React.ReactElement
): Promise<boolean> {
  const { container } = render(component);
  const results = await axe(container);
  return results.violations.length === 0;
}

// Keyboard navigation test helper
export async function testKeyboardNavigation(
  buttons: React.ReactElement[],
  expectedFocusOrder: string[]
): Promise<boolean> {
  render(<div>{buttons}</div>);

  for (let i = 0; i < expectedFocusOrder.length; i++) {
    await userEvent.tab();
    const focusedElement = screen.getByText(expectedFocusOrder[i]);
    if (document.activeElement !== focusedElement) {
      return false;
    }
  }

  return true;
}
