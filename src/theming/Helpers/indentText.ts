export function indentText(text: string, indentation: number = 1, whiteSpace: string = "\t") {
  return text.split("\n").map(line => whiteSpace.repeat(indentation) + line).join("\n")
}