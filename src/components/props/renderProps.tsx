import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const render = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="render"
        propType={`(<a href="/admin/data-binding/field-accessor" target="_blank">FieldAccessor</a>) => ReactNode`}
        description={`
            A function that is called to render the field.
        `}
    />
)

export const renderOption = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="renderOption"
        propType={`undefined | (<a href="/admin/data-binding/entity-accessor" target="_blank">EntityAccessor</a>) => ReactNode`}
        description={`
            A function that is called to render the option.
        `}
    />
)

export const optionsStaticRender = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="optionsStaticRender"
        propType="undefined | ReactElement"
        description="A function that is called to render static the options."
    />
)
