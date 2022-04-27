import { colorSchemesOpacities, colorSchemeWeightOffsets, PREFIX, WEIGHT_STEP_DARK, WEIGHT_STEP_LIGHT } from "../Config"
import { indentText } from "../Helpers"
import { applyColorSchemeOffsets } from "./applyColorSchemeOffsets"
import { contentColorCustomPropertyAtWeight } from "./contentColorCustomPropertyAtWeight"
import { controlColorCustomPropertyAtWeight } from "./controlColorCustomPropertyAtWeight"
import { isWeightLight } from "./isWeightLight"

export function themeScheme (background: number, indentation: number = 1){
  const weights = applyColorSchemeOffsets(colorSchemeWeightOffsets, background)
  const opacities = applyColorSchemeOffsets(colorSchemesOpacities, background, 1)
  const isLight = isWeightLight(background)

  return indentText(`/* Content */
--${PREFIX}-background-color: ${contentColorCustomPropertyAtWeight(background)};
--${PREFIX}-background-color--above: ${contentColorCustomPropertyAtWeight(background + (isLight ? WEIGHT_STEP_LIGHT : WEIGHT_STEP_DARK))};
--${PREFIX}-background-color--below: ${contentColorCustomPropertyAtWeight(background - (isLight ? WEIGHT_STEP_LIGHT : WEIGHT_STEP_DARK))};
--${PREFIX}-color: ${contentColorCustomPropertyAtWeight(weights.color, opacities.high)};
--${PREFIX}-color--strong: ${contentColorCustomPropertyAtWeight(weights.color)};
--${PREFIX}-color--high: ${contentColorCustomPropertyAtWeight(weights.color, opacities.high)};
--${PREFIX}-color--medium: ${contentColorCustomPropertyAtWeight(weights.color, opacities.medium)};
--${PREFIX}-color--low: ${contentColorCustomPropertyAtWeight(weights.color, opacities.low)};
--${PREFIX}-color--lower: ${contentColorCustomPropertyAtWeight(weights.color, opacities.lower)};

/* Control – ${background} : ${weights.controlColor}*/
--${PREFIX}-control-color: ${controlColorCustomPropertyAtWeight(weights.controlColor)};
--${PREFIX}-control-background-color: ${controlColorCustomPropertyAtWeight(weights.controlBackgroundColor, opacities.controlBackgroundColor)};
--${PREFIX}-control-border-color: ${controlColorCustomPropertyAtWeight(weights.controlBorderColor)};

/* Content:highlighted – ${background} : ${weights.controlColorHighlighted} */
--${PREFIX}-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.controlColorHighlighted)};
--${PREFIX}-background-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.controlBackgroundColorHighlighted, opacities.controlBackgroundColorHighlighted)};
--${PREFIX}-border-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.controlBorderColorHighlighted)};
/* Control:highlighted – ${background} : ${weights.controlColorHighlighted} */
--${PREFIX}-control-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.controlColorHighlighted)};
--${PREFIX}-control-background-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.controlBackgroundColorHighlighted, opacities.controlBackgroundColorHighlighted)};
--${PREFIX}-control-border-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.controlBorderColorHighlighted)};

/* Content:pressed — ${background} : ${weights.controlColorPressed} */
--${PREFIX}-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlColorPressed)};
--${PREFIX}-background-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlBackgroundColorPressed, opacities.filledControlBackgroundColorPressed)};
--${PREFIX}-border-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlBorderColorPressed)};
/* Control:pressed — ${background} : ${weights.controlColorPressed} */
--${PREFIX}-control-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlColorPressed)};
--${PREFIX}-control-background-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlBackgroundColorPressed, opacities.filledControlBackgroundColorPressed)};
--${PREFIX}-control-border-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlBorderColorPressed)};

/* FilledContent — ${weights.filledControlBackroundColor} : ${contentColorCustomPropertyAtWeight(weights.filledControlColor)} */
--${PREFIX}-filled-color: ${contentColorCustomPropertyAtWeight(weights.filledControlColor)};
--${PREFIX}-filled-background-color: ${contentColorCustomPropertyAtWeight(weights.filledControlBackroundColor)};
--${PREFIX}-filled-border-color: ${contentColorCustomPropertyAtWeight(weights.filledControlColor)};
/* FilledControl — ${weights.filledControlBackroundColor} : ${controlColorCustomPropertyAtWeight(weights.filledControlColor)} */
--${PREFIX}-filled-control-color: ${controlColorCustomPropertyAtWeight(weights.filledControlColor)};
--${PREFIX}-filled-control-background-color: ${controlColorCustomPropertyAtWeight(weights.filledControlBackroundColor)};
--${PREFIX}-filled-control-border-color: ${controlColorCustomPropertyAtWeight(weights.filledControlColor)};

/* FilledContent:highlighted – ${weights.filledControlBackgroundColorHighlighted} : ${weights.filledControlColorHighlighted} */
--${PREFIX}-filled-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledControlColorHighlighted)};
--${PREFIX}-filled-background-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledControlBackgroundColorHighlighted)};
--${PREFIX}-filled-border-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledControlColorHighlighted)};
/* FilledControl:highlighted – ${weights.filledControlBackgroundColorHighlighted} : ${weights.filledControlColorHighlighted} */
--${PREFIX}-filled-control-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.filledControlColorHighlighted)};
--${PREFIX}-filled-control-background-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.filledControlBackgroundColorHighlighted)};
--${PREFIX}-filled-control-border-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.filledControlColorHighlighted)};

/* FilledContent:pressed – ${weights.filledControlBackgroundColorPressed ?? ''} alpha : ${weights.filledControlColorPressed} */
--${PREFIX}-filled-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlColorPressed)};
--${PREFIX}-filled-background-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlBackgroundColorPressed, opacities.filledControlBackgroundColorPressed)};
--${PREFIX}-filled-border-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlBorderColorPressed)};
/* FilledControl:pressed – ${weights.filledControlBackgroundColorPressed ?? ''} alpha : ${weights.filledControlColorPressed} */
--${PREFIX}-filled-control-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlColorPressed)};
--${PREFIX}-filled-control-background-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlBackgroundColorPressed, opacities.filledControlBackgroundColorPressed)};
--${PREFIX}-filled-control-border-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlBorderColorPressed)};

/* FilledPrimaryContent — ${weights.filledPrimaryControlBackroundColor} : ${contentColorCustomPropertyAtWeight(weights.filledControlColor)} */
--${PREFIX}-filled-primary-color: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlColor)};
--${PREFIX}-filled-primary-background-color: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlBackroundColor)};
--${PREFIX}-filled-primary-border-color: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlColor)};
/* FilledPrimaryControl — ${weights.filledPrimaryControlBackroundColor} : ${controlColorCustomPropertyAtWeight(weights.filledControlColor)} */
--${PREFIX}-filled-primary-control-color: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlColor)};
--${PREFIX}-filled-primary-control-background-color: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlBackroundColor)};
--${PREFIX}-filled-primary-control-border-color: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlColor)};

/* FilledPrimaryContent:highlighted – ${weights.filledPrimaryControlBackgroundColorHighlighted} : ${weights.filledPrimaryControlColorHighlighted} */
--${PREFIX}-filled-primary-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlColorHighlighted)};
--${PREFIX}-filled-primary-background-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlBackgroundColorHighlighted)};
--${PREFIX}-filled-primary-border-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlColorHighlighted)};
/* FilledPrimaryControl:highlighted – ${weights.filledPrimaryControlBackgroundColorHighlighted} : ${weights.filledPrimaryControlColorHighlighted} */
--${PREFIX}-filled-primary-control-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlColorHighlighted)};
--${PREFIX}-filled-primary-control-background-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlBackgroundColorHighlighted)};
--${PREFIX}-filled-primary-control-border-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlColorHighlighted)};

/* FilledPrimaryContent:pressed – ${weights.filledPrimaryControlBackgroundColorPressed ?? ''} alpha : ${weights.filledPrimaryControlColorPressed} */
--${PREFIX}-filled-primary-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlColorPressed)};
--${PREFIX}-filled-primary-background-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlBackgroundColorPressed, opacities.filledPrimaryControlBackgroundColorPressed)};
--${PREFIX}-filled-primary-border-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlBorderColorPressed)};
/* FilledPrimaryControl:pressed – ${weights.filledPrimaryControlBackgroundColorPressed ?? ''} alpha : ${weights.filledPrimaryControlColorPressed} */
--${PREFIX}-filled-primary-control-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlColorPressed)};
--${PREFIX}-filled-primary-control-background-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlBackgroundColorPressed, opacities.filledPrimaryControlBackgroundColorPressed)};
--${PREFIX}-filled-primary-control-border-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledPrimaryControlBorderColorPressed)};

/* TonedContent — ${weights.tonedControlBackgroundColor} alpha : ${weights.tonedControlColorWeight} */
--${PREFIX}-toned-color: ${contentColorCustomPropertyAtWeight(weights.tonedControlColorWeight)};
--${PREFIX}-toned-background-color: ${contentColorCustomPropertyAtWeight(weights.tonedControlBackgroundColor, opacities.tonedControlBackgroundColor)};
--${PREFIX}-toned-border-color: ${contentColorCustomPropertyAtWeight(weights.tonedControlColorWeight)};
/* TonedControl — ${weights.tonedControlBackgroundColor} alpha : ${weights.tonedControlColorWeight} */
--${PREFIX}-toned-control-color: ${controlColorCustomPropertyAtWeight(weights.tonedControlColorWeight)};
--${PREFIX}-toned-control-background-color: ${controlColorCustomPropertyAtWeight(weights.tonedControlBackgroundColor, opacities.tonedControlBackgroundColor)};
--${PREFIX}-toned-control-border-color: ${controlColorCustomPropertyAtWeight(weights.tonedControlColorWeight)};

/* TonedContent:highlighted = FilledControl:highlighted */
--${PREFIX}-toned-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlColorHighlighted)};
--${PREFIX}-toned-background-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledPrimaryControlBackgroundColorHighlighted)};
--${PREFIX}-toned-border-color--highlighted: ${contentColorCustomPropertyAtWeight(weights.filledControlColorHighlighted)};
/* TonedControl:highlighted = FilledControl:highlighted */
--${PREFIX}-toned-control-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.tonedControlColorWeightHighlighed)};
--${PREFIX}-toned-control-background-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.tonedControlBackgroundColorHighlighed, opacities.tonedControlBackgroundColorHighlighted)};
--${PREFIX}-toned-control-border-color--highlighted: ${controlColorCustomPropertyAtWeight(weights.filledControlColorHighlighted)};

/* TonedContent:pressed = FilledControl:pressed */
--${PREFIX}-toned-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlColorPressed)};
--${PREFIX}-toned-background-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlBackgroundColorPressed, opacities.filledControlBackgroundColorPressed)};
--${PREFIX}-toned-border-color--pressed: ${contentColorCustomPropertyAtWeight(weights.filledControlBorderColorPressed)};
/* TonedControl:pressed = FilledControl:pressed */
--${PREFIX}-toned-control-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlColorPressed)};
--${PREFIX}-toned-control-background-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlBackgroundColorPressed, opacities.filledControlBackgroundColorPressed)};
--${PREFIX}-toned-control-border-color--pressed: ${controlColorCustomPropertyAtWeight(weights.filledControlBorderColorPressed)};`, indentation)
}
