import fs from '@platyplus/fs'
import chalk from 'chalk'
import { spawn, spawnSync } from 'child_process'
import path from 'path'

import { waitFor } from '../utils'
import { ServiceTypeConfig } from './types'

export const hasuraConfig: ServiceTypeConfig = ({
  directory,
  name,
  relativePath
}) => {
  // TODO set env variables, somehow
  // ? create a global .env file, one prod, one dev?
  // ? Add env vars in the init/postInstall() method?
  // ? Then load it when running skaffold?
  const HASURA_ADMIN_SECRET = 'development-hasura-admin-secret'
  return {
    main: {
      build: {
        image: `${directory}-${name}`,
        context: `${name}`
      }
    },
    dev: {
      build: {
        image: `${directory}-${name}`,
        context: `${name}`
      },
      files: [
        {
          src: 'migrations/**/*',
          dest: '.'
        },
        {
          src: 'metadata/*',
          dest: '.'
        }
      ],
      helm: {
        setValues: {
          ingress: {
            enabled: true,
            'hosts[0].name': `${name}.localhost`
          },
          postgresql: {
            postgresqlPassword: 'development-postgres-password'
          },
          adminSecret: HASURA_ADMIN_SECRET,
          jwt: {
            key: 'long-hasura-jwt-more-than-thirty-two-characters',
            algorithm: 'HS256'
          }
        }
      }
    },
    chartName: 'hasura',
    run: async ({ address, localPort, resourceName }) => {
      await waitFor(`http://${address}:${localPort}/healthz`)
      if (!fs.pathExistsSync(path.join(relativePath, 'config.yaml'))) {
        await fs.saveYaml(path.join(relativePath, 'config.yaml'), {
          version: 2,
          metadata_directory: 'metadata',
          migrations_directory: 'migrations'
        })
      }
      const hasuraMigrate = spawnSync('hasura', [
        'migrate',
        'apply',
        '--admin-secret',
        HASURA_ADMIN_SECRET,
        '--endpoint',
        `http://${address}:${localPort}`,
        '--project',
        relativePath,
        '--skip-update-check'
      ])

      hasuraMigrate.stdout
        .toString()
        .trim()
        .split('\n')
        .forEach((line) =>
          console.log(
            chalk.cyan(`[hasura-cli:${resourceName}]`),
            JSON.parse(line).msg
          )
        )
      if (hasuraMigrate.error) {
        hasuraMigrate.stderr
          .toString()
          .split('\n')
          .forEach((line) =>
            console.log(
              chalk.cyan(`[hasura-cli:${resourceName}]`),
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
        relativePath,
        '--skip-update-check'
      ])
      hasuraConsole.stdout.on('data', (data) => {
        console.log(
          chalk.cyan(`[hasura-cli:${resourceName}]`),
          JSON.parse(data.toString()).msg
        )
      })
      hasuraConsole.stderr.on('data', (data) => {
        console.log(
          chalk.cyan(`[hasura-cli:${resourceName}]`),
          chalk.red('[error]'),
          data.toString()
        )
      })
    }
  }
}
