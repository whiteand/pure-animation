export function linear(
  minSource: number,
  maxSource: number,
  minValue: number,
  maxValue: number,
  t: number
) {
  return (
    minValue +
    ((t - minSource) / (maxSource - minSource)) * (maxValue - minValue)
  );
}
