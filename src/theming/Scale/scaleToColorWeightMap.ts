import { WEIGHT_MAXIMUM, WEIGHT_MINIMUM } from "../Config"
import { indexToWeight } from "../Helpers/indexToWeight"
import type { ColorWeightMap } from "../Types"

export function scaleToColorWeightMap(
  scale: chroma.Color[],
  start: number = WEIGHT_MAXIMUM,
  end: number = WEIGHT_MINIMUM
): ColorWeightMap {
  const count = scale.length;

  return scale.reduce<ColorWeightMap>((map, color, index) => {
    const weight = indexToWeight(count, index, start, end);
    const hex = color.hex();
    const rgb = color.rgb().join(", ");

    map[weight.toString(10)] = {
      hex,
      rgb,
      weight
    };

    return map;
  }, {});
}
