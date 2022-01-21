import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const description = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="description"
        propType="ReactNode"
        description="The description for the field."
    />
)
