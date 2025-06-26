import { promises as fs } from "fs";
import { join } from "path";

interface TokenValidationResult {
  component: string;
  missingTokens: string[];
  unusedTokens: string[];
  hardcodedValues: string[];
  passed: boolean;
}

// Expected button tokens based on your design system
const EXPECTED_BUTTON_TOKENS = [
  // Primary variant
  "--button-primary-bg",
  "--button-primary-text",
  "--button-primary-border",
  "--button-primary-bg-hover",
  "--button-primary-bg-focus",
  "--button-primary-bg-disabled",
  "--button-primary-text-disabled",

  // Outline variant
  "--button-outline-bg",
  "--button-outline-text",
  "--button-outline-border",
  "--button-outline-bg-hover",
  "--button-outline-text-hover",
  "--button-outline-border-hover",
  "--button-outline-bg-focus",
  "--button-outline-bg-disabled",
  "--button-outline-text-disabled",
  "--button-outline-border-disabled",

  // CTA variant
  "--button-cta-bg",
  "--button-cta-text",
  "--button-cta-border",
  "--button-cta-bg-hover",
  "--button-cta-bg-focus",
  "--button-cta-bg-disabled",
  "--button-cta-text-disabled",

  // Success variant
  "--button-success-bg",
  "--button-success-text",
  "--button-success-border",
  "--button-success-bg-hover",
  "--button-success-bg-focus",
  "--button-success-bg-disabled",
  "--button-success-text-disabled",

  // Warning variant
  "--button-warning-bg",
  "--button-warning-text",
  "--button-warning-border",
  "--button-warning-bg-hover",
  "--button-warning-bg-focus",
  "--button-warning-bg-disabled",
  "--button-warning-text-disabled",

  // Destructive variant
  "--button-destructive-bg",
  "--button-destructive-text",
  "--button-destructive-border",
  "--button-destructive-bg-hover",
  "--button-destructive-bg-focus",
  "--button-destructive-bg-disabled",
  "--button-destructive-text-disabled",

  // Sizing tokens
  "--button-height-sm",
  "--button-height-md",
  "--button-height-lg",
  "--button-height-xl",
  "--button-padding-x-sm",
  "--button-padding-x-md",
  "--button-padding-x-lg",
  "--button-padding-x-xl",

  // General tokens
  "--button-border-width",
  "--button-border-radius",
  "--button-focus-ring-primary",
  "--button-focus-ring-success",
  "--button-focus-ring-warning",
  "--button-focus-ring-destructive",
];

// Patterns that indicate hardcoded values (should be avoided)
const HARDCODED_PATTERNS = [
  /#[0-9a-fA-F]{3,8}/g, // Hex colors
  /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g, // RGB colors
  /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g, // RGBA colors
  /hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/g, // HSL colors
  /\d+px(?!\])/g, // Pixel values not in CSS custom properties
];

async function validateButtonTokens(): Promise<TokenValidationResult> {
  try {
    // Read the button component file
    const buttonPath = join(
      process.cwd(),
      "packages/components/src/ui/button.tsx"
    );
    const buttonContent = await fs.readFile(buttonPath, "utf-8");

    // Find tokens used in the component
    const tokenMatches = buttonContent.match(/var\(--[^)]+\)/g) || [];
    const usedTokens = tokenMatches.map((match) =>
      match
        .replace("var(", "")
        .replace(")", "")
        .replace("[", "")
        .replace("]", "")
    );

    // Check for missing tokens
    const missingTokens = EXPECTED_BUTTON_TOKENS.filter(
      (token) => !usedTokens.includes(token)
    );

    // Check for unused expected tokens
    const unusedTokens = usedTokens.filter(
      (token) =>
        !EXPECTED_BUTTON_TOKENS.includes(token) && token.startsWith("--button-")
    );

    // Check for hardcoded values
    const hardcodedValues: string[] = [];
    HARDCODED_PATTERNS.forEach((pattern) => {
      const matches = buttonContent.match(pattern) || [];
      hardcodedValues.push(...matches);
    });

    // Remove false positives (values inside comments, etc.)
    const filteredHardcoded = hardcodedValues.filter((value) => {
      const lines = buttonContent.split("\n");
      return !lines.some(
        (line) =>
          line.includes(value) &&
          (line.trim().startsWith("//") || line.trim().startsWith("*"))
      );
    });

    const passed = missingTokens.length === 0 && filteredHardcoded.length === 0;

    return {
      component: "Button",
      missingTokens,
      unusedTokens,
      hardcodedValues: filteredHardcoded,
      passed,
    };
  } catch (error) {
    console.error("Error validating button tokens:", error);
    return {
      component: "Button",
      missingTokens: [],
      unusedTokens: [],
      hardcodedValues: [`Error reading component: ${error}`],
      passed: false,
    };
  }
}

async function validateDesignTokenFiles(): Promise<boolean> {
  try {
    // Check if token files exist
    const tokenPaths = [
      "packages/tokens/src/primitives/colors.css",
      "packages/tokens/src/semantic/buttons.css",
      "tailwind.config.js",
    ];

    const existingFiles: string[] = [];
    const missingFiles: string[] = [];

    for (const path of tokenPaths) {
      try {
        await fs.access(join(process.cwd(), path));
        existingFiles.push(path);
      } catch {
        missingFiles.push(path);
      }
    }

    console.log("\n📁 Design Token Files:");
    existingFiles.forEach((file) => console.log(`✅ ${file}`));
    missingFiles.forEach((file) => console.log(`❌ ${file}`));

    return missingFiles.length === 0;
  } catch (error) {
    console.error("Error checking token files:", error);
    return false;
  }
}

async function runValidation(): Promise<void> {
  console.log("🔍 Phase 2.2: Button Token Validation\n");

  // Validate design token files
  const tokenFilesExist = await validateDesignTokenFiles();

  // Validate button component
  const buttonValidation = await validateButtonTokens();

  console.log("\n🎯 Button Component Validation:");
  console.log(`Component: ${buttonValidation.component}`);
  console.log(`Status: ${buttonValidation.passed ? "✅ PASSED" : "❌ FAILED"}`);

  if (buttonValidation.missingTokens.length > 0) {
    console.log("\n❌ Missing Required Tokens:");
    buttonValidation.missingTokens.forEach((token) =>
      console.log(`   - ${token}`)
    );
  }

  if (buttonValidation.unusedTokens.length > 0) {
    console.log("\n⚠️  Unexpected Button Tokens Found:");
    buttonValidation.unusedTokens.forEach((token) =>
      console.log(`   - ${token}`)
    );
  }

  if (buttonValidation.hardcodedValues.length > 0) {
    console.log("\n🚨 Hardcoded Values Found (should use tokens):");
    buttonValidation.hardcodedValues.forEach((value) =>
      console.log(`   - ${value}`)
    );
  }

  // Summary
  console.log("\n📊 Validation Summary:");
  console.log(`• Token files: ${tokenFilesExist ? "✅" : "❌"}`);
  console.log(`• Button tokens: ${buttonValidation.passed ? "✅" : "❌"}`);
  console.log(`• Missing tokens: ${buttonValidation.missingTokens.length}`);
  console.log(`• Hardcoded values: ${buttonValidation.hardcodedValues.length}`);

  const overallPassed = tokenFilesExist && buttonValidation.passed;
  console.log(
    `\n🎯 Overall Result: ${overallPassed ? "✅ PASSED" : "❌ FAILED"}`
  );

  if (!overallPassed) {
    console.log("\n💡 Next Steps:");
    if (!tokenFilesExist) {
      console.log("• Ensure all design token files are in place");
    }
    if (!buttonValidation.passed) {
      console.log("• Fix missing token references in button component");
      console.log("• Replace any hardcoded values with design tokens");
    }
    process.exit(1);
  } else {
    console.log(
      "\n🎉 Button component successfully uses design system tokens!"
    );
    console.log("Ready to proceed to Phase 2.3 (Documentation)");
  }
}

// Run validation if called directly
if (require.main === module) {
  runValidation().catch(console.error);
}

export { validateButtonTokens, validateDesignTokenFiles, runValidation };
