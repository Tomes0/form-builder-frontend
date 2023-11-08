export function isEmptyObject(value: any) {
  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
}
