import { Animation } from "./types";

/**
 * You can use animated value to create new animation and apply it. See example below:
 *
 * @example
 * const scrollAnimation = () => window.scrollY;
 * const scrolledBasedPosition = switchMap((scroll) => {
 *   if (scroll < 100) return () => 1000;
 *   if (scroll > 200) return () => -1000;
 *   return (time) => time / 100;
 * }, scrollAnimation);
 * scrolledBasedPosition(10); // will return 1000 if scroll < 100
 * scrolledBasedPosition(250); // will return -1000 if scroll > 200
 * scrolledBasedPosition(150); // will return 1.5
 * @param createAnimation
 * @param animation
 * @returns
 */
export function switchMap<T, R>(
  createAnimation: (animatedValue: T) => Animation<R>,
  animation: Animation<T>
): Animation<R> {
  return (time: number) => createAnimation(animation(time))(time);
}
