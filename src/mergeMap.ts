import { Animation } from "./types";

type AnimationValuesFrom<T extends Animation<unknown>[]> = {
  [ind in keyof T]: T[ind] extends Animation<infer U> ? U : never;
};

export function mergeMap<T, Args extends Animation<unknown>[]>(
  ...args: [...Args, (...values: AnimationValuesFrom<Args>) => T]
): Animation<T> {
  const animations = args.slice(0, -1) as Args;
  const transform = args[args.length - 1] as (
    ...values: AnimationValuesFrom<Args>
  ) => T;
  return (time) => {
    const values = animations.map((animation) =>
      animation(time)
    ) as AnimationValuesFrom<Args>;
    return transform.apply(null, values);
  };
}
