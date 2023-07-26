import chroma from "chroma-js";
import { WEIGHT_MAXIMUM } from "../Config";
import { blackOnWhite as list } from './blackOnWhite';

export function scaleGradient(
  lightHex: string,
  middleHex: string,
  hex: string,
): chroma.Color[] {
  const color = chroma(hex);
  const lightColor = chroma(lightHex);
  const middleColor = chroma(middleHex);

  const scale = chroma
    .scale([lightColor, middleColor, color])
    .mode("lab")
    .correctLightness()
    .colors(WEIGHT_MAXIMUM + 1);

  return list.map((luminance, index) => {
    return chroma(scale[index]).luminance(luminance)
  }).filter((_, index) => index % 25 === 0)
}
