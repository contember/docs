import React from 'react';
import { PropsTableRow } from './propsTable.jsx'
import { Scalar, OptionallyVariableFieldValue } from './propsType.jsx';

export const field = ({required}) => (
    <PropsTableRow
        prop="field"
        propType="string"
        description="The name of the column in Contember schema where to store data."
        required={required}
    />
)

export const urlField = ({required}) => (
    <PropsTableRow
        prop="urlField"
        propType="string"
        description="The name of the column in Contember schema where to store file url."
        required={required}
    />
)

export const label = ({required}) => (
    <PropsTableRow
        prop="label"
        propType="ReactNode"
        description="The label for the field."
        required={required}
    />
)

export const description = ({required}) => (
    <PropsTableRow
        prop="description"
        propType="ReactNode"
        description="The description for the field."
        required={required}
    />
)

export const options = ({required}) => (
    <PropsTableRow
        prop="options"
        propType={`
            string | 
            { 
                label: ReactNode, value: ${OptionallyVariableFieldValue}, 
                description: ReactNode, 
                searchKeywords: string | undefined 
            }[]
        `}
        required={required}
    />
)

export const defaultValue = ({required}) => (
    <PropsTableRow
        prop="defaultValue"
        propType={Scalar}
        description={`The default value of the field.`}
        required={required}
    />
)

export const format = ({required}) => (
    <PropsTableRow
        prop="format"
        propType={`undefined | (value: ${Scalar} ) => ReactNode`}
        description={`
            A function that formats the value as a ReactNode.
            The function is called with the value as the first argument.
        `}
        required={required}
    />
)

export const isNonbearing = ({required}) => (
    <PropsTableRow
        prop="isNonbearing"
        propType="undefined | boolean"
        description={`If true, the field is non-bearing.`}
        required={required}
    />
)

export const key = ({required}) => (
    <PropsTableRow
        prop="key"
        propType="undefined | React.key | null"
        description={`
            The key of the field.
            If the key is not specified, the key is generated from the field name.
        `}
        required={required}
    />
)

export const onBeforeUpdate = ({required}) => (
    <PropsTableRow
        prop="onBeforeUpdate"
        propType={`undefined | (value: ${Scalar}) => ${Scalar}`}
        description={`
            A function that is called before the value is updated.
            `}
        required={required}
    />
)

export const onInitialize = ({required}) => (
    <PropsTableRow
        prop="onInitialize"
        propType={`undefined | (value: ${Scalar}) => ${Scalar}`}
        description={`
            A function that is called when the field is initialized.
        `}
        required={required}
    />
)

export const onUpdate = ({required}) => (
    <PropsTableRow
        prop="onUpdate"
        propType={`undefined | (value: ${Scalar}) => ${Scalar}`}
        description={`
            A function that is called when the value is updated.
        `}
        required={required}
    />
)

export const about = ({required}) => (
    <PropsTableRow
        prop="about"
        propType={`undefined | string`}
        description={`
            A description of the field.
            The description is displayed in the tooltip.
        `}
        required={required}
    />
)

export const accessKey = ({required}) => (
    <PropsTableRow
        prop="accessKey"
        propType={`undefined | string`}
        description={`
            The access key of the field.
        `}
        required={required}
    />
)

export const allowNewlines = ({required}) => (
    <PropsTableRow
        prop="allowNewlines"
        propType="undefined | boolean"
        description={`
            If true, the field allows newlines.
        `}
        required={required}
    />
)

export const autoCapitalize = ({required}) => (
    <PropsTableRow
        prop="autoCapitalize"
        propType={`undefined | string`}
        description={`
            The auto-capitalization of the field.
        `}
        required={required}
    />
)

export const renderOption = ({required}) => (
    <PropsTableRow
        prop="renderOption"
        propType={`undefined | (entityAccessor: EntityAccessor) => React.ReactNode`}
        description={`
            A function that is called to render the option.
        `}
        required={required}
    />
)

export const optionsStaticRender = ({required}) => (
    <PropsTableRow
        prop="optionsStaticRender"
        propType={`undefined | ReactElement<any, string | JSXElementConstructor<any>> | ((environment: Environment) => ReactElement<any, string | JSXElementConstructor<any>>)`}
        description={`
            A function that is called to render static the options.
        `}
        required={required}
    />
)

export const sortableBy = ({required}) => (
    <PropsTableRow
        prop="sortableBy"
        propType="undefined | string"
        description={`
            The name of the column in Contember schema that is used to sort the options.
        `}
        required={required}
    />
)

export const orderBy = ({required}) => (
    <PropsTableRow
        prop="orderBy"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema that is used to order the options.
        `}
        required={required}
    />
)

export const acceptFile = ({required}) => (
    <PropsTableRow
        prop="acceptFile"
        propType={`undefined | ((options: AcceptFileOptions) => boolean | Promise<unknown>)`}
        description={`
            A function that is called to check if the file is accepted.
        `}
        required={required}
    />
)

export const fileNameField = ({required}) => (
    <PropsTableRow
        prop="fileNameField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file name.
        `}
        required={required}
    />
)

export const fileSizeField = ({required}) => (
    <PropsTableRow
        prop="fileSizeField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file size.
        `}
        required={required}
    />
)

export const fileTypeField = ({required}) => (
    <PropsTableRow
        prop="fileTypeField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file type.
        `}
        required={required}
    />
)

export const enableAddingNew = ({required}) => (
    <PropsTableRow
        prop="enableAddingNew"
        propType="undefined | boolean = true"
        description={`
            If true, the field allows adding new options.
        `}
        required={required}
    />
)

export const heightField = ({required}) => (
    <PropsTableRow
        prop="heightField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store height.
        `}
        required={required}
    />
)


export const widthField = ({required}) => (
    <PropsTableRow
        prop="widthField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store width.
        `}
        required={required}
    />
)

export const inlineButtons = ({required}) => (
    <PropsTableRow
        prop="inlineButtons"
        propType={`undefined | ToolbarButtonSpec[] | ToolbarButtonSpec[][]`}
        description={`
            A list of inline buttons.
        `}
        required={required}
        />
)
        