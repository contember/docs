import { ColorSchemeProvider } from "@contember/react-utils"
import { Box, Button, Heading, Intent, Scheme, } from "@contember/ui"
import { colorSchemeClassName, contentThemeClassName, controlsThemeClassName, listClassName } from '@contember/utilities'
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

  const colorScheme = colorSchemeClassName(scheme)
  const contentTheme = contentThemeClassName(themeContent ?? theme)
  const controlsTheme = controlsThemeClassName(themeControls ?? theme)

  return (
    <ColorSchemeProvider scheme={scheme}>
      <Box gap="default" className={listClassName(['theming-theme-preview', colorScheme, contentTheme, controlsTheme])}>
        <Heading>{heading}</Heading>
        {(contentTheme || controlsTheme || colorScheme) && <p>CSS classes: {listClassName([colorScheme, contentTheme, controlsTheme])}</p>}
        <Button>Button</Button>
        <Button intent={themeControls ?? theme}>Button with intent</Button>
        <Button distinction="inverse">Inverse button</Button>
        <Button distinction="primary" intent={themeControls ?? theme}>I am important!</Button>
        <Button distinction="toned">Toned button</Button>
        <Button disabled>Disabled</Button>
      </Box>
    </ColorSchemeProvider>
  )
}
