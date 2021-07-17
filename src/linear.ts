/**
 * Returns `y` coordinate of the point on the line that passes `(x0, y0)` and `(x1, y1)` and has x coordinate equal to `x`.
 *
 * @example
 * const celsiusToFahrenheit = (celsius) => linear(0, 10, 32, 50, ceilsius)
 * celsiusToFahrenheit(0) // 32
 * celsiusToFahrenheit(10) // 50
 * celsiusToFahrenheit(36.6) // 97.88
 */
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
