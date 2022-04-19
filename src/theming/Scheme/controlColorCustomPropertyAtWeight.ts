import { PREFIX, WEIGHT_MAXIMUM } from "../Config"

export function controlColorCustomPropertyAtWeight(weight: number, opacity: number = 1) {
  return opacity === 1
    ? `rgb(var(--${PREFIX}-controls-${Math.min(WEIGHT_MAXIMUM, Math.max(0, weight))}))`
    : `rgba(var(--${PREFIX}-controls-${Math.min(WEIGHT_MAXIMUM, Math.max(0, weight))}), ${opacity.toPrecision(3)})`
}
