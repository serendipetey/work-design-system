import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * This is the standard shadcn/ui utility for combining classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
