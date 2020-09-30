import { AreaOfInterest } from '@platyplus/tilehuria-schema'
import Router from 'koa-router'

import { AREA_OF_INTEREST_QUEUE } from '../config'
import { sendMessage } from '../queue'
import { HasuraEventContext } from '../types'

export const areaOfInterest: Router.IMiddleware = async (
  context: HasuraEventContext<
    AreaOfInterest & { min_zoom: number; max_zoom: number }
  > // TODO Hasura events refers to the Postgres columns, not the graphql columns
) => {
  const aoi = context.request.body?.event.data.new
  if (aoi) {
    const { id, source, min_zoom, max_zoom } = aoi
    console.log(
      ` [*] New or updated area of internet: ${id}. Relaying the information to the worker...`
    )

    sendMessage(
      AREA_OF_INTEREST_QUEUE,
      JSON.stringify({
        id,
        source,
        minZoom: min_zoom,
        maxZoom: max_zoom
      })
    )
  }
  console.log(' [*] Done.')
  context.status = 200
}
