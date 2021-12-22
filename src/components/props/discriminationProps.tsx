import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const discriminationField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="discriminationField"
        propType="string | SugaredRelativeSingleField"
        description=""
    />
)
