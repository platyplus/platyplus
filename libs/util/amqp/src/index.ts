import { Channel, connect } from 'amqplib'

const RABBITMQ_DEFAULT_USER = process.env.RABBITMQ_DEFAULT_USER || 'guest'
const RABBITMQ_DEFAULT_PASS = process.env.RABBITMQ_DEFAULT_PASS || 'guest'
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'rabbitmq'

const RABBITMQ_URL = `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@${RABBITMQ_HOST}`

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

export const startQueue = async (
  channel: Channel,
  name: string,
  handler: (message: string) => Promise<void>
): Promise<void> => {
  const q = await channel.assertQueue(name, {
    durable: false // ? Is it ok ?
  })
  console.log(' [*] Waiting for messages in %s.', q.queue)
  await channel.consume(
    q.queue,
    (msg) => {
      if (msg) {
        const strMessage = msg.content.toString()
        console.log(
          ` [*] [${q.queue}] Received message with length ${strMessage.length}`
        )
        handler(strMessage)
      }
    },
    { noAck: true }
  )
}

export const createQueue = (channel: Channel, queue: string): void => {
  console.log(` [*] Created queue ${queue}.`)
  channel.assertQueue(queue, {
    durable: false
  })
}

export const sendMessage = (
  channel: Channel,
  queue: string,
  message: string
): void => {
  channel.sendToQueue(queue, Buffer.from(message))
  console.log(
    ` [*] Sent message with length ${message.length} to the queue ${queue}.`
  )
}

export const connectQueues = async (): Promise<Channel> =>
  await createChannel(RABBITMQ_URL)
