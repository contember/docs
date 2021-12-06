import React from 'react'
import { PropsTableRow } from './propsTable'

export const equals = () => (
    <PropsTableRow
        prop="="
        description="Equals to."
    />
)

export const notEquals = () => (
    <PropsTableRow
        prop="!="
        description="Not equals to."
    />
)

export const lessThan = () => (
    <PropsTableRow
        prop="<"
        description="Less than."
    />
)

export const greaterThan = () => (
    <PropsTableRow
        prop=">"
        description="Greater than."
    />
)

export const lessThanOrEquals = () => (
    <PropsTableRow
        prop="<="
        description="Less than or equals."
    />
)

export const greaterThanOrEquals = () => (
    <PropsTableRow
        prop=">="
        description="Greater than or equals."
    />
)

export const asc = () => (
    <PropsTableRow
        prop="asc"
        description="Sort by given field from largest to smallest."
    />
)

export const desc = () => (
    <PropsTableRow
        prop="desc"
        description="Sort by given field from smallest to largest."
    />
)
