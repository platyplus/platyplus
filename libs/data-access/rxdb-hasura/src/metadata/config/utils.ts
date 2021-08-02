export const CONFIG_TABLES: string[] = [
  'app_config',
  'property_config',
  'table_config'
]

export const isConsoleEnabled = (): boolean => {
  return document.location.hostname === 'localhost'
}
