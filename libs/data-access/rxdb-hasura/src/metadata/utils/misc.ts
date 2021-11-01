import { TableInformation } from '../types'

export const tableName = ({
  metadata: {
    table: { schema, name }
  }
}: TableInformation): string =>
  schema === 'public' ? `${name}` : `${schema}_${name}`

export const tableRoles = (table: TableInformation): string[] => {
  const roles: string[] = []
  table.metadata.select_permissions?.forEach((p) => {
    if (!roles.includes(p.role)) roles.push(p.role)
  })
  table.metadata.insert_permissions?.forEach((p) => {
    if (!roles.includes(p.role)) roles.push(p.role)
  })
  return roles
}

export const isConsoleEnabled = (): boolean => {
  // TODO ping localhost:9693
  return (
    document.location.hostname === 'localhost' ||
    document.location.hostname.includes('127.0.0.1')
  )
}
