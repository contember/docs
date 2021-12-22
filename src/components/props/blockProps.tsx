import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const alternate = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="alternate"
        propType="ReactNode"
        description=""
    />
)

export const allowBlockTypeChange = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="allowBlockTypeChange"
        propType="boolean"
        description=""
    />
)
