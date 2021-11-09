import React from 'react';
import { PropsTableRow } from './propsTable.jsx'
import { Scalar, OptionallyVariableFieldValue } from './propsType.jsx';

export const label = (
    <PropsTableRow
        prop="label"
        propType="ReactNode"
        description="The label for the field."
    />
)

export const field = (
    <PropsTableRow
        prop="field"
        propType="string"
        description="The name of the column in Contember schema."
    />
)

export const options = (
    <PropsTableRow
        prop="options"
        propType={`string | { label: ReactNode, value: ${OptionallyVariableFieldValue}, description: ReactNode, searchKeywords: string | undefined }[]`}
    />
)

export const defaultValue = (
    <PropsTableRow
        prop="defaultValue"
        propType={Scalar}
        description={`The default value of the field.`}
    />
)

export const format = (
    <PropsTableRow
        prop="format"
        propType={`undefined | ((value: ${Scalar} ) => ReactNode)`}
        description={`
            A function that formats the value as a ReactNode.
            The function is called with the value as the first argument.`}
    />
)
