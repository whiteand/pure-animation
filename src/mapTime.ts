import { Animation } from "./types";

/**
 * Transforms `newTime` parameter before passing to the animation.
 * 
 * You can use it in order to create slow-mo effects. Example:

 * @example
 * const opacityAnimation = (time) => time / 100 + 0.1;
 * const slowMoOpacityAnimation = mapTime(
 *   (fastTime) => fastTime / 100,
 *   opacityAnimation
 * );
 * @param timeTransform function that takes time and transform to time that will be passed to animation
 * @param animation animation that will receive new time
 * @returns animation that takes time, transforms it and returns corresponding animated value
 */
export function mapTime<R>(
  timeTransform: (newTime: number) => number,
  animation: Animation<R>
): Animation<R> {
  return (time) => animation(timeTransform(time));
}
