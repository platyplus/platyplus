import { Channel } from 'amqplib'

import { TILE_SET_QUEUE } from '../config'
import { loadTileSet } from '../tasks'
import { startQueue } from '../utils'

export const tileSetQueue = async (channel: Channel): Promise<void> => {
  await startQueue(channel, TILE_SET_QUEUE, async (message: string) => {
    await loadTileSet(JSON.parse(message))
  })
}
