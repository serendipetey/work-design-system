// packages/components/src/ui/select.test.tsx
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

describe("Select Component", () => {
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

    it("shows required indicator when required", () => {
      render(
        <SelectField label="Required Field" required>
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("shows optional indicator when labelState is optional", () => {
      render(
        <SelectField label="Optional Field" labelState="optional">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      expect(screen.getByText("(Optional)")).toBeInTheDocument();
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
      const { container } = render(
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
      const label = screen.getByText("Test Label");

      expect(trigger).toHaveAccessibleName("Test Label");
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

  describe("Token Integration", () => {
    it("uses design tokens via CSS custom properties", () => {
      const { container } = render(
        <SelectField label="Test" variant="error">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      // Should have classes that reference CSS custom properties
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("border-[var(--color-border-error)]");
    });

    it("inherits input variants correctly", () => {
      render(
        <SelectField label="Test" size="sm" variant="success">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      // Should have both size and variant classes from input system
      expect(trigger).toHaveClass("h-9"); // sm size
      expect(trigger).toHaveClass("border-[var(--color-border-success)]"); // success variant
    });
  });

  describe("Error Handling", () => {
    it("handles missing children gracefully", () => {
      expect(() => {
        render(
          <SelectField label="Test">
            {null} {/* ✅ Explicit empty children */}
          </SelectField>
        );
      }).not.toThrow();
    });

    it("handles empty children array gracefully", () => {
      expect(() => {
        render(
          <SelectField label="Test">
            {[]} {/* ✅ Empty array */}
          </SelectField>
        );
      }).not.toThrow();
    });

    it("handles empty value correctly", () => {
      render(
        <SelectField label="Test" value="">
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("data-placeholder");
    });
  });
});
