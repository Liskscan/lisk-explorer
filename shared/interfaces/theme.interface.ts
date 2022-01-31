export interface ThemeType {
  bg: { h?: number; s: number; l: number }
  handle: string
  name: string
  primary: number
  secondary: number
  type: string
}

export interface ThemeContextProps {
  themes: ThemeType[]
  selectedTheme: ThemeType

  updateProperty(property: string, newValue: string | number): void

  switchTheme(themeHandle: ThemeType): void
}
