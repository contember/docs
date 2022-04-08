export function indexToWeight(
  count: number,
  index: number,
  start: number = 1000,
  end: number = 0
) {
  const step = (end - start) / (count - 1);

  return start + index * step;
}
