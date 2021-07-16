export function bound<T extends number>(minValue: T, maxValue: T, value: T): T {
  if (value <= minValue) return minValue;
  if (value >= maxValue) return maxValue;
  return value;
}
