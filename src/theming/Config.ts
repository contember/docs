import type { ColorSchemeOffsets } from "./Types"

export const PREFIX = "cui";
export const WHITE_SPACE = "\t";

export const COLORS_COUNT = 41;

export const WEIGHT_MAXIMUM = 1000;
export const WEIGHT_MINIMUM = 0;

/**
 * @deprecated
 */
export const step = WEIGHT_MAXIMUM / (COLORS_COUNT - 1);
export const WEIGHT_STEP = WEIGHT_MAXIMUM / (COLORS_COUNT - 1);

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
  primary: ["#00E1FF", "#0062FF", "#000067"], // "#15009C", 1F00B0 000067
  secondary: ["#3DA9EB", "#3DA9EB", "#3DA9EB"],
  tertiary: ["#AE65FF", "#AE65FF", "#AE65FF"],
  positive: ["#006AFF", "#006AFF", "#006AFF"], // "#4390FF",
  success: ["#6EBB00", "#6EBB00", "#6EBB00"],
  warn: ["#FF6600", "#FF6600", "#FF6600"], //"#EC9117",
  danger: ["#FF004C", "#FF4D00", "#FF0000"], //"#FF4827",
  default: ["#999999", "#999999", "#999999"]
})

export const c5 = -4; // -4; // 8
export const c4 = -14; // -15; // 0
export const c3 = 6; // 6; // 0
export const c2 = 180; // 180; // 90
export const c1 = 100; // 100; // 68

export const colorSchemeWeightOffsets: ColorSchemeOffsets = {
  light: {
    color: -875,
    controlColor: -475,
    controlColorHighlighted: -375,
    controlColorPressed: -475,
    controlBorderColor: -475,
    controlBorderColorHighlighted: -375,
    controlBackgroundColor: 0,
    controlBackgroundColorHighlighted: 250,
    filledControlColor: -525,
    filledControlColorHighlighted: -425,
    filledControlColorPressed: -400,
    filledControlBorderColorPressed: -200,
    filledControlBackroundColor: -50,
    filledControlBackgroundColorHighlighted: 75,
    filledControlBackgroundColorPressed: -300,
    filledPrimaryControlColor: 250,
    filledPrimaryControlColorHighlighted: 375,
    filledPrimaryControlColorPressed: -100,
    filledPrimaryControlBorderColorPressed: -200,
    filledPrimaryControlBackroundColor: -500,
    filledPrimaryControlBackgroundColorHighlighted: -375,
    filledPrimaryControlBackgroundColorPressed: -625,
    tonedControlColorWeight: -700,
    tonedControlBackgroundColor: -150
  },
  dark: {
    color: 975,
    controlColor: 550,
    controlColorHighlighted: 1000,
    controlColorPressed: 550,
    controlBorderColor: 550,
    controlBorderColorHighlighted: 1175,
    controlBackgroundColor: 0,
    controlBackgroundColorHighlighted: 250,
    filledControlColor: 850,
    filledControlColorHighlighted: 875,
    filledControlColorPressed: 650,
    filledControlBorderColorPressed: 250,
    filledControlBackroundColor: 125,
    filledControlBackgroundColorHighlighted: 250,
    filledControlBackgroundColorPressed: -75,
    filledPrimaryControlColor: 950,
    filledPrimaryControlColorHighlighted: 1000,
    filledPrimaryControlColorPressed: 750,
    filledPrimaryControlBorderColorPressed: 750,
    filledPrimaryControlBackroundColor: 350,
    filledPrimaryControlBackgroundColorHighlighted: 450,
    filledPrimaryControlBackgroundColorPressed: 125,
    tonedControlColorWeight: 900,
    tonedControlBackgroundColor: 300
  }
}
