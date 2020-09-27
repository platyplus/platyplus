import { watchAmqp } from './server'

const main = async () => {
  try {
    await watchAmqp()
    console.log(' [*] Worker service started')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
main()
