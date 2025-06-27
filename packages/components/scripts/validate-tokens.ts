import { promises as fs } from "fs";
import { join } from "path";

interface TokenValidationResult {
  component: string;
  missingTokens: string[];
  unusedTokens: string[];
  hardcodedValues: string[];
  passed: boolean;
}

async function validateButtonTokens(): Promise<TokenValidationResult> {
  try {
    // Define expected design tokens for button component
    const expectedTokens = [
      // Color tokens
      "bg-primary",
      "text-primary-foreground",
      "hover:bg-primary/90",
      "bg-secondary",
      "text-secondary-foreground",
      "hover:bg-secondary/80",
      "bg-destructive",
      "text-destructive-foreground",
      "hover:bg-destructive/90",
      "bg-outline",
      "text-outline-foreground",
      "hover:bg-accent",
      "hover:text-accent-foreground",
      "bg-ghost",
      "text-ghost-foreground",
      // Size tokens
      "h-9",
      "px-4",
      "py-2",
      "h-8",
      "px-3",
      "text-sm",
      "h-10",
      "px-6",
      "h-11",
      // Border tokens
      "border",
      "border-input",
      // Focus tokens
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      // Typography tokens
      "text-sm",
      "font-medium",
      // State tokens
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      // Layout tokens
      "inline-flex",
      "items-center",
      "justify-center",
      "whitespace-nowrap",
      "rounded-md",
      "transition-colors",
    ];

    // Common hardcoded values to detect
    const hardcodedPatterns = [
      /#[0-9a-fA-F]{3,6}/, // Hex colors
      /rgb\(/, // RGB colors
      /rgba\(/, // RGBA colors
      /hsl\(/, // HSL colors
      /\d+px/, // Pixel values
      /\d+rem/, // Rem values (should use spacing scale)
      /\d+em/, // Em values
    ];

    // Read button component file
    const buttonPath = join(
      process.cwd(),
      "packages/components/src/ui/button.tsx"
    );
    const buttonContent = await fs.readFile(buttonPath, "utf-8");

    // Check for missing expected tokens
    const missingTokens = expectedTokens.filter(
      (token) => !buttonContent.includes(token)
    );

    // Find hardcoded values
    const hardcodedValues: string[] = [];
    for (const pattern of hardcodedPatterns) {
      const matches = buttonContent.match(new RegExp(pattern, "g"));
      if (matches) {
        hardcodedValues.push(...matches);
      }
    }

    // Filter out commented hardcoded values
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
      unusedTokens: [], // Could implement token usage analysis
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

// ES module equivalent of require.main === module
if (import.meta.url === `file://${process.argv[1]}`) {
  runValidation().catch(console.error);
}

export { validateButtonTokens, validateDesignTokenFiles, runValidation };
