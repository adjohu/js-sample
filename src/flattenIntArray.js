// Flattens a potentially deeply nested array of ints
// e.g. [[1,2,[3]],4] → [1,2,3,4]
export default function flattenIntArray(arr) {
  // Being cautious here - in most cases calling reduce below would throw
  // anyway, but it's possible that the argument is an object with a reduce
  // method on it.
  if (!Array.isArray(arr)) {
    throw new Error(`flattenIntArray should be passed an array, got ${arr}`);
  }

  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      // If we wanted to optimize this, we could mutate a single array rather
      // than creating a new array each time.
      return [...result, ...flattenIntArray(item)];
    }

    if (!Number.isInteger(item)) {
      throw new Error(`expected integer, got ${item}`);
    }

    return [...result, item];
  }, []);
}
