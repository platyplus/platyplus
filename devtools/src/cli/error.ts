import chalk from 'chalk'

export const error = (e: Error): never => {
  console.log(chalk.bold.red(e.message))
  process.exit(1)
}
