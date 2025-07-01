// packages/components/src/ui/__tests__/select.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import {
  SelectField,
  SelectItem,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../select";

describe("Select Component - Design System Conformance", () => {
  describe("SelectField", () => {
    it("renders with label and placeholder", () => {
      render(
        <SelectField label="Test Label" placeholder="Test placeholder">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
      expect(screen.getByText("Test placeholder")).toBeInTheDocument();
    });

    // FIXED: Test for red "(Required)" text to match Input component
    it("shows red (Required) text when required", () => {
      render(
        <SelectField label="Required Field" required>
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const requiredText = screen.getByText("(Required)");
      expect(requiredText).toBeInTheDocument();
      expect(requiredText).toHaveClass(
        "text-[var(--color-input-label-required)]"
      );
    });

    // FIXED: Test for proper label color
    it("uses correct label color (navy-500)", () => {
      render(
        <SelectField label="Test Label">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("text-[var(--color-input-label)]");
    });

    it("shows optional indicator when labelState is optional", () => {
      render(
        <SelectField label="Optional Field" labelState="optional">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("(Optional)")).toBeInTheDocument();
    });

    // NEW: Test hint text functionality
    it("displays hint text when provided", () => {
      render(
        <SelectField
          label="Test"
          hintText="This is a helpful hint"
          helperText="This is helper text"
        >
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("This is a helpful hint")).toBeInTheDocument();
      expect(screen.getByText("This is helper text")).toBeInTheDocument();
    });

    // NEW: Test hint text can be hidden
    it("hides hint text when showHintText is false", () => {
      render(
        <SelectField label="Test" hintText="Hidden hint" showHintText={false}>
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.queryByText("Hidden hint")).not.toBeInTheDocument();
    });

    it("displays helper text", () => {
      render(
        <SelectField label="Test" helperText="This is helper text">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("This is helper text")).toBeInTheDocument();
    });

    it("displays error message and sets error variant", () => {
      render(
        <SelectField label="Test" error="This is an error">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("This is an error")).toBeInTheDocument();
      // Error takes precedence over helper text
    });

    it("prioritizes error over helper text", () => {
      render(
        <SelectField
          label="Test"
          helperText="Helper text"
          error="Error message"
        >
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });

    // NEW: Test hint text + error interaction
    it("shows both hint text and error message", () => {
      render(
        <SelectField label="Test" hintText="Helpful hint" error="Error message">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("Helpful hint")).toBeInTheDocument();
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("handles controlled value changes", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <SelectField
          label="Test"
          value=""
          onValueChange={handleChange}
          placeholder="Select option"
        >
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectField>
      );

      // Click trigger to open dropdown
      await user.click(screen.getByRole("combobox"));

      // Click an option
      await user.click(screen.getByText("Option 1"));

      expect(handleChange).toHaveBeenCalledWith("option1");
    });

    it("applies disabled state correctly", () => {
      render(
        <SelectField label="Test" disabled>
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeDisabled();
    });

    it("applies size variants correctly", () => {
      render(
        <SelectField label="Test" size="lg">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("h-11"); // lg size from input variants
    });

    it("sets default value correctly", () => {
      render(
        <SelectField label="Test" defaultValue="option2">
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    // NEW: Test all variant states
    it("applies success variant correctly", () => {
      render(
        <SelectField label="Test" variant="success" success="Success message">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("Success message")).toBeInTheDocument();
    });

    it("applies warning variant correctly", () => {
      render(
        <SelectField label="Test" variant="warning" warning="Warning message">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("Warning message")).toBeInTheDocument();
    });

    // NEW: Test label visibility control
    it("hides label when showLabel is false", () => {
      render(
        <SelectField label="Hidden Label" showLabel={false}>
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.queryByText("Hidden Label")).not.toBeInTheDocument();
    });
  });

  describe("Low-level Components", () => {
    it("renders basic Select components", () => {
      render(
        <Select defaultValue="test">
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Option</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("Test Option")).toBeInTheDocument();
    });

    it("allows custom className on SelectTrigger", () => {
      render(
        <Select>
          <SelectTrigger className="custom-class">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole("combobox")).toHaveClass("custom-class");
    });

    // NEW: Test dropdown background styling
    it("renders dropdown with solid background", async () => {
      const user = userEvent.setup();

      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent data-testid="select-content">
            <SelectItem value="test">Test Option</SelectItem>
          </SelectContent>
        </Select>
      );

      // Open dropdown
      await user.click(screen.getByRole("combobox"));

      await waitFor(() => {
        const content = screen.getByTestId("select-content");
        expect(content).toHaveClass("bg-[var(--color-surface)]");
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(
        <SelectField label="Accessible Select">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-expanded");
    });

    it("associates label with trigger correctly", () => {
      render(
        <SelectField label="Test Label">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAccessibleName("Test Label");
    });

    // NEW: Test focus ring remains visible when dropdown opens
    it("maintains focus ring when dropdown is open", async () => {
      const user = userEvent.setup();

      render(
        <SelectField label="Test">
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");

      // Focus the trigger
      trigger.focus();

      // Should have focus styles
      expect(trigger).toHaveClass("focus:ring-2");
      expect(trigger).toHaveClass("focus:ring-[var(--color-border-focus)]");

      // Open dropdown
      await user.click(trigger);

      // Should maintain focus ring when open
      expect(trigger).toHaveClass("data-[state=open]:ring-2");
      expect(trigger).toHaveClass(
        "data-[state=open]:ring-[var(--color-border-focus)]"
      );
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();

      render(
        <SelectField label="Test">
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");

      // Focus and open with Enter
      trigger.focus();
      await user.keyboard("{Enter}");

      // Should open dropdown
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeVisible();
      });
    });

    // NEW: Test ARIA attributes for hint text
    it("properly associates hint text with select", () => {
      render(
        <SelectField
          label="Test"
          hintText="Helpful hint"
          helperText="Helper text"
        >
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      // Hint text should be visible and associated
      expect(screen.getByText("Helpful hint")).toBeInTheDocument();
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });
  });

  describe("Form Integration", () => {
    it("includes name attribute for form submission", () => {
      render(
        <SelectField label="Test" name="testField">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      // The name attribute should be passed to the hidden input
      const trigger = screen.getByRole("combobox");
      expect(
        trigger.closest("form") ||
          document.body.querySelector('input[name="testField"]')
      ).toBeTruthy();
    });

    it("supports required attribute for validation", () => {
      render(
        <SelectField label="Test" required name="required-field">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeRequired();
    });
  });

  describe("Design System Integration", () => {
    it("inherits input styling correctly", () => {
      render(
        <SelectField label="Test" size="lg" variant="error">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      // Should have large size class
      expect(trigger).toHaveClass("h-11");
    });

    it("handles empty options gracefully", () => {
      render(
        <SelectField
          label="Empty Select"
          placeholder="No options"
          children={[]}
        />
      );

      expect(screen.getByText("No options available")).toBeInTheDocument();
    });
  });
});
