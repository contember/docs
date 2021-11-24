import React from 'react';
import { PropsTableRow } from '../propsTable'

export const contentField = ({required}) => (
    <PropsTableRow
        prop="contentField"
        propType="string"
        description="Field name of the content."
        required={required}
    />
)

export const referencesField = ({required}) => (
    <PropsTableRow
        prop="referencesField"
        propType="undefined | string | SugaredRelativeEntityList"
        description="Field name of the references."
        required={required}
    />
)

export const referenceDiscriminationField = ({required}) => (
    <PropsTableRow
        prop="referenceDiscriminationField"
        propType="undefined | string | SugaredRelativeSingleField"
        description="Field name of the reference discrimination."
        required={required}
    />
)

export const inlineButtons = ({required}) => (
    <PropsTableRow
        prop="inlineButtons"
        propType="undefined | ToolbarButtonSpec[] | ToolbarButtonSpec[][]"
        description="Buttons to be displayed in the inline toolbar."
        required={required}
    />
)

export const blockButtons = ({required}) => (
    <PropsTableRow
        prop="blockButtons"
        propType="undefined | BlockHoveringToolbarConfig[] | BlockHoveringToolbarConfig[][] |"
        description="Buttons to be displayed in the block toolbar."
        required={required}
    />
)

export const augmentEditor = ({required}) => (
    <PropsTableRow
        prop="augmentEditor"
        propType="undefined | ((baseEditor: BaseEditor) => BaseEditor)"
        description="Function to be called when the editor is created."
        required={required}
    />
)

export const discriminateBy = ({required}) => (
    <PropsTableRow
        prop="discriminateBy"
        propType="OptionallyVariableFieldValue"
        description="Field to discriminate by."
        required={required}
    />
)
