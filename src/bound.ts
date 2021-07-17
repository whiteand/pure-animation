/**
 * 
 * @param minValue
 * @param maxValue 
 * @param value 
 * @returns
 *  `minValue` if `value < minValue`,  
 *  `maxValue` if `value > maxValue`,  
 *  `value` otherwise
 * 
 * @example
 * bound(0, 1, -10)  // 0
 * bound(0, 1, 0) // 0
 * bound(0, 1, 0.25) // 0.25
 * bound(0, 1, 1) // 1
 * bound(0, 1, 125) // 1
 */
export function bound<T extends number>(minValue: T, maxValue: T, value: T): T {
  if (value <= minValue) return minValue;
  if (value >= maxValue) return maxValue;
  return value;
}
