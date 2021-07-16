import { Animation } from "./types";

export function mapTime<R>(
  timeTransform: (newTimeScale: number) => number,
  animation: Animation<R>
): Animation<R> {
  return (time) => animation(timeTransform(time));
}
