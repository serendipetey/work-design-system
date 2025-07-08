interface TokenValidationResult {
    component: string;
    missingTokens: string[];
    unusedTokens: string[];
    hardcodedValues: string[];
    passed: boolean;
}
declare function validateButtonTokens(): Promise<TokenValidationResult>;
declare function validateDesignTokenFiles(): Promise<boolean>;
declare function runValidation(): Promise<void>;
export { validateButtonTokens, validateDesignTokenFiles, runValidation };
//# sourceMappingURL=validate-tokens.d.ts.map