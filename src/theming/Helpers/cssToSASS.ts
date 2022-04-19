export function cssToSASS(css: string) {
  return css.replace(/;/g, "").replace(/\{/g, "").replace(/\}/g, "").trim()
}
