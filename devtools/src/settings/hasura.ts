import fs from '@platyplus/fs'
import chalk from 'chalk'
import { spawn, spawnSync } from 'child_process'
import path from 'path'

import { waitFor } from '../utils'
import { ServiceTypeConfig } from './types'

export const hasuraConfig: ServiceTypeConfig = ({
  directory,
  name,
  location
}) => {
  const HASURA_ADMIN_SECRET = 'development-hasura-admin-secret'
  return {
    main: {
      build: {
        image: `${directory}-${name}`,
        context: name
      }
    },
    dev: {
      build: false,
      helm: {
        setValues: {
          postgresql: {
            postgresqlPassword: 'development-postgres-password'
          },
          adminSecret: 'development-hasura-admin-secret',
          jwt: {
            key: 'long-hasura-jwt-more-than-thirty-two-characters',
            algorithm: 'HS256'
          }
        }
      }
    },
    chartName: 'hasura',
    // TODO set env variables
    env: {
      adminSecret: HASURA_ADMIN_SECRET
    },
    run: async ({ address, localPort, resourceName }) => {
      await waitFor(`http://${address}:${localPort}/healthz`)
      await fs.ensureFile(path.join(location, 'config.yaml'))
      const hasuraMigrate = spawnSync('hasura', [
        'migrate',
        'apply',
        '--admin-secret',
        HASURA_ADMIN_SECRET,
        '--endpoint',
        `http://${address}:${localPort}`,
        '--project',
        location,
        '--skip-update-check'
      ])

      hasuraMigrate.stdout
        .toString()
        .trim()
        .split('\n')
        .forEach((line) =>
          console.log(
            chalk.cyan(`[hasura-console:${resourceName}]`),
            JSON.parse(line).msg
          )
        )
      if (hasuraMigrate.error) {
        hasuraMigrate.stderr
          .toString()
          .split('\n')
          .forEach((line) =>
            console.log(
              chalk.cyan(`[hasura-console:${resourceName}]`),
              chalk.red('[error]'),
              line
            )
          )
      }

      const hasuraConsole = spawn('hasura', [
        'console',
        '--admin-secret',
        HASURA_ADMIN_SECRET,
        '--endpoint',
        `http://${address}:${localPort}`,
        '--project',
        location,
        '--skip-update-check'
      ])
      hasuraConsole.stdout.on('data', (data) => {
        console.log(
          chalk.cyan(`[hasura-console:${resourceName}]`),
          JSON.parse(data.toString()).msg
        )
      })
      hasuraConsole.stderr.on('data', (data) => {
        console.log(
          chalk.cyan(`[hasura-console:${resourceName}]`),
          chalk.red('[error]'),
          data.toString()
        )
      })
    }
  }
}
