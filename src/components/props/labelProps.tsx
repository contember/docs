import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const label = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="label"
        propType="ReactNode"
        description="The label for the field."
    />
)

export const labelPosition = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="labelPosition"
        propType="FormGroupLabelPosition"
        description=""
    />
)

export const labelDescription = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="labelDescription"
        propType="ReactNode"
        description=""
    />
)

export const useLabelElement = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="useLabelElement"
        propType="boolean"
        description=""
    />
)
