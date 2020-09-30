import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'
import sharp from 'sharp'
import tempDirectory from 'temp-dir'

import { CONCURRENT_DOWNLOADS, S3_BUCKET } from '../config'
import { completeTileProgress, updateTileProgress } from '../graphql'
import { MbTiles, s3 } from '../utils'
import { getOneTile } from './get-one-tile'

export const loadTileSet = async ({
  id,
  name,
  userId,
  url,
  slug,
  xyzCoordinates,
  format = 'png',
  quality
}: {
  id: string
  name: string
  userId: string
  url: string
  slug: string
  xyzCoordinates: number[][]
  format: 'png' | 'jpg'
  quality?: number
}): Promise<void> => {
  console.log(
    ` [*] Loading ${xyzCoordinates.length} tiles from the ${slug} provider...`
  )
  let progress = 0.01
  const progressIncrement = 1.0 / xyzCoordinates.length
  await updateTileProgress(id, progress)

  let lastProgress = 0.01
  const progressInterval = setInterval(() => {
    if (progress >= lastProgress + 0.01) {
      updateTileProgress(id, progress).then(() => {
        console.log(progress)
        lastProgress = progress
      })
    }
  }, 1000)

  // * Set a Queue with CONCURRENT_DOWNLOADS
  const pQueue = new PQueue({ concurrency: CONCURRENT_DOWNLOADS })

  const tmpFileName = path.join(tempDirectory, name)
  const mbTiles = await MbTiles.create(tmpFileName, {
    write: true,
    create: true
  })

  // * Loop in the tiles
  for (const [x, y, z] of xyzCoordinates) {
    // * Queue the task - will not run more than CONCURRENT_DOWNLOADS promises
    pQueue.add(async () => {
      try {
        let buffer = await getOneTile([x, y, z], url, slug)
        try {
          // * Don't transform the image if no quality is given, or if max png quality
          if (quality && !(quality == 100 && format === 'png')) {
            const stream = sharp(buffer)
            if (format === 'jpg') stream.jpeg({ quality })
            else stream.png({ quality })
            buffer = await stream.toBuffer()
          }
          await mbTiles.putTile([x, y, z], buffer)
        } catch (error) {
          console.log(' [!] Error processing the image')
          console.log(error)
        }
      } catch (error) {
        console.log(' [!] Error getting the tile', error)
      }
      progress += progressIncrement
    })
  }
  // * Wait for all the tiles to be processed
  await pQueue.onIdle()
  await mbTiles.stopWriting()
  const key = `mbtiles/${userId}/${slug}/${name}.mbtiles`
  await new Promise((resolve, reject) => {
    fs.readFile(tmpFileName, (err, data) => {
      data.length
      if (err) return reject()
      s3.putObject(
        {
          Bucket: S3_BUCKET,
          Key: key,
          Body: data
        },
        (err, status) => {
          if (err) {
            console.log(' [!] Error in putting to S3', err)
            console.log(' [!] Status:', status)
            return reject(status)
          }
          resolve(status)
        }
      )
    })
  })
  clearInterval(progressInterval)
  await completeTileProgress(id, fs.statSync(tmpFileName).size)
  fs.unlinkSync(tmpFileName)
  console.log(` [*] Done updating the tile set ${key}.`)
}
