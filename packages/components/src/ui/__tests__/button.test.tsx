import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "../button";

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe("Button Component", () => {
  // Basic rendering tests
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("bg-[var(--button-primary-bg)]");
    });

    it("renders all variants correctly", () => {
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
          <Button variant={variant} data-testid={`button-${variant}`}>
            Test
          </Button>
        );
        const button = screen.getByTestId(`button-${variant}`);
        expect(button).toBeInTheDocument();
      });
    });

    it("renders all sizes correctly", () => {
      const sizes = ["sm", "md", "lg", "xl"] as const;

      sizes.forEach((size) => {
        render(
          <Button size={size} data-testid={`button-${size}`}>
            Test
          </Button>
        );
        const button = screen.getByTestId(`button-${size}`);
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(`h-[var(--button-height-${size})]`);
      });
    });
  });

  // Token validation tests
  describe("Design Token Integration", () => {
    it("uses correct primary variant tokens", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-[var(--button-primary-bg)]");
      expect(button).toHaveClass("text-[var(--button-primary-text)]");
      expect(button).toHaveClass("border-[var(--button-primary-border)]");
    });

    it("uses correct outline variant tokens", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-[var(--button-outline-bg)]");
      expect(button).toHaveClass("text-[var(--button-outline-text)]");
      expect(button).toHaveClass("border-[var(--button-outline-border)]");
    });

    it("applies hover states correctly", () => {
      render(<Button variant="primary">Hover test</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("hover:bg-[var(--button-primary-bg-hover)]");
    });

    it("applies disabled states correctly", () => {
      render(
        <Button variant="primary" disabled>
          Disabled
        </Button>
      );
      const button = screen.getByRole("button");

      expect(button).toHaveClass(
        "disabled:bg-[var(--button-primary-bg-disabled)]"
      );
      expect(button).toHaveClass(
        "disabled:text-[var(--button-primary-text-disabled)]"
      );
      expect(button).toBeDisabled();
    });
  });

  // State management tests
  describe("States", () => {
    it("handles loading state correctly", () => {
      render(<Button loading>Loading button</Button>);
      const button = screen.getByRole("button");

      expect(button).toBeDisabled();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows loading spinner when loading", () => {
      render(<Button loading>Submit</Button>);
      const spinner = screen.getByRole("img", { hidden: true });
      expect(spinner).toBeInTheDocument();
    });

    it("disables interaction when loading", async () => {
      const handleClick = jest.fn();
      render(
        <Button loading onClick={handleClick}>
          Submit
        </Button>
      );

      const button = screen.getByRole("button");
      await userEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Icon integration tests
  describe("Icon Integration", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it("renders left icon correctly", () => {
      render(<Button leftIcon={<TestIcon />}>With Icon</Button>);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("With Icon")).toBeInTheDocument();
    });

    it("renders right icon correctly", () => {
      render(<Button rightIcon={<TestIcon />}>With Icon</Button>);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("With Icon")).toBeInTheDocument();
    });

    it("renders icon-only button correctly", () => {
      render(<Button leftIcon={<TestIcon />} aria-label="Icon only" />);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByLabelText("Icon only")).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Button>Accessible button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("supports keyboard navigation", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard test</Button>);

      const button = screen.getByRole("button");
      button.focus();

      expect(button).toHaveFocus();

      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(button, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it("has proper ARIA attributes when loading", () => {
      render(<Button loading>Loading button</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("maintains focus ring visibility", () => {
      render(<Button variant="primary">Focus test</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass(
        "focus-visible:shadow-[var(--button-focus-ring-primary)]"
      );
    });
  });

  // Event handling tests
  describe("Event Handling", () => {
    it("calls onClick when clicked", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref test</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  // AI tool compatibility tests
  describe("AI Tool Compatibility", () => {
    it("has predictable prop interface", () => {
      // Test that common props work as expected for AI tools
      const { rerender } = render(<Button>Test</Button>);

      // Variant changes
      rerender(<Button variant="outline">Test</Button>);
      rerender(<Button variant="cta">Test</Button>);

      // Size changes
      rerender(<Button size="lg">Test</Button>);
      rerender(<Button size="sm">Test</Button>);

      // State changes
      rerender(<Button disabled>Test</Button>);
      rerender(<Button loading>Test</Button>);

      // No errors should occur
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("accepts standard HTML button props", () => {
      render(
        <Button
          type="submit"
          name="test-button"
          value="test-value"
          form="test-form"
          data-testid="html-props-test"
        >
          HTML Props Test
        </Button>
      );

      const button = screen.getByTestId("html-props-test");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveAttribute("name", "test-button");
      expect(button).toHaveAttribute("value", "test-value");
      expect(button).toHaveAttribute("form", "test-form");
    });
  });

  // Responsive behavior tests
  describe("Responsive Behavior", () => {
    it("maintains proper sizing on different screen sizes", () => {
      render(<Button size="lg">Responsive test</Button>);
      const button = screen.getByRole("button");

      // Should maintain consistent height token usage
      expect(button).toHaveClass("h-[var(--button-height-lg)]");
      expect(button).toHaveClass("px-[var(--button-padding-x-lg)]");
    });

    it("handles text overflow gracefully", () => {
      render(
        <Button size="sm">Very long button text that might overflow</Button>
      );
      const button = screen.getByRole("button");

      // Should maintain structure even with long text
      expect(button).toHaveClass("inline-flex");
      expect(button).toHaveClass("items-center");
      expect(button).toHaveClass("justify-center");
    });
  });
});
