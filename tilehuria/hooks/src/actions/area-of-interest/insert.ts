import { MutationRoot } from '@platyplus/tilehuria-schema'
import gql from 'graphql-tag'
import Router from 'koa-router'

// TODO 'src/' import won't work!!
import { HasuraActionContext } from '../../types'
import { hasuraClient } from '../../utils'

const mutation = gql`
  mutation insert_aoi_coordinates($object: area_of_interest_insert_input!) {
    insertAreaOfInterest(object: $object) {
      id
    }
  }
`

// TODO get zooms
export const insertAreaOfInterest: Router.IMiddleware = async (
  context: HasuraActionContext<{
    id?: string
    source: GeoJSON.GeoJSON
    name: string
  }>
) => {
  if (!context.request.body) throw Error('no body')
  try {
    const { id, source, name } = context.request.body.input
    const { insertAreaOfInterest } = await hasuraClient.request<MutationRoot>(
      mutation,
      {
        object: {
          id,
          source,
          xyzCoordinates: [], // geojsonToTiles(source, MIN_ZOOM, MAX_ZOOM),
          name: name,
          userId: context.request.body.session_variables['x-hasura-user-id']
        }
      }
    )
    if (insertAreaOfInterest) {
      console.log(
        ` [*] Created the Area of Internet ${insertAreaOfInterest?.id}`
      )
      context.status = 200
      context.body = {
        areaOfInterestId: insertAreaOfInterest?.id
      }
    } else throw Error('Impossible to create the area of interest')
  } catch (error) {
    context.status = 400
    context.body = {
      message: error
    }
  }
}
