import { Animation } from "./types";

export function switchMap<T, R>(
  createAnimation: (animatedValue: T) => Animation<R>,
  animation: Animation<T>
): Animation<R> {
  return (time: number) => createAnimation(animation(time))(time);
}
