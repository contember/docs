import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const size = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="size"
        propType="Size"
        description=""
    />
)

export const autoFocus = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="autoFocus"
        propType="boolean"
        description="Whether the field should be focused on mount. The last field with autoFocus property set to true will be focused, If there are multiple ones."
    />
)

export const field = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="field"
        propType="string"
        description={props.description || "The name of the column in Contember schema where to store data."}
    />
)



export const options = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="options"
        propType={`
            string |
            {
                label: ReactNode, value: OptionallyVariableFieldValue,
                description: ReactNode,
                searchKeywords: string | undefined
            }[]
        `}
        description="The options for the field. You can use <a href='/reference/admin/data-binding/query-language' target='_blank'>query language</a> to filter the entities."
    />
)

export const defaultValue = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="defaultValue"
        propType={`Scalar`}
        description={`The default value of the field.`}
    />
)

export const format = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="format"
        propType={`undefined | (value: Scalar ) => ReactNode`}
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
        propType={`undefined | Key | null`}
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
        propType={`undefined | (value: Scala}) => Scalar`}
        description={`
            A function that is called before the value is updated.
            `}
    />
)

export const onInitialize = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="onInitialize"
        propType={`undefined | (value: Scalar) => Scalar`}
        description={`
            A function that is called when the field is initialized.
        `}
    />
)

export const onUpdate = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="onUpdate"
        propType={`undefined | (value: Scalar) => Scalar`}
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
            The access key of the field used to setup keyboard shortcut for the field. More info: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey" target="_blank">MDN Access Key</a>
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
        description="The name of the entity. You can use <a href='/reference/admin/data-binding/query-language' target='_blank'>query language (Qualified entity list)</a> to filter the entities."
    />
)

export const entity = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="entity"
        propType="string"
        description="The name of the entity. You can use <a href='/reference/admin/data-binding/query-language' target='_blank'>query language</a> to filter the entities."
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
        description="If true column will try to be as narrow as possible given rendered data in the column."
    />
)

export const canBeHidden = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="canBeHidden"
        propType="undefined | boolean"
        description="If false, the column can not be hidden. It is true by default."
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
        propType={`undefined | Justification`}
        description="The justification of the column header"
    />
)

export const initialOrder = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="initialOrder"
        propType={`undefined | DataGridOrderDirection`}
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

export const addButtonText = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="addButtonText"
        propType="undefined | string"
        description=""
    />
)
