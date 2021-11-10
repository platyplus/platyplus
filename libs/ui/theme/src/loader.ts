import { createGlobalState } from 'react-use'
import '!style-loader?{"attributes":{"id":"theme"}}!css-loader!less-loader?{"lessOptions":{"javascriptEnabled":true}}!./dark.less'
import '!style-loader?{"attributes":{"id":"theme"}}!css-loader!less-loader?{"lessOptions":{"javascriptEnabled":true}}!./light.less'

type Theme = 'light' | 'dark'

const LOCALSTORAGE_KEY = 'theme'

export const themes: Record<string, HTMLElement> = {}
themes.dark = document.getElementById('theme')
themes.dark.parentElement.removeChild(themes.dark)
themes.light = document.getElementById('theme')
themes.light.parentElement.removeChild(themes.light)

const storedTheme = localStorage.getItem(LOCALSTORAGE_KEY) as Theme

const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)')
  .matches
  ? 'dark'
  : 'light'

const defaultTheme: Theme = storedTheme || systemTheme

export const switchTheme = (theme: Theme) => {
  try {
    const rem = document.getElementById('theme')
    rem.parentElement.removeChild(rem)
    // eslint-disable-next-line no-empty
  } catch (e) {}
  document.head.appendChild(themes[theme])
}

switchTheme(defaultTheme)

const useGlobalValue = createGlobalState<Theme>(defaultTheme)

export const useTheme = (): [Theme, () => void] => {
  const [value, setValue] = useGlobalValue()
  return [
    value,
    () => {
      const newValue = value === 'light' ? 'dark' : 'light'
      switchTheme(newValue)
      setValue(newValue)
      localStorage.setItem(LOCALSTORAGE_KEY, newValue)
    }
  ]
}
