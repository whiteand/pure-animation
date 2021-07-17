import { Animation } from "./types";

/**
 *
 * Creates animation which will return `transform(animation(time))` for each `time`.
 *
 * @example
 * const offsetAnimation = (time: number) => time * 10 + 10;
 * const offsetPixelAnimation = map((offset) => `${offset}px`, offsetAnimation);
 *
 * offsetPixelAnimation(100); // '1010px'
 *
 * @param transform function that transforms animated value
 * @param animation animation
 * @returns animation of transformed animated value
 */
export function map<T, R>(
  transform: (value: T) => R,
  animation: Animation<T>
): Animation<R> {
  return (time: number) => transform(animation(time));
}
