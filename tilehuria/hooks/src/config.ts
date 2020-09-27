export const RABBITMQ_DEFAULT_USER =
  process.env.RABBITMQ_DEFAULT_USER || 'guest'
export const RABBITMQ_DEFAULT_PASS =
  process.env.RABBITMQ_DEFAULT_PASS || 'guest'
export const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'rabbitmq'

export const PORT = 3000

export const RABBITMQ_URL = `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@${RABBITMQ_HOST}`
export const TILE_SET_QUEUE = 'tile_set_queue'
export const AREA_OF_INTEREST_QUEUE = 'area_of_interest_tiles_queue'

export const MIN_ZOOM = 1
export const MAX_ZOOM = 20
