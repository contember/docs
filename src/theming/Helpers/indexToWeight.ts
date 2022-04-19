import { WEIGHT_MAXIMUM, WEIGHT_MINIMUM } from "../Config"

export function indexToWeight(
  count: number,
  index: number,
  start: number = WEIGHT_MAXIMUM,
  end: number = WEIGHT_MINIMUM
) {
  const step = (end - start) / (count - 1);

  return start + index * step;
}
