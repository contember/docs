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
  primary: ["#00E1FF", "#0062FF", "#000067"], // "#15009C", 1F00B0 000067
  secondary: ["#3DA9EB", "#3DA9EB", "#3DA9EB"],
  tertiary: ["#AE65FF", "#AE65FF", "#AE65FF"],
  positive: ["#006AFF", "#006AFF", "#006AFF"], // "#4390FF",
  success: ["#6EBB00", "#6EBB00", "#6EBB00"],
  warn: ["#FF6600", "#FF6600", "#FF6600"], //"#EC9117",
  danger: ["#FF004C", "#FF4D00", "#FF0000"], //"#FF4827",
  default: ["#8494A4", "#8494A4", "#8494A4"]
})
