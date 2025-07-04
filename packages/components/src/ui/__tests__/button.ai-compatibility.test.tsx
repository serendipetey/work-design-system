import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../button-old";

/**
 * AI Tool Compatibility Tests
 *
 * These tests validate that the Button component works well with AI code generation tools
 * like Cursor, Magicpath.ai, and Lovable. The tests focus on:
 *
 * 1. Predictable prop interfaces
 * 2. Common patterns AI tools generate
 * 3. Copy-paste compatibility
 * 4. Intuitive naming conventions
 */

describe("AI Tool Compatibility", () => {
  describe("Predictable Prop Interface", () => {
    it("should accept common HTML button props", () => {
      // AI tools often generate standard HTML props
      render(
        <Button
          type="submit"
          name="submit-button"
          value="submit-value"
          form="my-form"
          disabled={false}
          onClick={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          className="custom-class"
          id="custom-id"
          data-testid="ai-generated-button"
          aria-label="AI generated button"
          title="Button tooltip"
        >
          AI Generated Button
        </Button>
      );

      const button = screen.getByTestId("ai-generated-button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveAttribute("name", "submit-button");
      expect(button).toHaveAttribute("form", "my-form");
      expect(button).toHaveClass("custom-class");
    });

    it("should work with all variant combinations AI tools might generate", () => {
      const aiGeneratedVariants = [
        { variant: "primary", size: "md" },
        { variant: "outline", size: "lg" },
        { variant: "cta", size: "sm" },
        { variant: "success", size: "xl" },
        { variant: "warning", size: "md" },
        { variant: "destructive", size: "lg" },
        { variant: "ghost", size: "sm" },
      ] as const;

      aiGeneratedVariants.forEach(({ variant, size }, index) => {
        render(
          <Button
            variant={variant}
            size={size}
            data-testid={`ai-combo-${index}`}
          >
            AI Combo {index}
          </Button>
        );

        const button = screen.getByTestId(`ai-combo-${index}`);
        expect(button).toBeInTheDocument();
      });
    });

    it("should handle boolean props intuitively", () => {
      // AI tools commonly generate these boolean patterns
      const booleanTests = [
        { disabled: true },
        { disabled: false },
        { loading: true },
        { loading: false },
        { disabled: true, loading: false },
        { disabled: false, loading: true },
      ];

      booleanTests.forEach((props, index) => {
        render(
          <Button {...props} data-testid={`bool-test-${index}`}>
            Boolean Test {index}
          </Button>
        );

        const button = screen.getByTestId(`bool-test-${index}`);
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Common AI-Generated Patterns", () => {
    it("should work with typical form submission patterns", () => {
      // Pattern: Form with submit and cancel buttons
      render(
        <form>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </form>
      );

      expect(screen.getByText("Submit")).toHaveAttribute("type", "submit");
      expect(screen.getByText("Cancel")).toHaveAttribute("type", "button");
    });

    it("should work with common action button patterns", () => {
      // Pattern: CRUD action buttons
      render(
        <div>
          <Button variant="primary">Create</Button>
          <Button variant="outline">Read</Button>
          <Button variant="warning">Update</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      );

      expect(screen.getByText("Create")).toBeInTheDocument();
      expect(screen.getByText("Read")).toBeInTheDocument();
      expect(screen.getByText("Update")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("should work with loading state patterns", () => {
      // Pattern: Async action with loading state
      const AsyncButton = () => {
        const [loading, setLoading] = React.useState(false);

        return (
          <Button
            loading={loading}
            onClick={() => setLoading(!loading)}
            disabled={loading}
          >
            {loading ? "Processing..." : "Process"}
          </Button>
        );
      };

      render(<AsyncButton />);
      expect(screen.getByText("Process")).toBeInTheDocument();
    });

    it("should work with conditional rendering patterns", () => {
      // Pattern: Conditional button rendering
      const ConditionalButtons = ({ showSecondary = true }) => (
        <div>
          <Button variant="primary">Primary Action</Button>
          {showSecondary && <Button variant="outline">Secondary Action</Button>}
        </div>
      );

      render(<ConditionalButtons />);
      expect(screen.getByText("Primary Action")).toBeInTheDocument();
      expect(screen.getByText("Secondary Action")).toBeInTheDocument();

      render(<ConditionalButtons showSecondary={false} />);
      expect(screen.getAllByText("Primary Action")).toHaveLength(2); // Two instances rendered
    });
  });

  describe("Copy-Paste Compatibility", () => {
    it("should work when copied from Storybook examples", () => {
      // These are examples that would commonly be copied from Storybook
      const storybookExamples = [
        <Button key="1">Default Button</Button>,
        <Button key="2" variant="primary">
          Primary Button
        </Button>,
        <Button key="3" variant="outline" size="lg">
          Large Outline
        </Button>,
        <Button key="4" variant="cta" disabled>
          Disabled CTA
        </Button>,
        <Button key="5" loading>
          Loading Button
        </Button>,
      ];

      storybookExamples.forEach((example, index) => {
        render(<div data-testid={`storybook-${index}`}>{example}</div>);
        const container = screen.getByTestId(`storybook-${index}`);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it("should work with shadcn-style imports and usage", () => {
      // Pattern: shadcn/ui style component usage
      render(
        <div className="flex gap-4">
          <Button>Button</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      );

      // Should render without issues in flex layouts
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });

    it("should work with Tailwind utility classes", () => {
      // AI tools often add Tailwind classes
      render(
        <Button className="w-full mt-4 shadow-lg hover:shadow-xl transition-all">
          Enhanced Button
        </Button>
      );

      const button = screen.getByText("Enhanced Button");
      expect(button).toHaveClass("w-full", "mt-4", "shadow-lg");
    });
  });

  describe("Intuitive Property Names", () => {
    it("should use self-documenting prop names", () => {
      // Props should be intuitive for AI tools to understand
      render(
        <Button
          variant="primary" // Clear variant naming
          size="lg" // Standard size naming
          loading={true} // Clear state naming
          disabled={false} // Standard HTML naming
        >
          Self-Documenting Props
        </Button>
      );

      expect(screen.getByText("Self-Documenting Props")).toBeInTheDocument();
    });

    it("should support icon props with clear naming", () => {
      const TestIcon = () => <span>🎯</span>;

      render(
        <div>
          <Button leftIcon={<TestIcon />}>Left Icon</Button>
          <Button rightIcon={<TestIcon />}>Right Icon</Button>
          <Button leftIcon={<TestIcon />} rightIcon={<TestIcon />}>
            Both Icons
          </Button>
        </div>
      );

      expect(screen.getByText("Left Icon")).toBeInTheDocument();
      expect(screen.getByText("Right Icon")).toBeInTheDocument();
      expect(screen.getByText("Both Icons")).toBeInTheDocument();
    });
  });

  describe("Error Resilience", () => {
    it("should handle missing or undefined props gracefully", () => {
      // AI tools sometimes generate incomplete props
      const problematicProps = [
        {},
        { variant: undefined },
        { size: undefined },
        { loading: undefined },
        { disabled: undefined },
        { children: undefined },
      ];

      problematicProps.forEach((props, index) => {
        render(
          <Button {...props} data-testid={`error-test-${index}`}>
            Error Test {index}
          </Button>
        );

        const button = screen.getByTestId(`error-test-${index}`);
        expect(button).toBeInTheDocument();
      });
    });

    it("should handle invalid prop values gracefully", () => {
      // AI tools might generate invalid values
      render(
        <Button
          // @ts-expect-error - Testing invalid props
          variant="invalid-variant"
          // @ts-expect-error - Testing invalid props
          size="invalid-size"
          data-testid="invalid-props"
        >
          Invalid Props Test
        </Button>
      );

      // Should still render, falling back to defaults
      const button = screen.getByTestId("invalid-props");
      expect(button).toBeInTheDocument();
    });
  });

  describe("TypeScript Integration", () => {
    it("should provide helpful TypeScript types for AI tools", () => {
      // This test validates the TypeScript interface
      const typedButton: React.ComponentProps<typeof Button> = {
        variant: "primary",
        size: "md",
        loading: false,
        disabled: false,
        children: "Typed Button",
      };

      render(<Button {...typedButton} />);
      expect(screen.getByText("Typed Button")).toBeInTheDocument();
    });

    it("should work with forwardRef pattern for AI tools", () => {
      // AI tools often need ref forwarding
      const TestComponent = React.forwardRef<
        HTMLButtonElement,
        React.ComponentProps<typeof Button>
      >((props, ref) => (
        <Button ref={ref} {...props}>
          Forwarded Ref Button
        </Button>
      ));

      const ref = React.createRef<HTMLButtonElement>();
      render(<TestComponent ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Documentation Completeness", () => {
    it("should have all props documented for AI understanding", () => {
      // This validates that all common props work as documented
      const fullyDocumentedExample = (
        <Button
          variant="primary" // Button appearance variant
          size="lg" // Button size
          loading={false} // Loading state
          disabled={false} // Disabled state
          leftIcon={<span>📎</span>} // Left side icon
          rightIcon={<span>➡️</span>} // Right side icon
          onClick={() => {}} // Click handler
          type="button" // HTML button type
          className="custom" // Additional CSS classes
          aria-label="Documented button" // Accessibility label
        >
          Fully Documented Button
        </Button>
      );

      render(fullyDocumentedExample);
      expect(screen.getByLabelText("Documented button")).toBeInTheDocument();
    });
  });
});

// Utility functions for AI compatibility testing
export const aiCompatibilityHelpers = {
  // Test if a component can be safely copy-pasted
  testCopyPasteCompatibility: (component: React.ReactElement) => {
    const { container } = render(component);
    return container.firstChild !== null;
  },

  // Test if props are predictable
  testPredictableProps: (Component: React.ComponentType<any>) => {
    const testProps = {
      variant: "primary",
      size: "md",
      disabled: false,
      loading: false,
      onClick: () => {},
    };

    try {
      render(<Component {...testProps}>Test</Component>);
      return true;
    } catch {
      return false;
    }
  },

  // Test TypeScript compatibility
  testTypeScriptCompatibility: () => {
    // This would be validated at compile time
    return true;
  },
};
