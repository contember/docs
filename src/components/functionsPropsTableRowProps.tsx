import React from 'react'
import { PropsTableRow } from './propsTable'

export const value = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.value` : `value`}
        description={`
            Current value of the field.
        `}
        required={required}
        readOnly={readOnly}
    />
)

export const defaultValue = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.defaultValue` : `defaultValue`}
        description={`Get default value of the field.`}
        required={required}
        readOnly={readOnly}
    />
)

export const fieldName = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.fieldName` : `fieldName`}
        description={`Get name of the field.`}
        required={required}
        readOnly={readOnly}
    />
)

export const getAccessor = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.getAccessor()` : `getAccessor()`}
        description={`
            A function that returns the accessor of the field.
        `}
        required={required}
        readOnly={readOnly}
    />
)

export const hasValue = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.hasValue` : `hasValue`}
        description={`
            This is a method that checks if current value is same as given.
        `}
        required={required}
        readOnly={readOnly}
    />
)

export const hasUnpersistedChanges = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.hasUnpersistedChanges` : `hasUnpersistedChanges`}
        description={`
            Boolean that indicates if the field has changes which are not yet persisted to server.
        `}
        required={required}
        readOnly={readOnly}
    />
)

export const errors = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.errors` : `errors`}
        description={`
            ErrorAccessor.
        `}
        required={required}
        readOnly={readOnly}
    />
)

export const valueOnServer = ({ prefix, required, readOnly }) => (
    <PropsTableRow
        prop={prefix ? `${prefix}.valueOnServer` : `valueOnServer`}
        description={`
            Get value of the field on server.
        `}
        required={required}
        readOnly={readOnly}
    />
)
