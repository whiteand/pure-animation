import { Animation } from "./types";
import { bound } from "./bound";
/**
 * Creates new animation that:
 *
 * - will return `animation(minTime)` if `time <= minTime`.
 * - will return `animation(maxTime)` if `time >= maxTime`
 * - will return `animation(time)` otherwise
 *
 * @param minTime minimal time that can be passed to unbounded animation
 * @param maxTime maximal time that can be passed to unbounded animation
 * @param unboundedAnimation animation that should receive time only from `minTime` to `maxTime`
 * @returns bounded animation
 * 
 * @example
 * const opacityAnimation = (time) => time / 100;
 * const appearAnimation = bounded(0, 100, opacityAnimation);
 *
 * appearAnimation(-10); // 0
 * appearAnimation(0); // 0
 * appearAnimation(5); // 0.05
 * appearAnimation(100); // 1
 * appearAnimation(120); // 120
 */
export function bounded<T>(
  minTime: number,
  maxTime: number,
  unboundedAnimation: Animation<T>
): Animation<T> {
  return (time) => unboundedAnimation(bound(minTime, maxTime, time));
}
