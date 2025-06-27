import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Input } from "../input";

// Mock icon for testing
const TestIcon = () => <span data-testid="test-icon">Icon</span>;

describe("Input", () => {
  describe("Basic Functionality", () => {
    it("renders with label and placeholder", () => {
      render(
        <Input
          label="Test Label"
          placeholder="Test placeholder"
          data-testid="input"
        />
      );

      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Test placeholder")
      ).toBeInTheDocument();
    });

    it("handles controlled input correctly", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <Input
          label="Test Input"
          value=""
          onChange={handleChange}
          data-testid="input"
        />
      );

      const input = screen.getByTestId("input");
      await user.type(input, "test value");

      expect(handleChange).toHaveBeenCalledTimes(10); // "test value" = 10 characters
    });

    it("handles uncontrolled input with defaultValue", () => {
      render(
        <Input
          label="Test Input"
          defaultValue="default text"
          data-testid="input"
        />
      );

      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe("default text");
    });
  });

  describe("Label States", () => {
    it("shows required indicator when labelState is required", () => {
      render(<Input label="Required Field" labelState="required" />);

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("shows optional indicator when labelState is optional", () => {
      render(<Input label="Optional Field" labelState="optional" />);

      expect(screen.getByText("(Optional)")).toBeInTheDocument();
    });

    it("hides label when showLabel is false", () => {
      render(<Input label="Hidden Label" showLabel={false} />);

      expect(screen.queryByText("Hidden Label")).not.toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("displays hint text when provided", () => {
      render(<Input label="Test" hintText="This is a hint" />);

      expect(screen.getByText("This is a hint")).toBeInTheDocument();
    });

    it("hides hint text when showHintText is false", () => {
      render(
        <Input label="Test" hintText="Hidden hint" showHintText={false} />
      );

      expect(screen.queryByText("Hidden hint")).not.toBeInTheDocument();
    });

    it("displays helper text when provided", () => {
      render(<Input label="Test" helperText="Helper message" />);

      expect(screen.getByText("Helper message")).toBeInTheDocument();
    });
  });

  describe("Validation States", () => {
    it("displays error message and applies error styling", () => {
      render(<Input label="Test" error="Error message" data-testid="input" />);

      expect(screen.getByText("Error message")).toBeInTheDocument();

      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("displays success message", () => {
      render(<Input label="Test" success="Success message" />);

      expect(screen.getByText("Success message")).toBeInTheDocument();
    });

    it("displays warning message", () => {
      render(<Input label="Test" warning="Warning message" />);

      expect(screen.getByText("Warning message")).toBeInTheDocument();
    });

    it("prioritizes error over success and warning", () => {
      render(
        <Input
          label="Test"
          error="Error message"
          success="Success message"
          warning="Warning message"
        />
      );

      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Success message")).not.toBeInTheDocument();
      expect(screen.queryByText("Warning message")).not.toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("renders left icon", () => {
      render(<Input label="Test" leftIcon={<TestIcon />} />);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("renders right icon", () => {
      render(<Input label="Test" rightIcon={<TestIcon />} />);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner and disables input", () => {
      render(<Input label="Test" loading data-testid="input" />);

      const input = screen.getByTestId("input");
      expect(input).toBeDisabled();

      // Loading spinner should be present (has animate-spin class)
      const spinner = document.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Clearable Functionality", () => {
    it("shows clear button when clearable and has value", () => {
      render(
        <Input label="Test" value="some text" clearable onChange={() => {}} />
      );

      expect(screen.getByLabelText("Clear input")).toBeInTheDocument();
    });

    it("does not show clear button when no value", () => {
      render(<Input label="Test" value="" clearable onChange={() => {}} />);

      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument();
    });

    it("calls onClear when clear button is clicked", async () => {
      const handleClear = jest.fn();
      const user = userEvent.setup();

      render(
        <Input
          label="Test"
          value="some text"
          clearable
          onClear={handleClear}
          onChange={() => {}}
        />
      );

      const clearButton = screen.getByLabelText("Clear input");
      await user.click(clearButton);

      expect(handleClear).toHaveBeenCalledTimes(1);
    });
  });

  describe("Disabled State", () => {
    it("disables input when disabled prop is true", () => {
      render(<Input label="Test" disabled data-testid="input" />);

      const input = screen.getByTestId("input");
      expect(input).toBeDisabled();
    });

    it("does not show clear button when disabled", () => {
      render(
        <Input
          label="Test"
          value="some text"
          clearable
          disabled
          onChange={() => {}}
        />
      );

      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("associates label with input correctly", () => {
      render(<Input label="Accessible Label" data-testid="input" />);

      const input = screen.getByTestId("input");
      const label = screen.getByText("Accessible Label");

      expect(input).toHaveAttribute("id");
      expect(label).toHaveAttribute("for", input.getAttribute("id"));
    });

    it("associates helper text with input via aria-describedby", () => {
      render(
        <Input label="Test" helperText="Helper text" data-testid="input" />
      );

      const input = screen.getByTestId("input");
      const helperText = screen.getByText("Helper text");

      expect(input).toHaveAttribute("aria-describedby");
      expect(helperText).toHaveAttribute(
        "id",
        input.getAttribute("aria-describedby")
      );
    });

    it("sets aria-invalid when error is present", () => {
      render(<Input label="Test" error="Error message" data-testid="input" />);

      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();

      render(<Input label="Test" data-testid="input" />);

      const input = screen.getByTestId("input");

      // Tab to focus
      await user.tab();
      expect(input).toHaveFocus();

      // Type in input
      await user.type(input, "test");
      expect(input).toHaveValue("test");
    });
  });

  describe("Size Variants", () => {
    it("applies correct size classes", () => {
      const { rerender } = render(
        <Input label="Test" size="sm" data-testid="input" />
      );

      let input = screen.getByTestId("input");
      expect(input).toHaveClass("h-8");

      rerender(<Input label="Test" size="lg" data-testid="input" />);

      input = screen.getByTestId("input");
      expect(input).toHaveClass("h-12");
    });
  });

  describe("Custom Class Names", () => {
    it("applies custom class names correctly", () => {
      render(
        <Input
          label="Test"
          containerClassName="custom-container"
          labelClassName="custom-label"
          inputClassName="custom-input"
          helperClassName="custom-helper"
          helperText="Helper text"
          data-testid="input"
        />
      );

      // Check container
      const container = screen
        .getByTestId("input")
        .closest(".custom-container");
      expect(container).toBeInTheDocument();

      // Check label
      const label = screen.getByText("Test");
      expect(label).toHaveClass("custom-label");

      // Check input
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("custom-input");

      // Check helper
      const helper = screen.getByText("Helper text");
      expect(helper).toHaveClass("custom-helper");
    });
  });

  describe("Input Types", () => {
    it("supports different input types", () => {
      const { rerender } = render(
        <Input label="Email" type="email" data-testid="input" />
      );

      let input = screen.getByTestId("input");
      expect(input).toHaveAttribute("type", "email");

      rerender(<Input label="Password" type="password" data-testid="input" />);

      input = screen.getByTestId("input");
      expect(input).toHaveAttribute("type", "password");
    });
  });
});
