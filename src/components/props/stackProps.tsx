import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const direction = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="direction"
        propType="'vertical' | 'horizontal' | 'vertical-reverse' | 'horizontal-reverse'"
        description="The header of the sidebar usually containing the title of the page."
    />
)

// align?: 'center' | 'stretch' | 'start' | 'end',
// basis?: CSSProperties['flexBasis'],
// children?: ReactNode,
// evenly?: boolean,
// gap?: Size | 'xlarge' | 'none',
// grow?: boolean | CSSProperties['flexGrow'],
// justify?:
//     | 'center'
//     | 'start'
//     | 'end'
//     | 'space-between'
//     | 'space-around'
//     | 'space-evenly'
//     | 'stretch'
//     | 'inherit'
//     | 'initial'
//     | 'revert'
// shrink?: boolean | CSSProperties['flexShrink'],
// wrap?: boolean | 'reverse',
