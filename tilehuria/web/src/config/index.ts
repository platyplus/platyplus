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

export const HBP_ENDPOINT = process.env.PROD
  ? `${window.location.protocol}//hbp.${host}`
  : 'http://localhost:3000'

export const HASURA_HTTP_ENDPOINT = process.env.PROD
  ? `${window.location.protocol}//hasura.${host}/v1/graphql`
  : 'http://localhost:8080/v1/graphql'

export const DEFAULT_TILE_LAYER =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

export const ANONYMOUS_ROLE = 'anonymous'
