import {
  Box,
  Button,
  Heading,
  Intent,
  Scheme,
  toThemeClass
} from "@contember/ui"
import * as React from 'react'

export const Preview = ({
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
}) => <Box
  gap="default"
  className={[
    `scheme-${scheme}`,
    toThemeClass(themeContent ?? theme, themeContent ?? theme)
  ].join(' ')}
>
  <Heading>{heading}</Heading>
  <Button onClick={React.useCallback(() => { alert('Hi!') }, [])}>Click me!</Button>
  <Button disabled onClick={React.useCallback(() => { alert('Hi!') }, [])}>Disabled</Button>
  <Button
    distinction="primary"
    onClick={React.useCallback(() => { alert('Hi!') }, [])}
    intent={themeControls ?? theme}
  >I am important!</Button>
</Box>
