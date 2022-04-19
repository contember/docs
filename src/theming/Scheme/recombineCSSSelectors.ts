function combineArays(a: string[], b: string[]) {
  const result: string[] = []

  a.forEach((aa) => {
    b.forEach((bb) => {
      result.push(aa+bb)
    })
  })

  return result;
}

export function recombineCSSSelectors(...args: (string[])[]) {
  if (args.length === 0) {
    return;
  }

  var result = args.shift() as string[];

  args.forEach((classes) => {
    result = combineArays(result, classes)
  })

  return result.join(",\n")
}
