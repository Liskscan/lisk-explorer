import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ThemeContextProps, ThemeType } from "@Types"
import { isBrowser } from "hooks/fetch"
import themes from "public/themes.json"

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
)

export const useTheme = () => useContext(ThemeContext)
export const ThemeProvider: FC = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>({} as ThemeType)
  const updateProperty = (property: string, newValue: string) => {
    setSelectedTheme({
      ...selectedTheme,
      [property]: newValue,
    })
  }

  const switchTheme = (theme: ThemeType) => {
    setSelectedTheme({ ...theme })
  }

  const getSavedTheme = () => {
    if (!isBrowser) return
    const storedTheme = window.localStorage.getItem("theme")
    const parsedTheme = storedTheme && JSON.parse(storedTheme)
    if (storedTheme) {
      setSelectedTheme(parsedTheme)
    } else {
      setSelectedTheme(themes[5])
    }
  }

  const saveTheme = () =>
    isBrowser &&
    selectedTheme &&
    window.localStorage.setItem("theme", JSON.stringify(selectedTheme))

  const applyTheme = () => {
    if (isBrowser && selectedTheme) {
      window.localStorage.setItem("theme", JSON.stringify(selectedTheme))
      const style = document.documentElement.style
      if (
        selectedTheme?.primary &&
        style.getPropertyValue("--theme-primary") !==
          selectedTheme.primary?.toString()
      ) {
        style.setProperty("--theme-primary", selectedTheme.primary?.toString())
      }
      if (
        selectedTheme?.handle &&
        `liskScan-${selectedTheme.handle}` !== document.body.className
      ) {
        document.body.className = `liskScan-${selectedTheme.handle}`
      }
      saveTheme()
    }
  }

  useEffect(getSavedTheme, [])
  useEffect(applyTheme, [selectedTheme])

  return (
    <ThemeContext.Provider
      value={useMemo(
        () =>
          ({
            themes,
            selectedTheme,
            updateProperty,
            switchTheme,
          } as ThemeContextProps),
        [themes, selectedTheme, updateProperty, switchTheme],
      )}
    >
      <div className={["bg-background items-center", "min-h-screen"].join(" ")}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
