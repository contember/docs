import chroma from "chroma-js"
import { COLORS_COUNT } from "../Config"
import list from './list'

export function scaleGradient(
  lightHex: string,
  middleHex: string,
  hex: string,
): chroma.Color[] {
  const color = chroma(hex);
  const lightColor = chroma(lightHex);
  const middleColor = chroma(middleHex);

  // const targetHSV_h = color.get("hsv.h");
  // const targetHSV_s = color.get("hsv.s");

  const scale = chroma
    .scale([lightColor, middleColor, color])
    .mode("lab")
    .correctLightness()
    .colors(COLORS_COUNT);

  return list.map((luminance, index) => {
    let color: chroma.Color = chroma(scale[index]).luminance(luminance);

    // const lightness = color.get("hcl.l");
    // color = color.set("hsv.s", targetHSV_s);
    // color = iterateToLightness(color, lightness);

    // color = iterateToSaturation(color, targetHSV_s);

    return color;
  });
}
