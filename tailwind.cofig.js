/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Colors - Mapping your existing design tokens
      colors: {
        // Base colors
        black: "#000000",
        white: "#ffffff",
        transparent: "transparent",
        current: "currentColor",

        // Gray scale
        gray: {
          50: "#f7f8f9",
          100: "#f3f4f5",
          200: "#ebebeb",
          300: "#e4e4e4",
          400: "#b3b9bf",
          500: "#8f949a",
          600: "#6f757d",
          700: "#4c5258",
          800: "#2f2f2f",
        },

        // Navy scale (Primary brand color)
        navy: {
          200: "#e3e9ef",
          300: "#b6c3d2",
          400: "#164b8f",
          500: "#0e3a6c", // Primary brand color
        },

        // Red scale (Brand/CTA color)
        red: {
          500: "#a30134", // Brand red
          600: "#7a0125",
        },

        // Success scale (New teal-based)
        success: {
          200: "#e6f2f3",
          500: "#007d85", // Primary success
          600: "#00646a",
        },

        // Warning scale (New orange-based)
        warning: {
          200: "#f8efe6",
          500: "#b75b00", // Primary warning
          600: "#924900",
        },

        // Error scale
        error: {
          500: "#eb0000", // Distinct error red
        },

        // Destructive scale
        destructive: {
          500: "#d92b2b",
          600: "#b12222",
        },

        // Charcoal
        charcoal: {
          500: "#39444f",
        },

        // Focus
        focus: {
          500: "#ff9900",
        },

        // Pink (for error backgrounds)
        pink: {
          500: "#ffe3ea",
        },

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

      // Typography - Mapping your existing font system
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Consolas",
          "Liberation Mono",
          "Menlo",
          "monospace",
        ],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        // Mapping your exact Figma font sizes
        xs: ["0.625rem", { lineHeight: "1.5" }], // 10px - caption
        sm: ["0.875rem", { lineHeight: "1.14" }], // 14px - subheading
        base: ["1rem", { lineHeight: "1.75" }], // 16px - body
        lg: ["1.125rem", { lineHeight: "1.89" }], // 18px - large body
        xl: ["1.75rem", { lineHeight: "1.29" }], // 28px - H3
        "2xl": ["2.375rem", { lineHeight: "1.21" }], // 38px - H2
        "3xl": ["2.875rem", { lineHeight: "1.13" }], // 46px - H1
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0em",
        wide: "0.0225em", // 0.36px at 16px
        wider: "0.025em", // 0.4px at 16px
        widest: "0.25em", // 3.5px at 14px for subheading
      },

      // Spacing - Your existing spacing scale
      spacing: {
        // Custom spacing values that extend default Tailwind
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        21: "21px",
        22: "22px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        80: "80px",
      },

      // Border radius - Your existing radius scale
      borderRadius: {
        none: "0px",
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "80px",
      },

      // Box shadow - Your existing shadow system
      boxShadow: {
        none: "none",
        xs: "0px 0px 0px 0px rgba(0, 0, 0, 0), 2px 0px 0px 0px rgba(0, 0, 0, 0.16)",
        sm: "0px 4px 8px 0px rgba(0, 0, 0, 0), 4px 0px 0px 0px rgba(0, 0, 0, 0.16)",
        md: "0px 6px 12px 0px rgba(0, 0, 0, 0), 8px 0px 0px 0px rgba(0, 0, 0, 0.16)",
        lg: "0px 8px 16px 0px rgba(0, 0, 0, 0), 16px 0px 0px 0px rgba(0, 0, 0, 0.16)",
        xl: "0px 12px 24px 0px rgba(0, 0, 0, 0), 24px 0px 0px 0px rgba(0, 0, 0, 0.16)",

        // Focus shadows using your new colors
        focus: "0 0 0 3px rgba(183, 91, 0, 0.3)", // Warning orange
        "focus-primary": "0 0 0 3px rgba(14, 58, 108, 0.2)", // Navy
        "focus-success": "0 0 0 3px rgba(0, 125, 133, 0.3)", // Teal
        "focus-warning": "0 0 0 3px rgba(183, 91, 0, 0.3)", // Orange
        "focus-destructive": "0 0 0 3px rgba(217, 43, 43, 0.2)", // Destructive red
        "focus-error": "0 0 0 3px rgba(235, 0, 0, 0.2)", // Error red
      },

      // Animation and transitions
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
