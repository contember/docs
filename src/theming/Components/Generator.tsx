import {
  Button,
  Checkbox,
  FieldContainer,
  Icon,
  Spacer,
  Stack,
  StyleProvider,
  toStateClass,
} from '@contember/ui'
import * as React from 'react'
import {
  CONTEMBER_THEMES,
  PREFIX,
  ThemeName,
  WHITE_SPACE
} from "../Config"
import { copyTextToClipboard, indentText } from "../Helpers"
import { scaleGradient, scaleToCSSProperties, scaleToColorWeightMap } from "../Scale"
import { ColorInput } from './ColorInput'
import { Scale } from "./Scale"

function useDebouncedState<S>(initialState: S | (() => S), timeout: number = 300) {
  const [state, setState] = React.useState(initialState)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const setDebouncedState: React.Dispatch<React.SetStateAction<S>> = React.useCallback((newState: S | ((prevState: S) => S)) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setState(newState)
    }, timeout)
  }, [])

  return [state, setDebouncedState, setState] as const
}

type ThemeChangeCallback = (name: ThemeName, colors: [string, string, string] | null) => void

function useColorInputProps(name: ThemeName, colors: [string, string, string], onChange: ThemeChangeCallback) {
  const initial = React.useRef(colors)

  const [lightHex, setLightHex, setLightHexImmediately] = useDebouncedState(colors[0], 100)
  const [middleHex, setMiddleHex, setMiddleHexImmediately] = useDebouncedState(colors[1], 100)
  const [hex, setHex, setHexImmediately] = useDebouncedState(colors[2], 100)

  React.useEffect(() => {
    const [initialLightHex, initialMiddleHex, initialHex] = initial.current
    const similarWithInitial =
      initialLightHex === lightHex
      && initialMiddleHex === middleHex
      && initialHex === hex

    onChange(
      name,
      similarWithInitial ? null : [lightHex, middleHex, hex],
    )
  }, [
    lightHex,
    middleHex,
    hex,
  ])

  const onReset = React.useCallback(() => {
    setLightHexImmediately(colors[0])
    setMiddleHexImmediately(colors[1])
    setHexImmediately(colors[2])
  }, [])

  return React.useMemo(() => ({
    hex,
    lightHex,
    middleHex,
    onReset,
    setHex,
    setLightHex,
    setMiddleHex,
  }), [
    hex,
    lightHex,
    middleHex,
  ])
}

const Theme = ({
  colors,
  dirty,
  editing,
  name,
  onChange,
  onEditFactory,
  verbose,
}: {
  colors: [string, string, string],
  dirty: boolean,
  editing?: boolean,
  name: ThemeName,
  onChange: ThemeChangeCallback,
    onEditFactory: (name: ThemeName | null) => () => void,
    verbose: boolean,
}) => {
  const { onReset, ...colorInputProps } = useColorInputProps(name, colors, onChange)
  const onEdit = React.useCallback(onEditFactory(name), [name])
  const onClose = React.useCallback(onEditFactory(null), [name])

  return (
    <Scale
      actions={<>
        {editing && <Button
          distinction="seamless"
          flow="circular"
          size="small"
          onClick={onReset}
          intent="default"
          bland
        >
          <Icon blueprintIcon={"undo"} />
        </Button>}
        <Button
          distinction="seamless"
          flow="circular"
          size="small"
          onClick={editing ? onClose : onEdit}
          intent="default"
          bland
        >
          <Icon blueprintIcon={editing ? "cross" : "edit"} />
        </Button>
      </>}
      elevated
      verbose={verbose}
      name={name}
      className={toStateClass('dirty', dirty)}
    >
      {editing && (
        <ColorInput
          {...colorInputProps}
        />
      )}
    </Scale>
  )
}

type DirtyThemesMap = { [Property in ThemeName]: boolean }

const ThemeEditor = React.memo(({
  dirty,
  themeEntries,
  onThemesChange,
  verbose,
}: {
  dirty: DirtyThemesMap,
  themeEntries: ThemeEntries,
  onThemesChange: ThemeChangeCallback,
    verbose: boolean,
}) => {
  const [editingTheme, setEditingTheme] = React.useState<ThemeName | null>(null)
  const onEditFactory = React.useCallback((name: ThemeName | null) => () => {
    setEditingTheme(name)
  }, [])

  return <div className="theming-generator-editor-scroll-wrapper">
    <Stack
      evenly
      horizontal
      className="theming-generator-editor"
    >
      {themeEntries.map(([name, colors]) => (
        <Theme
          dirty={dirty[name]}
          key={name}
          editing={editingTheme === name}
          name={name}
          colors={colors}
          onEditFactory={onEditFactory}
          onChange={onThemesChange}
          verbose={verbose}
        />
      ))}
    </Stack>
  </div>
})
ThemeEditor.displayName = 'ThemeEditor'

type ThemeEntries = [ThemeName, [string, string, string]][]

function themeEntriesToCSS(themeEntries: ThemeEntries) {
  return `:where(.cui-root) {\n${themeEntries
    .map(
      ([name, [lightHex, middleHex, hex]]) =>
        `${WHITE_SPACE}/* ${name}: [${lightHex}, ${middleHex}, ${hex}] */\n${indentText(
          scaleToCSSProperties(
            `${PREFIX}-theme-${name}-rgb`,
            scaleToColorWeightMap(scaleGradient(lightHex, middleHex, hex))
          ).reverse().join(`;\n`)
        )};\n`
    )
    .join("\n")}}\n`
}

export const Generator = React.memo(() => {
  const [verbose, setVerbose] = React.useState(false)
  const [themes, setThemes] = React.useState(CONTEMBER_THEMES)
  const themeEntries = React.useMemo(() => Object.entries(themes) as ThemeEntries, [themes])

  const dirtyThemes = React.useRef<DirtyThemesMap>({
    primary: false,
    secondary: false,
    tertiary: false,
    positive: false,
    success: false,
    warn: false,
    danger: false,
    default: false,
  })

  const onThemesChange = React.useCallback<ThemeChangeCallback>((name, colors) => {
    const nextThemes = { ...themes }

    if (Array.isArray(colors)) {
      nextThemes[name] = colors
    } else {
      nextThemes[name] = CONTEMBER_THEMES[name]
    }

    const themeIsDirty = nextThemes[name][0] !== CONTEMBER_THEMES[name][0]
      || nextThemes[name][1] !== CONTEMBER_THEMES[name][1]
      || nextThemes[name][2] !== CONTEMBER_THEMES[name][2]

    dirtyThemes.current[name] = themeIsDirty

    setThemes(nextThemes)
  }, [themes])

  const changedThemeEntries = React.useMemo(() => themeEntries.filter(([name]) => dirtyThemes.current[name]), [themeEntries])

  const allCSSResult = themeEntriesToCSS(themeEntries)

  const cssResult = changedThemeEntries.length === 0
    ? '/* Edit theme colors to see changes */'
    : themeEntriesToCSS(changedThemeEntries)

  const copyCSSToClipboard = React.useCallback(async () => {
    await copyTextToClipboard(cssResult);
  }, [cssResult])

  const copyAllCSSToClipboard = React.useCallback(async () => {
    await copyTextToClipboard(allCSSResult);
  }, [allCSSResult])
  return (
    <StyleProvider>
      <Stack className="theming-generator">
        <Stack align="center" direction="horizontal" className="sm:flex-wrap">
          <Button className="sm:flex-grow" disabled={changedThemeEntries.length === 0} distinction="primary" onClick={copyCSSToClipboard}>Copy CSS</Button>
          {verbose && <Button distinction="outlined" onClick={copyAllCSSToClipboard}>Copy All CSS</Button>}
          {changedThemeEntries.length === 0 && <span className="theming-generator-hint">Edit the colors to copy CSS first</span>}
          <Spacer className="flex-grow" />
          <FieldContainer label="Verbose" labelPosition="labelInlineRight">
            <Checkbox notNull value={verbose} onChange={it => setVerbose(!!it)} />
          </FieldContainer>
        </Stack>
        <ThemeEditor
          dirty={dirtyThemes.current}
          themeEntries={themeEntries}
          onThemesChange={onThemesChange}
          verbose={verbose}
        />
        {verbose && <div className="is-visible-style">{cssResult}</div>}
        <style>{allCSSResult}</style>
      </Stack>
    </StyleProvider>
  )
})
Generator.displayName = 'Generator'
