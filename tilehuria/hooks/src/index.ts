import { connectQueues } from './queue'
import { start } from './server'

const main = async () => {
  try {
    await connectQueues()
    await start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
