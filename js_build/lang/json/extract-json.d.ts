/**
 * Tries to extract JSON from a string.
 * Uses a strict JSON parser first, if it fails, tries to use "jsonic" which allows for more relaxed JSON syntax.
 * @param str JSON along with other text
 * @returns returns an object or null if failed to extract.
 */
export default function extractJSON(str: string, verbose?: boolean): object | null;
