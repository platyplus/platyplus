import { getLernaPackages } from '@platyplus/lerna'

import { writeDockerfiles } from './docker'
import { loadService } from './load'

export const syncServices = async (): Promise<void> => {
  const packages = await getLernaPackages()
  for (const p of packages) {
    try {
      const service = await loadService(p.location)
      await writeDockerfiles(service)
      console.log(`${service.packageName} synced in ${service.location}`)
      // eslint-disable-next-line no-empty
    } catch {}
  }
}
