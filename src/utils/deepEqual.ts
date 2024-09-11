function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  // Handle arrays separately
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    // Sort arrays before comparing if order does not matter
    return a
      .slice()
      .sort()
      .every((item, index) => deepEqual(item, b.slice().sort()[index]));
  }

  // Handle objects
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      keysB.includes(key) &&
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      ),
  );
}

export default deepEqual;
