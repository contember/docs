import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const itemsPerPage = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="itemsPerPage"
        propType="Number"
        description='The number of items you want to display on one page. Default is "all of them".'
    />
)