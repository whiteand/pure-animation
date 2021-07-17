/**
 * This is animation that returns time.
 * 
 * Same as:
 * 
 * ```javascript
 * const identity = (time) => time;
 * ```
 * 
 * You can use it as parameter to create other functions that will be more useful.
 * 
 * @example
 * const boundedTimeAnimation = bounded(0, 20, identity)
 * 
 * boundedTimeAnimation(-10) // 0
 * boundedTimeAnimation(0) // 0
 * boundedTimeAnimation(5) // 5
 * boundedTimeAnimation(20) // 20
 * boundedTimeAnimation(25) // 25
 * 
 * @param time current time
 * @returns current time
 */
export function identity<T>(value: T): T {
  return value;
}
