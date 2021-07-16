import { Animation } from "./types";

export function map<T, R>(
  transform: (value: T) => R,
  animation: Animation<T>
): Animation<R> {
  return (time: number) => transform(animation(time));
}
