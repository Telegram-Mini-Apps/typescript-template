export function toArray<T>(elem: T | T[]) {
  return Array.isArray(elem) ? elem : [elem];
}