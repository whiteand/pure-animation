import { bound } from "../bound";

/**
 * This function returns animation simmilar to `ease-in-out` animation that changes from `minValue` to `maxValue`, when time changes from `startTime` to `maxTime`.
 *
 * @param startTime
 * @param endTime
 * @param startValue
 * @param endValue
 * @returns animation that returns value between start value and end value when time changes from start time to end time.
 * @example
 * const opacityAnimation = cos(
 *   0, // animation start from time 0
 *   60, // animation finishes when time is 60
 *   0, // animation will equal to 0 when time <= startTime
 *   1, // animation will equal to 1 when time >= endTime.
 * ) // animation will return values from 0 to 1 when startTime < time < endTime
 * opacityAnimation(-1) // 0
 * opacityAnimation(0) // 0
 * opacityAnimation(1) // 0.000685
 * opacityAnimation(30) // 0.5
 * opacityAnimation(55) // 0.9829
 * opacityAnimation(60) // 1
 * opacityAnimation(61) // 1
 */
export function cos(
  startTime: number,
  endTime: number,
  startValue: number,
  endValue: number
): (value: number) => number {
  const amplitude = endValue - startValue;
  const timeRange = endTime - startTime;
  return (time) => {
    const boundedTime = bound(startTime, endTime, time);
    const ratio = (boundedTime - startTime) / timeRange;
    const cosValue = (1 - Math.cos(ratio * Math.PI)) / 2;
    return cosValue * amplitude + startValue;
  };
}
