export function cssToSASS(css: string) {
  return css.replace(/[;{}]/g, "").trim()
}
