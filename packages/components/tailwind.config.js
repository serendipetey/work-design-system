/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./packages/components/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],

  // Add safelist patterns for the custom CSS property values to prevent warnings
  safelist: [
    {
      pattern: /bg-\[var\(--color-.+\)\]/,
    },
    {
      pattern: /text-\[var\(--color-.+\)\]/,
    },
    {
      pattern: /border-\[var\(--color-.+\)\]/,
    },
    {
      pattern: /border-b-\[var\(--color-.+\)\]/,
    },
    {
      pattern: /border-b-\[3px\]/,
    },
  ],

  theme: {
    extend: {
      colors: {
        // Your existing color mappings...
        navy: {
          100: "#f0f3f7",
          200: "#e3e9ef",
          300: "#b6c3d2",
          400: "#164b8f",
          500: "#0e3a6c",
          600: "#0a2d54",
          700: "#07203c",
        },

        focus: {
          500: "#ff9900", // Global focus color
        },

        // Add CSS custom property support for focus states
        "focus-bg": "var(--color-focus-500)",
        "focus-text": "var(--color-navy-500)",
        "focus-border": "var(--color-navy-500)",

        // 🎯 Helper text color tokens - centralized for form components
        "input-helper": "var(--color-input-helper, #39444f)",
        "input-text-error": "var(--color-input-text-error, #eb0000)",
        "input-text-success": "var(--color-input-text-success, #007d85)",
        "input-text-warning": "var(--color-input-text-warning, #b75b00)",
        "text-muted": "var(--color-text-muted, #8f949a)",

        // Semantic color mappings for components
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
