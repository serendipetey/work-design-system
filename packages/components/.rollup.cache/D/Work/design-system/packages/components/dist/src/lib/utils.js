import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
//# sourceMappingURL=utils.js.map