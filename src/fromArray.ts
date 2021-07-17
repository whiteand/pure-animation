import { Animation } from "./types";

/**
 * You can use this function to create animation of array items. Index of array is treated as a time.
 *
 * @example
 * const daysAnimation = fromArray([
 *   "monday",
 *   "tuesday",
 *   "wednesday",
 *   "thursday",
 *   "friday",
 *   "saturday",
 *   "sunday",
 * ]);
 *
 * daysAnimation(-1); // 'monday'
 * daysAnimation(0); // 'monday'
 * daysAnimation(0.5); // 'monday'
 * daysAnimation(1); // 'tuesday'
 * daysAnimation(6); // 'sunday'
 * daysAnimation(6.5); // 'sunday'
 * daysAnimation(25); // 'sunday'
 *
 * @param array array of elements that will be animated by index
 * @returns animation that takes index as time
 */
export function fromArray<T>(array: readonly T[]): Animation<T> {
  if (array.length <= 0) {
    throw new Error("cannot create animation from empty array");
  }

  if (array.length === 1) {
    const firstValue = array[0];
    return () => firstValue as T;
  }
  const first = array![0] as T;
  const last = array[array.length - 1] as T;
  return (index: number) => {
    if (index <= 0) {
      return first;
    }
    if (index >= array.length - 1) {
      return last;
    }
    const intIndex = Math.floor(index);
    return array[intIndex] as T;
  };
}
