import { colorSchemesOpacities, PREFIX } from "../Config"
import { indentText } from "../Helpers"
import { applyColorSchemeOffsets } from "./applyColorSchemeOffsets"

export function themeSchemeOpacities (background: number, indentation: number = 1) {
  const opacities = applyColorSchemeOffsets(colorSchemesOpacities, background, 1)

  return indentText(`/* Opacities */
--${PREFIX}-opacity--strong: 1;
--${PREFIX}-opacity--high: ${opacities.high.toFixed(3)};
--${PREFIX}-opacity--medium: ${opacities.medium.toFixed(3)};
--${PREFIX}-opacity--low: ${opacities.low.toFixed(3)};
--${PREFIX}-opacity--lower: ${opacities.lower.toFixed(3)};
--${PREFIX}-opacity--control-background-color: ${opacities.controlBackgroundColor.toFixed(3)};
--${PREFIX}-opacity--control-background-color--highlighted: ${opacities.controlBackgroundColorHighlighted.toFixed(3)};
--${PREFIX}-opacity--filled-control-background-color--pressed: ${opacities.filledControlBackgroundColorPressed.toFixed(3)};
--${PREFIX}-opacity--toned-control-background-color: ${opacities.tonedControlBackgroundColor.toFixed(3)};`, indentation)
}
