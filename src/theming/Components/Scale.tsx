import { Stack, StackProps, toStateClass } from '@contember/ui'
import * as React from 'react'
import { Swatch } from '.'
import { COLORS_COUNT } from '../Config'
import { indexToWeight } from '../Helpers'
import { arrayRange } from '../Helpers/arrayRange'

const weights = arrayRange(COLORS_COUNT).map(v => indexToWeight(COLORS_COUNT, v))

export const Scale = ({
  actions,
  children,
  className,
  direction = 'vertical',
  elevated,
  name,
  verbose = false,
}: {
  actions?: React.ReactNode,
  direction?: 'vertical' | 'horizontal',
  elevated?: boolean,
  children?: React.ReactNode,
  name: string,
  verbose?: boolean,
} & Partial<StackProps> ) => <Stack
  gap="none"
  className={[
    'theming-scale',
    `${toStateClass('elevated', elevated)}`,
    className,
  ].join(' ')}
  direction={direction}
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
