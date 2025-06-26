// scripts/sync-tokens.js
/**
 * Token Synchronization Script
 *
 * This script ensures your sophisticated design token system stays in sync
 * with the Tailwind configuration, maintaining your tokens as the source of truth.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const TOKENS_DIR = path.join(__dirname, "../packages/tokens/src");
const TAILWIND_CONFIG = path.join(__dirname, "../tailwind.config.js");

/**
 * Parse CSS custom properties from token files
 */
function parseTokensFromCSS(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const tokens = {};

    // Match CSS custom properties
    const matches = content.matchAll(/--([^:]+):\s*([^;]+);/g);

    for (const [, property, value] of matches) {
      tokens[property] = value.trim();
    }

    return tokens;
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
    return {};
  }
}

/**
 * Convert CSS custom property values to Tailwind theme format
 */
function convertToTailwindTheme(tokens) {
  const theme = {
    colors: {},
    spacing: {},
    fontSize: {},
    fontWeight: {},
    borderRadius: {},
    boxShadow: {},
  };

  Object.entries(tokens).forEach(([key, value]) => {
    // Color tokens
    if (key.startsWith("color-") && value.startsWith("#")) {
      const colorPath = key.replace("color-", "").split("-");
      setNestedProperty(theme.colors, colorPath, value);
    }

    // Spacing tokens
    if (key.startsWith("space-") && value.endsWith("px")) {
      const spacingKey = key.replace("space-", "");
      theme.spacing[spacingKey] = value;
    }

    // Font size tokens
    if (key.startsWith("font-size-") && value.endsWith("rem")) {
      const sizeKey = key.replace("font-size-", "");
      theme.fontSize[sizeKey] = value;
    }

    // Font weight tokens
    if (key.startsWith("font-weight-")) {
      const weightKey = key.replace("font-weight-", "");
      theme.fontWeight[weightKey] = value;
    }

    // Border radius tokens
    if (key.startsWith("radius-") && value.endsWith("px")) {
      const radiusKey = key.replace("radius-", "");
      theme.borderRadius[radiusKey] = value;
    }

    // Shadow tokens
    if (key.startsWith("shadow-") && !key.includes("focus")) {
      const shadowKey = key.replace("shadow-", "");
      theme.boxShadow[shadowKey] = value;
    }

    // Focus shadow tokens
    if (key.startsWith("shadow-focus")) {
      const shadowKey = key.replace("shadow-", "");
      theme.boxShadow[shadowKey] = value;
    }
  });

  return theme;
}

/**
 * Set nested property in object using array path
 */
function setNestedProperty(obj, path, value) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in current)) {
      current[path[i]] = {};
    }
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
}

/**
 * Generate updated Tailwind config content
 */
function generateTailwindConfig(extractedTheme) {
  return `// tailwind.config.js
// This file is auto-generated from your design tokens
// To update, modify the tokens in packages/tokens/src/ and run: pnpm run sync-tokens

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: ${JSON.stringify(extractedTheme, null, 6).replace(/"/g, "'")},
  },
  plugins: [require('tailwindcss-animate')],
}
`;
}

/**
 * Validate that all expected tokens are present
 */
function validateTokens(tokens) {
  const requiredTokens = [
    "color-navy-500",
    "color-red-500",
    "color-success-500",
    "color-warning-500",
    "space-8",
    "space-16",
    "font-size-base",
    "radius-md",
  ];

  const missing = requiredTokens.filter((token) => !(token in tokens));

  if (missing.length > 0) {
    console.warn("⚠️  Missing expected tokens:", missing);
  }

  return missing.length === 0;
}

/**
 * Main sync function
 */
async function syncTokens() {
  console.log("🔄 Syncing design tokens with Tailwind configuration...");

  try {
    // Check if token directory exists
    if (!fs.existsSync(TOKENS_DIR)) {
      console.error(`❌ Token directory not found: ${TOKENS_DIR}`);
      console.log(
        "💡 Make sure your packages/tokens/src directory exists with your token files"
      );
      process.exit(1);
    }

    // Read all token files
    const primitiveColors = parseTokensFromCSS(
      path.join(TOKENS_DIR, "primitives/colors.css")
    );
    const primitiveSpacing = parseTokensFromCSS(
      path.join(TOKENS_DIR, "primitives/spacing.css")
    );
    const primitiveTypography = parseTokensFromCSS(
      path.join(TOKENS_DIR, "primitives/typography.css")
    );
    const primitiveShadows = parseTokensFromCSS(
      path.join(TOKENS_DIR, "primitives/shadows.css")
    );

    // Combine all tokens
    const allTokens = {
      ...primitiveColors,
      ...primitiveSpacing,
      ...primitiveTypography,
      ...primitiveShadows,
    };

    console.log(`📊 Found ${Object.keys(allTokens).length} design tokens`);

    // Validate tokens
    const isValid = validateTokens(allTokens);
    if (!isValid) {
      console.warn("⚠️  Some expected tokens are missing, but continuing...");
    }

    // Convert to Tailwind theme format
    const tailwindTheme = convertToTailwindTheme(allTokens);

    // Generate new config
    const newConfigContent = generateTailwindConfig(tailwindTheme);

    // Write updated config
    fs.writeFileSync(TAILWIND_CONFIG, newConfigContent);

    console.log("✅ Successfully updated tailwind.config.js");
    console.log("🎨 Token synchronization complete!");
  } catch (error) {
    console.error("❌ Error syncing tokens:", error.message);
    process.exit(1);
  }
}

/**
 * Watch mode for development
 */
async function watchTokens() {
  console.log("👀 Watching for token changes...");

  try {
    const { default: chokidar } = await import("chokidar");

    chokidar.watch(path.join(TOKENS_DIR, "**/*.css")).on("change", () => {
      console.log("📝 Token files changed, re-syncing...");
      syncTokens();
    });
  } catch (error) {
    console.error(
      "❌ chokidar not installed. Install it with: pnpm add -D chokidar"
    );
    console.log("💡 Running one-time sync instead...");
    syncTokens();
  }
}

// CLI handling
const args = process.argv.slice(2);

if (args.includes("--watch")) {
  watchTokens();
} else {
  syncTokens();
}

export { syncTokens, convertToTailwindTheme, parseTokensFromCSS };
