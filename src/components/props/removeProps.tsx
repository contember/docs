import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const enableRemoving = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="enableRemoving"
        propType="boolean"
        description=""
    />
)

export const removalType = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="enableRemoving"
        propType="undefined | RemovelType"
        description=""
    />
)
