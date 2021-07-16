export function cos(
  minTime: number,
  maxTime: number,
  minValue: number,
  maxValue: number
): (value: number) => number {
  const amplitude = maxValue - minValue;
  const middleValue = amplitude / 2;
  const phase = Math.PI / (maxTime - minTime);
  return (time) => Math.cos(phase * time) * amplitude + middleValue;
}
