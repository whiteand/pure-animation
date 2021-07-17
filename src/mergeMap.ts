import { Animation } from "./types";

type AnimationsArrayFromValuesArray<T extends unknown[]> = {
  [ind in keyof T]: Animation<T[ind]>;
};

/**
 * You can create animation by combining of values of other animations
 * @example
 * const temperatureAnimation = (year) => {
 *   switch (year) {
 *     case 2021:
 *       return 60;
 *     case 2025:
 *       return 40;
 *     case 2030:
 *       return 30;
 *     default:
 *       return 25;
 *   }
 * };
 * const populationAnimation = (year) => {
 *   return 7_500_000_000 + year * 100_000_000;
 * };
 * 
 * const temperatureAndPopulationAnimation = mergeMap(
 *   (temperature, population) => ({ temperature, population }),
 *   temperatureAnimation,
 *   populationAnimation
 * );
 * 
 * temperatureAndPopulationAnimation(2021); // { temperature: 60, population: 7500000000}
 * temperatureAndPopulationAnimation(2022); // { temperature: 25, population: 7600000000}

 * @param merge function that takes all animated values and transforms it into one animated value
 * @param animations several animations
 * @returns animation that returns merged animated value
 */
export function mergeMap<T, Args extends unknown[]>(
  merge: (...animatedValues: Args) => T,
  ...animations: AnimationsArrayFromValuesArray<Args>
): Animation<T> {
  return (time) => {
    const values = animations.map((animation) => animation(time)) as Args;
    return merge.apply(null, values);
  };
}
