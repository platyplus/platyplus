import Router from 'koa-router'

import areaOfInterest from './area-of-interest'

const router = new Router()
router
  .use('/area-of-interest', areaOfInterest.routes())
  .use(areaOfInterest.allowedMethods())

export default router
