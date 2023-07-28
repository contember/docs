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
  accent: ['#AFE9FF', '#00AEFF', '#004397'],
  primary: ['#AFE9FF', '#00AEFF', '#004397'],
  secondary: ["#A980FD", "#841DFB", "#54017E"],
  tertiary: ["#EEEDA1", "#DCDA41", "#97961D"],
  positive: ['#AFE9FF', '#00AEFF', '#004397'],
  success: ["#97E6C0", "#4AD18F", "#008B46" /* "#007F40" */],
  warn: ["#F9A986", "#FF4E00" /*"#D94C0F"*/, "#B43E09" /* "#792A06" */],
  danger: ["#FF004C", "#FF4D00", "#FF0000"], //"#FF4827",
  default: ["#FFFFFA", "#FFFFFA", "#FFFFFA"]
})
