import Router from 'koa-router'

import { areaOfInterest } from './area-of-interest'
import { tileSet } from './tile-set'

const router = new Router()
router.post('/area-of-interest', areaOfInterest)
router.post('/tile-set', tileSet)

export default router
