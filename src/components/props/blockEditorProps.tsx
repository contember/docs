import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const contentField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="contentField"
        propType="string"
        description="Field name of the content."
    />
)

export const referencesField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="referencesField"
        propType="undefined | string | SugaredRelativeEntityList"
        description="Field name of the references."
    />
)

export const referenceDiscriminationField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="referenceDiscriminationField"
        propType="undefined | string | SugaredRelativeSingleField"
        description="Field name of the reference discrimination."
    />
)

export const inlineButtons = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="inlineButtons"
        propType="undefined | ToolbarButtonSpec[] | ToolbarButtonSpec[][]"
        description="Buttons to be displayed in the inline toolbar."
    />
)

export const blockButtons = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="blockButtons"
        propType="undefined | BlockHoveringToolbarConfig[] | BlockHoveringToolbarConfig[][] |"
        description="Buttons to be displayed in the block toolbar."
    />
)

export const augmentEditor = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="augmentEditor"
        propType="undefined | ((baseEditor: BaseEditor) => BaseEditor)"
        description="Function to be called when the editor is created."
    />
)

export const discriminateBy = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="discriminateBy"
        propType="OptionallyVariableFieldValue"
        description="Field to discriminate by."
    />
)
