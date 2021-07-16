import { Animation } from "./types";

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
    return array[index] as T;
  };
}
