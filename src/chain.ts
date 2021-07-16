import { Animation } from "./types";
type IChainConfig<R> = readonly [number, Animation<R>];
// configs should be sorted by start time
/**
 *
 * @param configs Array of pairs [startTime, animation]
 * @returns new animation
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
