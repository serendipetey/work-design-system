interface ValidationResult {
    name: string;
    passed: boolean;
    details: string[];
    errors: string[];
}
interface Phase22Results {
    tokenValidation: ValidationResult;
    accessibilityTests: ValidationResult;
    storybookValidation: ValidationResult;
    aiCompatibilityTests: ValidationResult;
    responsiveTests: ValidationResult;
    overallPassed: boolean;
}
declare function runPhase22Validation(): Promise<void>;
export type { ValidationResult, Phase22Results };
export { runPhase22Validation };
//# sourceMappingURL=run-phase-2-2-validation.d.ts.map