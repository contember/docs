import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const sidebarHeader = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="sidebarHeader"
        propType="ReactNode"
        description="The header of the sidebar usually containing the title of the page."
    />
)

export const sidebarFooter = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="sidebarFooter"
        propType="ReactNode"
        description="The footer of the sidebar usually containing the logout button or user info."
    />
)

export const switchers = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="switchers"
        propType="ReactNode"
        description="The place for switchers in the sidebar. It's right below sidebar header."
    />
)

export const navigation = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="navigation"
        propType="ReactNode"
        description="The place for navigation in the sidebar."
    />
)

export const scheme = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="scheme"
        propType="'system' | 'light' | 'light-above' | 'light-below' | 'dark' | 'dark-above' | 'dark-below'"
        description="The definition of the color scheme of the layout. Contember supports light and dark color schemes. The default is 'system' which means that the color scheme is defined by the operating system."
    />
)

export const theme = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="theme"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the layout. You can read more about the color themes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const themeContent = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="themeContent"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the layout. Content part of the layout can have different color theme. You can read more about the color themes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const themeControls = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="themeControls"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the layout. Controls of the layout can have different color theme. You can read more about the color themes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const pageScheme = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="pageScheme"
        propType="'system' | 'light' | 'light-above' | 'light-below' | 'dark' | 'dark-above' | 'dark-below'"
        description="The definition of the color scheme for page. Contember supports light and dark color schemes. The default is 'system' which means that the color scheme is defined by the operating system."
    />
)

export const pageTheme = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="pageTheme"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the page. You can read more about the color themes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const pageThemeContent = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="pageThemeContent"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the content part of the page. You can read more about the color themes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const pageThemeControls = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="pageThemeControls"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the controls. You can read more about the color themes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const titleScheme = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="titleScheme"
        propType="'system' | 'light' | 'light-above' | 'light-below' | 'dark' | 'dark-above' | 'dark-below'"
        description="The definition of the color scheme for the title. Contember supports light and dark color schemes. The default is 'system' which means that the color scheme is defined by the operating system."
    />
)

export const titleTheme = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="titleTheme"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the title. You can read more about the color schemes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const titleThemeContent = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="titleThemeContent"
        propType="Itent"
        description="Color theme of the title content. You can read more about the color schemes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)

export const titleThemeControls = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="titleThemeControls"
        propType="'default' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'success' | 'warn' | 'danger'"
        description="Color theme of the title controls. You can read more about the color schemes in <a href='/reference/admin/theming/introduction'>theming part</a>."
    />
)
