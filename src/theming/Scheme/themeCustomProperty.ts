export function themeCustomProperty({ name, prefix, weight, property = 'theme' }: { name?: string, prefix: string, weight: string, property?: string }) {
  return `--${prefix}-${property}-${name ? `${name}-` : ''}${weight}`
}
