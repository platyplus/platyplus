import { get, push, set } from 'object-path'

import { Activation, Skaffold } from '../types'

export const syncDevProfile = (skaffold: Skaffold): number => {
  let index = skaffold.profiles.findIndex((profile) => profile.name === 'dev')
  if (index < 0) index = skaffold.profiles.length
  set(skaffold, `profiles.${index}.name`, 'dev')
  if (
    !get<Activation[]>(skaffold, `profiles.${index}.activation`, []).find(
      (activation) => activation.command === 'dev'
    )
  ) {
    push(skaffold, `profiles.${index}.activation`, { command: 'dev' })
  }
  return index
}
