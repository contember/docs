export function rangeOfNumbers(start: number, end: number, step: number = 1) {
  const direction = start > end ? -1 : 1
  const directionStep = Math.abs(step) * direction
  const length = Math.floor(((end - start) / directionStep)) + 1

  return Array.from({ length }, (_, index) => start + (directionStep * index))
}
