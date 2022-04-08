import { Button, Icon, Stack } from "@contember/admin"
import chroma from "chroma-js"
import * as React from "react"

const ColorComboInput = React.memo(({
  onChange,
  ...props
}: {
  hex: string,
  onChange: (hex: string) => void,
}) => {
  const hex = props.hex.toUpperCase()
  const color = chroma(hex)
  const fullHex = color.hex().toUpperCase()

  const textInputRef = React.useRef<HTMLInputElement>()
  const colorInputRef = React.useRef<HTMLInputElement>()

  React.useEffect(() => {
    if (!textInputRef.current || typeof textInputRef.current !== "object") {
      return
    }

    textInputRef.current.value = hex
  }, [hex])

  React.useEffect(() => {
    if (!colorInputRef.current || typeof colorInputRef.current !== "object") {
      return
    }

    colorInputRef.current.value = fullHex
  }, [fullHex])

  return (
    <Stack direction="horizontal" gap="none">
      <input
        ref={colorInputRef}
        className="theming-color-input-color"
        key={`color-input-color`}
        // id={`color-input-color`}
        type="color"
        defaultValue={color.hex()}
        onChange={React.useCallback(
          (event) => {
            onChange(event.target.value)
          },
          [onChange]
        )}
      />
      <input
        ref={textInputRef}
        className="theming-color-input-text"
        key={`color-input-color-text`}
        // id={`color-input-color-text`}
        type="text"
        defaultValue={color.hex()}
        onBlur={React.useCallback(
          (event) => {
            event.target.value = fullHex
          },
          [fullHex]
        )}
        onChange={React.useCallback(
          (event: React.ChangeEvent<HTMLInputElement>) => {
            const nextColor = event.target.value

            if (
              nextColor
                .toLowerCase()
                .trim()
                .match(/^#(?:[\da-f]{3}|[\da-f]{6})$/)
            ) {
              onChange(nextColor)
            }
          },
          [onChange]
        )}
      />
    </Stack>
  )
})
ColorComboInput.displayName = 'ColorComboInput'

export const ColorInput = React.memo(
  ({
    hex: _hex,
    lightHex: _lightHex,
    middleHex: _middleHex,
    setHex,
    setLightHex,
    setMiddleHex,
  }: {
    hex: string,
    lightHex: string,
    middleHex: string,
    setHex: (hex: string) => void,
    setLightHex: (hex: string) => void,
    setMiddleHex: (hex: string) => void,
  }) => {
    const hex = _hex.toUpperCase()
    const lightHex = _lightHex.toUpperCase()
    const middleHex = _middleHex.toUpperCase()

    const [linked, setLinked] = React.useState<boolean>(hex === lightHex && hex === middleHex)
    const unlink = React.useCallback(() => {
      setLinked(false)
    }, [])
    const linkLightHex = React.useCallback(() => {
      setLinked(true)
      setLightHex(lightHex)
      setMiddleHex(lightHex)
      setHex(lightHex)
    }, [lightHex])
    const linkMiddleHex = React.useCallback(() => {
      setLinked(true)
      setLightHex(middleHex)
      setMiddleHex(middleHex)
      setHex(middleHex)
    }, [middleHex])
    const linkHex = React.useCallback(() => {
      setLinked(true)
      setLightHex(hex)
      setMiddleHex(hex)
      setHex(hex)
    }, [hex])

    const setAll = React.useCallback((value: string) => {
      setLightHex(value)
      setMiddleHex(value)
      setHex(value)
    }, [])

    React.useEffect(() => {
      setLinked(hex === lightHex && hex === middleHex)
    }, [
      hex,
      lightHex,
      middleHex,
    ])

    return (
      <Stack className="theming-color-input" direction="horizontal" gap="none">
        <Stack className="theming-color-input-fields" direction="vertical">
          <ColorComboInput hex={lightHex} onChange={linked ? setAll : setLightHex} />
          <ColorComboInput hex={middleHex} onChange={linked ? setAll : setMiddleHex} />
          <ColorComboInput hex={hex} onChange={linked ? setAll : setHex} />
        </Stack>

        {linked
          ? <Button
            className="theming-color-input-unlink-button"
            intent="default"
            distinction="seamless"
            size="small"
            onClick={unlink}
          >
            <Icon blueprintIcon="lock" />
          </Button>
        : <Stack direction="vertical" gap="none">
            <Button
              bland
              className="theming-color-input-link-button"
              intent="default"
              distinction="seamless"
              flow="circular"
              size="small"
              onClick={linkLightHex}
            >
              <Icon blueprintIcon="unlock" />
            </Button>
            <Button
              bland
              className="theming-color-input-link-button"
              intent="default"
              distinction="seamless"
              flow="circular"
              size="small"
              onClick={linkMiddleHex}
            >
              <Icon blueprintIcon="unlock" />
            </Button>
            <Button
              bland
              className="theming-color-input-link-button"
              intent="default"
              distinction="seamless"
              flow="circular"
              size="small"
              onClick={linkHex}
            >
              <Icon blueprintIcon="unlock" />
            </Button>
          </Stack>
      }
      </Stack>
    )
  }
)
ColorInput.displayName = 'ColorInput'
