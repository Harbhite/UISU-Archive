import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes intelligently.
 *
 * This utility wraps `clsx` for conditional class merging and `tailwind-merge` for resolving
 * conflicting Tailwind classes (e.g., `p-4` and `p-6`).
 *
 * @param {...ClassValue[]} inputs - A list of class values (strings, objects, arrays) to be combined.
 * @returns {string} A single string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
