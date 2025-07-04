import React from "react";
import { Button } from "../button-old";

// Icons for examples (in real usage, you'd import from your icon library)
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export function ButtonDemo() {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      {/* Variant Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="cta">CTA Button</Button>
          <Button variant="success">Success Button</Button>
          <Button variant="warning">Warning Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      {/* Size Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm" variant="primary">
            Small
          </Button>
          <Button size="md" variant="primary">
            Medium
          </Button>
          <Button size="lg" variant="primary">
            Large
          </Button>
          <Button size="xl" variant="primary">
            Extra Large
          </Button>
        </div>
      </section>

      {/* State Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button
            variant="primary"
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          >
            {loading ? "Loading..." : "Click to Load"}
          </Button>
        </div>
      </section>

      {/* Icon Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" leftIcon={<PlusIcon />}>
            Add Item
          </Button>
          <Button variant="outline" rightIcon={<ArrowRightIcon />}>
            Continue
          </Button>
          <Button variant="cta" leftIcon={<DownloadIcon />} size="lg">
            Download Now
          </Button>

          {/* Icon-only buttons */}
          <Button variant="outline" size="sm" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button variant="ghost" size="md" aria-label="Download">
            <DownloadIcon />
          </Button>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Real-world Usage</h3>
        <div className="space-y-4">
          {/* Form buttons */}
          <div className="flex gap-3">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </div>

          {/* Call-to-action section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-medium mb-2">Ready to get started?</h4>
            <p className="text-gray-600 mb-4">
              Join thousands of users already using our platform.
            </p>
            <div className="flex gap-3">
              <Button variant="cta" size="lg" rightIcon={<ArrowRightIcon />}>
                Start Free Trial
              </Button>
              <Button variant="ghost" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
            <h4 className="text-red-800 font-medium mb-2">Danger Zone</h4>
            <p className="text-red-700 text-sm mb-3">
              This action cannot be undone.
            </p>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </section>

      {/* Usage for AI Tools */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Copy-Paste Examples for AI Tools
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            {`// Basic usage
<Button variant="primary">Click me</Button>

// With icon and loading state
<Button variant="cta" leftIcon={<Icon />} loading={isLoading}>
  Submit Form
</Button>

// Form buttons
<div className="flex gap-3">
  <Button variant="primary" type="submit">Save</Button>
  <Button variant="outline" type="button">Cancel</Button>
</div>

// All variants available:
// primary | outline | cta | success | warning | destructive | ghost

// All sizes available: 
// sm | md | lg | xl`}
          </pre>
        </div>
      </section>
    </div>
  );
}
