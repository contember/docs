import * as React from 'react'
import { Stack, StackProps, toStateClass } from '@contember/ui'
import { Swatch } from './Swatch'
import { COLORS_COUNT } from '../Config'
import { indexToWeight } from '../Helpers'
import { arrayRange } from '../Helpers/arrayRange'
import { useColorMode } from '@docusaurus/theme-common'

type SlaceProps = {
  actions?: React.ReactNode,
  direction?: 'vertical' | 'horizontal',
  elevated?: boolean,
  children?: React.ReactNode,
  name: string,
  verbose?: boolean,
} & Partial<StackProps>

const weights = arrayRange(COLORS_COUNT).map(v => indexToWeight(COLORS_COUNT, v))

export const Scale = ({ actions, children, className, elevated, name, direction = 'vertical', verbose = false }: SlaceProps) => {
  const { colorMode } = useColorMode()

  return (
    <Stack
      gap="none"
      direction={direction}
      className={`theming-scale ${toStateClass('elevated', elevated)} ${className || ''} scheme-${colorMode === 'dark' ? 'dark' : 'light'}`}
    >
      <Stack justify="space-between" direction="horizontal" className="theming-scale-label">
        <span className="theming-scale-label-theme-name">{name} theme</span>
        {actions}
      </Stack>
      {children}
      <Stack
        gap="none"
        direction={direction}
        className="theming-scale-list"
      >
        {weights.map(weight => <Swatch
          property={`--cui-theme-${name}-${weight}`}
          weight={weight}
        >
          {verbose ? <small>{weight}</small> : null}
        </Swatch>)}
      </Stack>
    </Stack>
  )
}
