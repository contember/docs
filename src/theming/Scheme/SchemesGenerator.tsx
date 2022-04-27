import { Button, Stack } from "@contember/admin"
import * as React from "react"
import { WEIGHT_MAXIMUM, WEIGHT_MINIMUM, WEIGHT_STEP, WEIGHT_STEP_DARK, WEIGHT_STEP_LIGHT } from "../Config"
import { copyTextToClipboard, cssToSASS, indentText } from "../Helpers"
import { colorScaleWeights } from "./colorScaleWeights"
import { colorScales } from "./palette"
import { recombineCSSSelectors } from "./recombineCSSSelectors"
import { scaleColorWeights } from "./scaleColorWeights"
import { themeScheme } from "./themeScheme"
import { themeSchemeOpacities } from "./themeSchemeOpacities"

const lightWeight = WEIGHT_MAXIMUM - WEIGHT_STEP_LIGHT - WEIGHT_STEP
const darkWeight = WEIGHT_MINIMUM + WEIGHT_STEP_DARK + WEIGHT_STEP

const css = `/*** All color swatches: ***/
:root {
${colorScales.map(({ hex, name, scale }) => indentText(`/** ${name}: ${hex} **/`) + "\n" + colorScaleWeights(scale, name)
).filter(Boolean).join("\n\n")}

\t/* Content */
${scaleColorWeights('default', 'content')}

\t/* Controls */
${scaleColorWeights('primary', 'controls')}
}

/*** Color themes ***/
${colorScales.map(({ name, hex }) => `/** ${hex} **/
${recombineCSSSelectors(
  [`.theme-${name}`, `.theme-${name}-content`],
  ['', '\\:hover:hover', '\\:active:active', '\\:focus:focus'],
)} {
${scaleColorWeights(name, 'content')}
}
${recombineCSSSelectors(
  [`.theme-${name}`, `.theme-${name}-controls`],
  ['', '\\:hover:hover', '\\:active:active', '\\:focus:focus'],
)} {
${scaleColorWeights(name, 'controls')}
}
`).join("\n")}

:root,
.scheme-system,
.scheme-system-above,
.scheme-system-below {
  color-scheme: light dark;
}
.scheme-light,
.scheme-light-above,
.scheme-light-below {
  color-scheme: light;
}

.scheme-dark,
.scheme-dark-below,
.scheme-dark-above {
  color-scheme: dark;
}

:root,
.scheme-light,
.scheme-system,
.scheme-light-above,
.scheme-light-below,
.scheme-system-above,
.scheme-system-below {
${themeSchemeOpacities(lightWeight)}
}
.scheme-dark,
.scheme-dark-below,
.scheme-dark-above {
${themeSchemeOpacities(darkWeight)}
}
.scheme-light-below, .scheme-light-below .cui-theme:not([class*="scheme-"]),
.scheme-system-below, .scheme-system-below .cui-theme:not([class*="scheme-"]) {
${themeScheme(lightWeight - WEIGHT_STEP_LIGHT)}
}
:root, :root .cui-theme:not([class*="scheme-"]),
.scheme-light, .scheme-light .cui-theme:not([class*="scheme-"]),
.scheme-system, .scheme-system .cui-theme:not([class*="scheme-"]) {
${themeScheme(lightWeight)}
}
.scheme-light-above, .scheme-light-above .cui-theme:not([class*="scheme-"]),
.scheme-system-above, .scheme-system-above .cui-theme:not([class*="scheme-"]) {
${themeScheme(lightWeight + WEIGHT_STEP_LIGHT)}
}
.scheme-dark-below, .scheme-dark-below .cui-theme:not([class*="scheme-"]) {
${themeScheme(darkWeight - WEIGHT_STEP_DARK)}
}
.scheme-dark, .scheme-dark .cui-theme:not([class*="scheme-"]) {
${themeScheme(darkWeight)}
}
.scheme-dark-above, .scheme-dark-above .cui-theme:not([class*="scheme-"]) {
${themeScheme(darkWeight + WEIGHT_STEP_LIGHT)}
}

/*** Prefers dark scheme defaults: ***/
@media (prefers-color-scheme: dark) {
${indentText(
`:root,
.scheme-dark,
.scheme-system,
.scheme-dark-above,
.scheme-dark-below,
.scheme-system-above,
.scheme-system-below {
${themeSchemeOpacities(darkWeight)}
}
.scheme-light,
.scheme-light-above,
.scheme-light-below {
${themeSchemeOpacities(lightWeight)}
}
.scheme-dark-below, .scheme-dark-below .cui-theme:not([class*="scheme-"]),
.scheme-system-below, .scheme-system-below .cui-theme:not([class*="scheme-"]) {
${themeScheme(darkWeight - WEIGHT_STEP_DARK)}
}
:root, :root .cui-theme:not([class*="scheme-"]),
.scheme-dark, .scheme-dark .cui-theme:not([class*="scheme-"]),
.scheme-system, .scheme-system .cui-theme:not([class*="scheme-"]) {
${themeScheme(darkWeight)}
}
.scheme-dark-above, .scheme-dark-above .cui-theme:not([class*="scheme-"]),
.scheme-system-above, .scheme-system-above .cui-theme:not([class*="scheme-"]) {
${themeScheme(darkWeight + WEIGHT_STEP_DARK)}
}
.scheme-light-below, .scheme-light-below .cui-theme:not([class*="scheme-"]) {
${themeScheme(lightWeight - WEIGHT_STEP_LIGHT)}
}
.scheme-light,
.scheme-light .cui-theme:not([class*="scheme-"]) {
${themeScheme(lightWeight)}
}
.scheme-light-above,
.scheme-light-above .cui-theme:not([class*="scheme-"]) {
${themeScheme(lightWeight + WEIGHT_STEP_LIGHT)}
}`)}
}
`

export const SchemesGenerator = () => {
  return <Stack direction="vertical">
    <Stack direction="horizontal">
      <Button distinction="primary" onClick={React.useCallback(() => { copyTextToClipboard(css) }, [])}>Copy CSS</Button>
      <Button onClick={React.useCallback(() => { copyTextToClipboard(cssToSASS(css)) }, [])}>Copy SASS</Button>
    </Stack>
    <style className="is-visible-style">{css}</style>
  </Stack>
}
