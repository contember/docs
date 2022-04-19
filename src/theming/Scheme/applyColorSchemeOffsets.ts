import { ColorSchemeOffsets } from "../Types"
import { isWeightLight } from "./isWeightLight"

export function applyColorSchemeOffsets(colorSchemeOffsets: ColorSchemeOffsets, background: number, base?: number) {
  const offsets = colorSchemeOffsets[isWeightLight(background) ? 'light' : 'dark']

  return Object.entries(offsets).reduce((weights, [key, value]) => ({
    ...weights,
    [key]: (base ?? background) + value,
  }), offsets)
}
