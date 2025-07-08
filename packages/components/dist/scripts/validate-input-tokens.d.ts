interface TokenValidationResult {
    component: string;
    missingTokens: string[];
    hardcodedValues: string[];
    passed: boolean;
    details: string[];
}
declare function validateInputTokens(): Promise<TokenValidationResult>;
declare function runValidation(): Promise<TokenValidationResult>;
export { validateInputTokens, runValidation };
//# sourceMappingURL=validate-input-tokens.d.ts.map