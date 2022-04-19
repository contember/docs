import { PREFIX, WEIGHT_MAXIMUM, WEIGHT_STEP } from "../Config"
import { indentText, rangeOfNumbers } from "../Helpers"
import { themeCustomProperty } from "./themeCustomProperty"

export function scaleColorWeights(name: string, property?: string ) {
  return rangeOfNumbers(WEIGHT_MAXIMUM, 0, WEIGHT_STEP).map(weight => weight.toString()).map(weight =>
    indentText(`${themeCustomProperty({ property, prefix: PREFIX, weight })}: var(${themeCustomProperty({ name, prefix: PREFIX, weight })});`)
  ).join("\n")
}
