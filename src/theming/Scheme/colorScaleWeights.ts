import chroma from "chroma-js"
import { PREFIX } from "../Config"
import { indentText } from "../Helpers"
import { ColorScaleMap } from "../Types"
import { themeCustomProperty } from "./themeCustomProperty"

export function colorScaleWeights(scale: ColorScaleMap, name?: string) {
  return Object.entries(scale).reverse().map(([weight, color]) =>
    indentText(`${themeCustomProperty({ name, prefix: PREFIX, weight })}: ${chroma(color).rgb().join(', ')};`)
  ).join("\n")
}
