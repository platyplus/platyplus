import { RABBITMQ_URL } from './config'
import { areaOfInterestTilesQueue, tileSetQueue } from './queues'
import { createChannel } from './utils'

export const watchAmqp = async (): Promise<void> => {
  // ? All queues on the same channel, or one channel per queue?
  const channel = await createChannel(RABBITMQ_URL)
  await tileSetQueue(channel)
  await areaOfInterestTilesQueue(channel)
}
