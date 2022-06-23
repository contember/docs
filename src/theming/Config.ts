import type { ColorSchemeOffsets } from "./Types"

export const PREFIX = "cui";
export const WHITE_SPACE = "\t";

export const COLORS_COUNT = 41;

export const WEIGHT_MAXIMUM = 1000;
export const WEIGHT_MINIMUM = 0;

export const WEIGHT_STEP = WEIGHT_MAXIMUM / (COLORS_COUNT - 1);
export const WEIGHT_STEP_LIGHT = WEIGHT_STEP * 1
export const WEIGHT_STEP_DARK = WEIGHT_STEP * 1

/**
 * @deprecated
 */
export const THEMES_LIST_BRANDS = [
  'primary',
  'secondary',
  'tertiary',
]

/**
 * @deprecated
 */
export const THEMES_LIST_SYSTEM = [
  'positive',
  'success',
  'warn',
  'danger',
  'default',
]

export const THEMES_LIST = [
  ...THEMES_LIST_BRANDS,
  ...THEMES_LIST_SYSTEM,
]

export const themeNames = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  positive: 'positive',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
  default: 'default',
}

export type ThemeName = keyof typeof themeNames

export const CONTEMBER_THEMES: {[Property in ThemeName]: [string, string, string]} = Object.freeze({
  primary: ["#3E94F7", "#3E94F7", "#3E94F7"], // "#15009C", 1F00B0 000067
  secondary: ["#3DA9EB", "#3DA9EB", "#3DA9EB"],
  tertiary: ["#AE65FF", "#AE65FF", "#AE65FF"],
  positive: ["#3E94F7", "#3E94F7", "#3E94F7"], // "#4390FF",
  success: ["#85D315", "#85D315", "#85D315"],
  warn: ["#F99B19", "#F99B19", "#F99B19"], //"#EC9117",
  danger: ["#FF0000", "#FF0000", "#FF0000"], //"#FF4827",
  default: ["#000000", "#000000", "#000000"]
})

export const c5 = -4; // -4; // 8
export const c4 = -14; // -15; // 0
export const c3 = 6; // 6; // 0
export const c2 = 180; // 180; // 90
export const c1 = 100; // 100; // 68

export const colorSchemeWeightOffsets: ColorSchemeOffsets = {
  light: {
    color: -875,
    controlColor: -575,
    controlColorHighlighted: -575,
    controlColorPressed: -650,
    controlBorderColor: -500,
    controlBorderColorHighlighted: -575,
    controlBackgroundColor: 0,
    controlBackgroundColorHighlighted: 250,
    filledControlColor: -575,
    filledControlColorHighlighted: -525,
    filledControlColorPressed: -775,
    filledControlBorderColorPressed: -775,
    filledControlBackroundColor: 50,
    filledControlBackgroundColorHighlighted: 75,
    filledControlBackgroundColorPressed: -600,
    filledPrimaryControlColor: 50,
    filledPrimaryControlColorHighlighted: 400,
    filledPrimaryControlColorPressed: -200,
    filledPrimaryControlBorderColorPressed: -200,
    filledPrimaryControlBackroundColor: -600,
    filledPrimaryControlBackgroundColorHighlighted: -550,
    filledPrimaryControlBackgroundColorPressed: -600,
    tonedControlColorWeight: -700,
    tonedControlColorWeightHighlighed: -300,
    tonedControlBackgroundColor: -125,
    tonedControlBackgroundColorHighlighed: 100
  },
  dark: {
    color: 975,
    controlColor: 575,
    controlColorHighlighted: 900,
    controlColorPressed: 550,
    controlBorderColor: 550,
    controlBorderColorHighlighted: 900,
    controlBackgroundColor: -150,
    controlBackgroundColorHighlighted: 250,
    filledControlColor: 650,
    filledControlColorHighlighted: 1000,
    filledControlColorPressed: 650,
    filledControlBorderColorPressed: 650,
    filledControlBackroundColor: 125,
    filledControlBackgroundColorHighlighted: 250,
    filledControlBackgroundColorPressed: 125,
    filledPrimaryControlColor: 1000,
    filledPrimaryControlColorHighlighted: 1000,
    filledPrimaryControlColorPressed: 600,
    filledPrimaryControlBorderColorPressed: 650,
    filledPrimaryControlBackroundColor: 275,
    filledPrimaryControlBackgroundColorHighlighted: 350,
    filledPrimaryControlBackgroundColorPressed: 125,
    tonedControlColorWeight: 850,
    tonedControlColorWeightHighlighed: 950,
    tonedControlBackgroundColor: 250,
    tonedControlBackgroundColorHighlighed: 325
  }
}

export const colorSchemesOpacities: ColorSchemeOffsets = {
  light: {
    high: -0.25,
    medium: -0.50,
    low: -0.7,
    lower: -0.875,
    controlBackgroundColor: -0.75,
    controlBackgroundColorHighlighted: -0.25,
    filledControlBackgroundColorPressed: -0.5,
    tonedControlBackgroundColor: -0.75,
    tonedControlBackgroundColorHighlighted: -0.5 / 2,
  },
  dark: {
    high: -0.25,
    medium: -0.50,
    low: -0.7,
    lower: -0.875,
    controlBackgroundColor: -0.75,
    controlBackgroundColorHighlighted: -0.25,
    filledControlBackgroundColorPressed: -0.5,
    tonedControlBackgroundColor: -0.5,
    tonedControlBackgroundColorHighlighted: -0.25 / 2,
  },
}
