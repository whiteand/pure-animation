import { Animation } from "./types";

export function delay<R>(
  timeDelay: number,
  animation: Animation<R>
): Animation<R> {
  return (time: number) => animation(time - timeDelay);
}
