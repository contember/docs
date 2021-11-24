import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'
import { Scalar, OptionallyVariableFieldValue, Key, Justification, DataGridOrderDirection } from '../propsType'

export const field = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="field"
        propType="string"
        description={props.description || "The name of the column in Contember schema where to store data."}
    />
)

export const urlField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="urlField"
        propType="string"
        description="The name of the column in Contember schema where to store file url."
    />
)

export const label = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="label"
        propType="ReactNode"
        description="The label for the field."
    />
)

export const description = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="description"
        propType="ReactNode"
        description="The description for the field."
    />
)

export const options = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="options"
        propType={`
            string | 
            { 
                label: ReactNode, value: ${OptionallyVariableFieldValue}, 
                description: ReactNode, 
                searchKeywords: string | undefined 
            }[]
        `}
        description="The options for the field. You can use <a href='/admin/data-binding/query-language' target='_blank'>query language</a> to filter the entities."
    />
)

export const defaultValue = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="defaultValue"
        propType={Scalar}
        description={`The default value of the field.`}
    />
)

export const format = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="format"
        propType={`undefined | (value: ${Scalar} ) => ReactNode`}
        description={`
            A function that formats the value as a ReactNode.
            The function is called with the value as the first argument.
        `}
    />
)

export const isNonbearing = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="isNonbearing"
        propType="undefined | boolean"
        description={`If true, the field is non-bearing.`}
    />
)

export const key = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="key"
        propType={`undefined | ${Key} | null`}
        description={`
            The key of the field.
            If the key is not specified, the key is generated from the field name.
        `}
    />
)

export const onBeforeUpdate = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="onBeforeUpdate"
        propType={`undefined | (value: ${Scalar}) => ${Scalar}`}
        description={`
            A function that is called before the value is updated.
            `}
    />
)

export const onInitialize = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="onInitialize"
        propType={`undefined | (value: ${Scalar}) => ${Scalar}`}
        description={`
            A function that is called when the field is initialized.
        `}
    />
)

export const onUpdate = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="onUpdate"
        propType={`undefined | (value: ${Scalar}) => ${Scalar}`}
        description={`
            A function that is called when the value is updated.
        `}
    />
)

export const about = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="about"
        propType={`undefined | string`}
        description={`
            A description of the field.
            The description is displayed in the tooltip.
        `}
    />
)

export const accessKey = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="accessKey"
        propType={`undefined | string`}
        description={`
            The access key of the field.
        `}
    />
)

export const allowNewlines = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="allowNewlines"
        propType="undefined | boolean"
        description={`
            If true, the field allows newlines.
        `}
    />
)

export const autoCapitalize = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="autoCapitalize"
        propType={`undefined | string`}
        description={`
            The auto-capitalization of the field.
        `}
    />
)

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

export const sortableBy = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="sortableBy"
        propType="undefined | string"
        description={`
            The name of the column in Contember schema that is used to sort the options.
        `}
    />
)

export const orderBy = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="orderBy"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema that is used to order the options.
        `}
    />
)

export const acceptFile = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="acceptFile"
        propType={`undefined | ((options: AcceptFileOptions) => boolean | Promise<unknown>)`}
        description={`
            A function that is called to check if the file is accepted.
        `}
    />
)

export const fileNameField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="fileNameField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file name.
        `}
    />
)

export const fileSizeField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="fileSizeField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file size.
        `}
    />
)

export const fileTypeField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="fileTypeField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file type.
        `}
    />
)

export const enableAddingNew = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="enableAddingNew"
        propType="undefined | boolean = true"
        description={`
            If true, the field allows adding new options.
        `}
    />
)

export const heightField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="heightField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store height.
        `}
    />
)


export const widthField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="widthField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store width.
        `}
    />
)

export const children = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="children"
        propType=""
        description="Renders content of the component."
    />
)

export const className = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="className"
        propType=""
        description="A class name that is applied to the component."
    />
)

export const isLoading = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="isLoading"
        propType="undefined | boolean"
        description="If true, the component has loading state."
    />
)

export const to = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="to"
        propType="undefined | string"
        description="The route to which the user is redirected when the button is clicked."
    />
)

export const href = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="href"
        propType="undefined | string"
        description="The link to which the user is redirected when the button is clicked."
    />
)

export const fallbackIfUnpersisted = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="fallbackIfUnpersisted"
        propType="ReactNode"
        description="A fallback component that is rendered when the component is not persisted."
    />
)

export const entities = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="entities"
        propType="string"
        description="The name of the entity. You can use <a href='/admin/data-binding/query-language' target='_blank'>query language</a> to filter the entities."
    />
)

export const entity = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="entity"
        propType="string"
        description="The name of the entity. You can use <a href='/admin/data-binding/query-language' target='_blank'>query language</a> to filter the entities."
    />
)

export const stateComponent = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="stateComponent"
        propType="JSX.Element | null"
        description={`
            A component that is rendered when the component is in loading state.
        `}
    />
)

export const header = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="header"
        propType="undefined | string"
        description="Column's header"
    />
)

export const shrunk = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="shrunk"
        propType="undefined | boolean"
        description="If true"
    />
)

export const canBeHidden = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="canBeHidden"
        propType="undefined | boolean"
        description="If true, the column can be hidden"
    />
)

export const disableOrder = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="disableOrder"
        propType="undefined | boolean"
        description="If true, the column cannot be ordered"
    />
)

export const headerJustification = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="headerJustification"
        propType={`undefined | ${Justification}`}
        description="The justification of the column header"
    />
)

export const initialOrder = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="initialOrder"
        propType={`undefined | ${DataGridOrderDirection}`}
        description="The initial order of the column"
    />
)

export const name = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="name"
        propType="string"
        description={props.description || "Page name"}
    />
)

export const pageName = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="pageName"
        propType="string"
        description="Page name"
    />
)

export const actions = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="actions"
        propType="ReactNode"
        description={props.description || "Actions"}
    />
)

export const headingProps = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="headingProps"
        propType="undefined | HeadingProps"
        description="Props that are passed to the heading"
    />
)

export const navigation = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="navigation"
        propType="undefined | string"
        description="Navigation"
    />
)

export const heading = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="heading"
        propType="undefined | string"
        description="Heading of the component."
    />
)
