import type { ColorWeightMap } from "../Types"

export function scaleToCSSProperties(
  name: string,
  colors: ColorWeightMap
): string[] {
  return Object.values(colors).map(
    ({ rgb, weight }) => `--${name}-${weight}: ${rgb}`
  );
}
