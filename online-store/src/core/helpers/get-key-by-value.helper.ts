export function getKeyByValue(value: string, obj: Record<string, unknown>) {
  const indexOf = Object.values(obj).indexOf(value as unknown);
  const key = Object.keys(obj)[indexOf];
  return key;
}
