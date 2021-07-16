import { Animation } from "./types";
import { bound } from "./bound";

export function bounded<T>(
  minTime: number,
  maxTime: number,
  unboundedAnimation: Animation<T>
): Animation<T> {
  return (time) => unboundedAnimation(bound(minTime, maxTime, time));
}
