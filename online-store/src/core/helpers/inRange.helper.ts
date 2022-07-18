export function inRange(range: [string, string], value: string): boolean {
  const [min, max] = range;
  return (!min.length || Number(value) >= Number(min)) && (!max.length || Number(max) >= Number(value));
}
