import { bound } from "../bound";

export function cos(
  minTime: number,
  maxTime: number,
  minValue: number,
  maxValue: number
): (value: number) => number {
  const amplitude = maxValue - minValue;
  const timeRange = maxTime - minTime;
  return (time) => {
    const boundedTime = bound(minTime, maxTime, time);
    const ratio = (boundedTime - minTime) / timeRange;
    const cosValue = (1 - Math.cos(ratio * Math.PI)) / 2;
    return cosValue * amplitude + minValue;
  };
}
