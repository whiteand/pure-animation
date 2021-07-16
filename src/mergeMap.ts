import { Animation } from "./types";

type AnimationsArrayFromValuesArray<T extends unknown[]> = {
  [ind in keyof T]: Animation<T[ind]>;
};

export function mergeMap<T, Args extends unknown[]>(
  merge: (...animatedValues: Args) => T,
  ...animations: AnimationsArrayFromValuesArray<Args>
): Animation<T> {
  return (time) => {
    const values = animations.map((animation) => animation(time)) as Args;
    return merge.apply(null, values);
  };
}
