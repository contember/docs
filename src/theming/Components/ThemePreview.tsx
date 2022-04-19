import {
  Box,
  Button,
  Heading,
  Intent,
  Scheme,
  toSchemeClass,
  toThemeClass
} from "@contember/ui"
import classNames from "classnames"
import * as React from 'react'

export const ThemePreview = ({
  heading,
  scheme,
  theme,
  themeContent,
  themeControls,
}: {
  heading: string,
  scheme: Scheme,
  theme?: Intent,
  themeContent?: Intent,
  themeControls?: Intent,
}) => {
  const themeClassNames = toThemeClass(themeContent ?? theme, themeContent ?? theme)
  const schemeClassName = toSchemeClass(scheme)

  return <Box gap="default" className={classNames('theming-theme-preview', schemeClassName, themeClassNames)}>
    <Heading>{heading}</Heading>
    {(themeClassNames || schemeClassName) && <p>CSS classes: {classNames(schemeClassName, themeClassNames)}</p>}
    <Button>Button</Button>
    <Button intent={themeControls ?? theme}>Button with intent</Button>
    <Button distinction="toned">Toned button</Button>
    <Button disabled>Disabled</Button>
    <Button
      distinction="primary"
      intent={themeControls ?? theme}
    >I am important!</Button>
  </Box>
}
