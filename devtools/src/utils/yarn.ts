import { execSync } from 'child_process'

export const globalPath = () => execSync('yarn global bin').toString().trim()
