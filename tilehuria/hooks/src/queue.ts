import { Channel, connect } from 'amqplib'

import { RABBITMQ_URL, TILE_SET_QUEUE } from './config'
let channel: Channel

// TODO duplicated from workers
export const createChannel = async (url: string): Promise<Channel> => {
  const connection = await connect(url)
  connection.on('error', function (err) {
    if (err.message !== 'Connection closing') {
      console.error('[AMQP] connection error', err.message)
    }
  })
  connection.on('close', function () {
    console.error('[AMQP] reconnecting')
    return setTimeout(createChannel, 1000)
  })
  return await connection.createChannel()
}

export const createQueue = (queue: string): void => {
  console.log(` [*] Created queue ${queue}.`)
  channel.assertQueue(queue, {
    durable: false
  })
}

export const sendMessage = (queue: string, message: string): void => {
  channel.sendToQueue(queue, Buffer.from(message))
  console.log(
    ` [*] Sent message with length ${message.length} to the queue ${queue}.`
  )
}

export const connectQueues = async (): Promise<void> => {
  channel = await createChannel(RABBITMQ_URL)
  createQueue(TILE_SET_QUEUE)
}
