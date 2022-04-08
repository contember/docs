import * as React from 'react'

export const Swatch = ({
  children,
  property,
  verbose,
  weight,
}: {
  children?: React.ReactNode,
  property: string,
  verbose?: boolean,
  weight: number,
}) => <span className="theming-swatch theming-swatch-container" style={{
  backgroundColor: `rgb(var(${property}))`,
  color: typeof weight === 'number' ? weight <=  500 ? 'white' : 'black' : undefined,
}}>{verbose ? property : children}</span>
