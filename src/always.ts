/**
 *
 * Given some `constant` returns animation that always returns this `constant`.
 *
 * @param value value that should be returned for any time
 * @returns animation that always returns passed value
 *
 * @example
 * const always10 = always(10);
 * always10(0); // 10
 * always10(1); // 10
 * always10(2); // 10
 */
export function always<T>(value: T): () => T {
  return () => value;
}
