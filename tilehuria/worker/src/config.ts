const castBooleanEnv = (envVar: string, defaultValue = false): boolean =>
  process.env[envVar]
    ? process.env[envVar]?.toLowerCase() === 'true'
    : defaultValue

export const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_ENDPOINT
} = process.env
export const S3_BUCKET = process.env.S3_BUCKET || 'tilehuria'
export const S3_SSL_ENABLED = castBooleanEnv('S3_SSL_ENABLED')

export const RABBITMQ_DEFAULT_USER =
  process.env.RABBITMQ_DEFAULT_USER || 'guest'
export const RABBITMQ_DEFAULT_PASS =
  process.env.RABBITMQ_DEFAULT_PASS || 'guest'
export const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'rabbitmq'

export const RABBITMQ_URL = `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@${RABBITMQ_HOST}`

export const TILE_SET_QUEUE = 'tile_set_queue'
export const AREA_OF_INTEREST_TILES_QUEUE = 'area_of_interest_tiles_queue'

export const MIN_ZOOM = 1
export const MAX_ZOOM = 20
export const CONCURRENT_DOWNLOADS = 30
