import { Animation } from "./types";
type IChainConfig<R> = readonly [number, Animation<R>];

/**
 * You can use this function to create chains of the different animations.
 * @example
 * // frameIndex should be from 0 to 100
 * const opacityFrom0To1 = (frameIndex: number) => frameIndex / 100;
 * const opacityFrom1To0 = (frameIndex: number) => 1 - frameIndex / 100;
 * 
 * const notificationAnimation = chain(
 *   [0, opacityFrom0To1], // from frame 0 to 100 (exclusive) it will appear
 *   [100, () => 1], // after frame 100 to 200 (exclusive) it will return 1
 *   [200, opacityFrom1To0] // after frame 200 it will fade out.
 * );
 * 
 * notificationAnimation(-10); // 0, since -10 < 0 chained function will return opacityFrom0To1(0).
 * notificationAnimation(5); // 0.05, since opacityFrom0To1(5) => 0.05
 * notificationAnimation(120); // 1, since () => 1 always returns 1
 * notificationAnimation(210); // 0.9, ince opacityFrom1To0(210 - 200) => 0.9
 * @warn
 * __WARNING!__ values passed to `chain` function should be in order of time increasing. Next function will **NOT** work correctly:
 * 
 * @example
 * const notificationAnimation = chain(
 *   [200, opacityFrom1To0],
 *   [0, opacityFrom0To1],
 *   [100, () => 1]
 * );
 * @param configs Array of pairs [startTime, animation]
 * @returns new animation
 * 
 */
export function chain<R>(...configs: readonly IChainConfig<R>[]): Animation<R> {
  if (configs.length <= 0) {
    throw new TypeError("Cannot call chain of empty configs");
  }

  const minTime = configs[0]![0];
  const firstAnimation = configs[0]![1];

  return (time) => {
    let ind = configs.length - 1;
    while (ind >= 0) {
      const startTime = configs[ind]![0];
      if (startTime <= time) {
        const animation = configs[ind]![1];
        return animation(time - startTime);
      }

      ind--;
    }
    return firstAnimation(minTime);
  };
}
