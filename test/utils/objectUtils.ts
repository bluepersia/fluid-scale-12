export function sortObjectRecursively<T>(value: T): T {
  if (Array.isArray(value)) {
    // Keep array order but sort objects inside it recursively
    return value.map(sortObjectRecursively) as T;
  }

  if (value && typeof value === "object" && value.constructor === Object) {
    const sortedEntries = Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => [key, sortObjectRecursively(val)]);

    return Object.fromEntries(sortedEntries) as T;
  }

  // Return primitives as-is
  return value;
}
