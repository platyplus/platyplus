import got from 'got'

import { S3_BUCKET } from '../config'
import { s3, tileUrl } from '../utils'

export const getOneTile = async (
  [x, y, z]: number[],
  template: string,
  slug: string
): Promise<Buffer> => {
  const params = {
    Bucket: S3_BUCKET,
    Key: `tile/${slug}/${z}/${x}/${y}.png`
  }
  const url = tileUrl([x, y, z], template)
  try {
    await s3.headObject(params).promise()
    const result = await s3.getObject(params).promise()
    console.log(` [*] Tile ${url}: using cache`)
    return result.Body as Buffer
  } catch (error) {
    console.log(` [*] Tile ${url}: downloading`)
    const body = await got(url).buffer()
    await s3.putObject({ ...params, Body: body }).promise()
    return body
  }
}
