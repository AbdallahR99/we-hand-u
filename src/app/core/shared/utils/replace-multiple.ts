export function replaceMultiple(
  value: string,
  keysToReplace: string[],
  replaceWith: string[]
): string {
  // Create a mapping of keywords to their replacements
  const replaceMap = Object.fromEntries(
    keysToReplace.map((key, index) => [key, replaceWith[index]])
  );

  // Build a regex pattern that matches all keys in the map, escaping special characters
  const pattern = new RegExp(
    keysToReplace
      .map((key) => key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
      .join('|'),
    'g'
  );

  // Perform a single replace pass with a callback function for each match
  return value.replace(pattern, (matched) => replaceMap[matched]);
}
