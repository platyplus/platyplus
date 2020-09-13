import child_process from 'child_process'

/**
 * Promisified child_process
 * @param command
 */
export const exec = async (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    child_process.exec(command, (err, stdout, stderr) => {
      if (err) {
        return reject({ err, stderr })
      }
      return resolve(stdout)
    })
  })
