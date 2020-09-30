import { Channel } from 'amqplib'

import { AREA_OF_INTEREST_TILES_QUEUE } from '../config'
import { updateAoiTiles } from '../tasks'
import { startQueue } from '../utils'

export const areaOfInterestTilesQueue = async (
  channel: Channel
): Promise<void> => {
  await startQueue(
    channel,
    AREA_OF_INTEREST_TILES_QUEUE,
    async (message: string) => {
      await updateAoiTiles(JSON.parse(message))
    }
  )
}
