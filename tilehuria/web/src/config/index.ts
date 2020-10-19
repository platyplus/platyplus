import { area_of_interest } from './area-of-interest'
import { tile_provider } from './tile-provider'
import { tile_set } from './tile-set'

export const GRAPHQL_CONFIG = {
  area_of_interest,
  tile_provider,
  tile_set
}

// ! https://the-guild.dev/blog/graphql-codegen-best-practices

const host = window.location.host
// TODO not ideal! Find a way to pass env variables
const domain = host.substring(host.indexOf('.') + 1)
export const HBP_ENDPOINT = `${window.location.protocol}//hasura-backend-plus.${domain}`

export const HASURA_HTTP_ENDPOINT = `${window.location.protocol}//hasura.${domain}/v1/graphql`

export const DEFAULT_TILE_LAYER =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

export const ANONYMOUS_ROLE = 'anonymous'
