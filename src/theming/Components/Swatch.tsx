import * as React from 'react'

type SwatchProps = {
  children?: React.ReactNode,
  property: string,
  verbose?: boolean,
  weight: number,
  className?: string,
}

export const Swatch = ({ children, property, verbose, weight }: SwatchProps) => (
  <span
    className={`theming-swatch theming-swatch-container`}
    style={{
      backgroundColor: `rgb(var(${property}))`,
      color: typeof weight === 'number' ? weight <= 500 ? 'white' : 'black' : undefined,
    }}
  >
    {verbose ? property : children}
  </span>
)
