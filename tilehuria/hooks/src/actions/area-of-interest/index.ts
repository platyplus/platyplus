import Router from 'koa-router'

import { insertAreaOfInterest } from './insert'
import { updateAreaOfInterest } from './update'

const router = new Router()
router.post('/insert', insertAreaOfInterest)
router.post('/update', updateAreaOfInterest)

export default router
