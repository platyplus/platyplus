import { Channel, connect } from 'amqplib'

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
