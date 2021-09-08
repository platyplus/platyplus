import decode from 'jwt-decode'

type Claims = Record<string, unknown> & {
  ['https://hasura.io/jwt/claims']: HasuraClaims
}
type HasuraClaims = {
  [key: string]: string | string[] | undefined
  'x-hasura-allowed-roles': string[]
  'x-hasura-default-role': string
}

export const hasuraClaims = (token: string): HasuraClaims =>
  decode<Claims>(token)['https://hasura.io/jwt/claims']

export const createHeaders = (
  role: string,
  token?: string,
  substituteRole?: string
): Record<string, string> => {
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    const hasura = hasuraClaims(token)
    const allowedRoles = hasura['x-hasura-allowed-roles']
    const defaultRole = hasura['x-hasura-default-role']
    if (substituteRole && allowedRoles.includes(substituteRole))
      headers['x-hasura-role'] = substituteRole
    else if (role !== defaultRole && allowedRoles.includes(role))
      headers['x-hasura-role'] = role
  }
  return headers
}
