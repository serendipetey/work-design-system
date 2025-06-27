// Input Component Validation Script
// File: packages/components/scripts/validate-input-tokens.ts

import { promises as fs } from "fs";
import { join } from "path";

interface TokenValidationResult {
  component: string;
  missingTokens: string[];
  hardcodedValues: string[];
  passed: boolean;
  details: string[];
}

async function validateInputTokens(): Promise<TokenValidationResult> {
  try {
    console.log("🔍 Starting Input component validation...");

    // Expected design tokens for input component
    const expectedTokens = [
      // Color tokens for input states
      "color-input-text",
      "color-input-placeholder",
      "color-input-label",
      "color-input-helper",
      "color-input-label-required",
      "color-input-label-optional",
      "color-input-text-error",
      "color-input-text-success",
      "color-input-text-warning",
      "color-input-text-disabled",
      "color-text-muted",
      "color-text-body",

      // Border color tokens
      "color-border-error",
      "color-border-success",
      "color-border-warning",
      "color-border-focus",

      // Typography tokens
      "typography-label",
      "typography-helper",
    ];

    // Common hardcoded values to detect
    const hardcodedPatterns = [
      /#[0-9a-fA-F]{3,6}/, // Hex colors
      /rgb\(/, // RGB colors
      /rgba\(/, // RGBA colors
      /hsl\(/, // HSL colors
      /(?<!\d)\d+px(?!\s*\/\*)/, // Pixel values (not in comments, not part of other numbers)
      /(?<!\d)\d+rem(?!\s*\/\*)/, // Rem values (not in comments, not part of other numbers)
    ];

    // Read input component file
    const inputPath = join(process.cwd(), "src/ui/input.tsx");

    let inputContent: string;
    try {
      inputContent = await fs.readFile(inputPath, "utf-8");
      console.log(`📁 Found input component at: ${inputPath}`);
    } catch (error) {
      console.log(`❌ Input component file not found at: ${inputPath}`);
      return {
        component: "Input",
        missingTokens: [],
        hardcodedValues: [],
        passed: false,
        details: [`Input component file not found at: ${inputPath}`],
      };
    }

    // Check for missing expected tokens
    const missingTokens = expectedTokens.filter((token) => {
      // Check if token is used in the component
      const isUsed = inputContent.includes(token);
      if (!isUsed) {
        console.log(`⚠️  Missing token: ${token}`);
      }
      return !isUsed;
    });

    // Find hardcoded values
    const hardcodedValues: string[] = [];
    for (const pattern of hardcodedPatterns) {
      const matches = inputContent.match(new RegExp(pattern, "g"));
      if (matches) {
        hardcodedValues.push(...matches);
      }
    }

    // Filter out commented hardcoded values and acceptable values
    const filteredHardcoded = hardcodedValues.filter((value) => {
      const lines = inputContent.split("\n");
      const isInComment = lines.some(
        (line) =>
          line.includes(value) &&
          (line.trim().startsWith("//") ||
            line.trim().startsWith("*") ||
            line.includes("viewBox") || // SVG viewBox is acceptable
            line.includes("strokeWidth") || // SVG strokeWidth is acceptable
            line.includes("width=") || // SVG width is acceptable
            line.includes("height=")) // SVG height is acceptable
      );

      if (!isInComment) {
        console.log(`⚠️  Found hardcoded value: ${value}`);
      }

      return !isInComment;
    });

    // Specific design token checks
    const details: string[] = [];

    // Check for proper CSS custom property usage
    const cssVarPattern = /var\(--[a-zA-Z0-9-]+\)/g;
    const cssVars = inputContent.match(cssVarPattern) || [];
    details.push(`Found ${cssVars.length} CSS custom property references`);
    console.log(`📊 Found ${cssVars.length} CSS custom properties`);

    // Check for proper state management
    if (inputContent.includes("color-input-text-error")) {
      details.push("✅ Error state tokens properly used");
      console.log("✅ Error state tokens found");
    }

    if (inputContent.includes("color-input-text-success")) {
      details.push("✅ Success state tokens properly used");
      console.log("✅ Success state tokens found");
    }

    if (inputContent.includes("typography-label")) {
      details.push("✅ Typography tokens properly used");
      console.log("✅ Typography tokens found");
    }

    // Check for accessibility
    if (
      inputContent.includes("aria-invalid") &&
      inputContent.includes("aria-describedby")
    ) {
      details.push("✅ Proper ARIA attributes implemented");
      console.log("✅ ARIA attributes found");
    }

    // Check for icon support
    if (
      inputContent.includes("leftIcon") &&
      inputContent.includes("rightIcon")
    ) {
      details.push("✅ Icon support implemented");
      console.log("✅ Icon support found");
    }

    // Check for size variants
    if (inputContent.includes('"sm"') && inputContent.includes('"lg"')) {
      details.push("✅ Size variants implemented");
      console.log("✅ Size variants found");
    }

    // Check for proper variant system
    if (inputContent.includes("cva") && inputContent.includes("variants")) {
      details.push("✅ CVA variant system implemented");
      console.log("✅ CVA variant system found");
    }

    const passed = missingTokens.length === 0 && filteredHardcoded.length === 0;

    console.log(`📋 Validation summary: ${passed ? "PASSED" : "FAILED"}`);

    return {
      component: "Input",
      missingTokens,
      hardcodedValues: filteredHardcoded,
      passed,
      details,
    };
  } catch (error) {
    console.error("❌ Validation error:", error);
    return {
      component: "Input",
      missingTokens: [],
      hardcodedValues: [],
      passed: false,
      details: [
        `Validation error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      ],
    };
  }
}

// Run validation when script is executed directly
async function runValidation() {
  console.log("🔍 Validating Input component token usage...");
  console.log("=".repeat(50));

  const result = await validateInputTokens();

  console.log(`\n📋 Component: ${result.component}`);
  console.log(`✅ Status: ${result.passed ? "PASSED" : "FAILED"}\n`);

  if (result.details.length > 0) {
    console.log("📊 Details:");
    result.details.forEach((detail) => console.log(`   ${detail}`));
    console.log();
  }

  if (result.missingTokens.length > 0) {
    console.log("❌ Missing Expected Tokens:");
    result.missingTokens.forEach((token) => console.log(`   - ${token}`));
    console.log();
  }

  if (result.hardcodedValues.length > 0) {
    console.log("⚠️  Hardcoded Values Found:");
    result.hardcodedValues.forEach((value) => console.log(`   - ${value}`));
    console.log();
  }

  if (result.passed) {
    console.log("🎉 Input component validation PASSED!");
    console.log("✨ Component properly uses design tokens");
    console.log("📋 Ready for Phase 3.1b: State Management implementation");
  } else {
    console.log("❌ Input component validation FAILED");
    console.log("🔧 Please address the issues above before proceeding");
  }

  console.log("=".repeat(50));

  return result;
}

// Export for use in other validation scripts
export { validateInputTokens, runValidation };

// Run if executed directly
if (require.main === module) {
  runValidation().catch(console.error);
}
