// TODO duplicated from workers
import { xyzToQuadKey } from './xyz-to-quadkey'

const setSwitch = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const switches = url.match(/\{switch:(.*?)\}/)?.[1].split(',')
  if (Array.isArray(switches)) {
    const choice = switches[Math.floor(Math.random() * switches.length)]
    return url.replace(/\{switch:(.*?)\}/i, choice)
  } else return url
}

const setCoordinates = (url: string, [x, y, z]: number[]) => {
  const mapCoordinates: { [key: string]: () => string } = {
    '{x}': () => x.toString(),
    '{y}': () => y.toString(),
    '{-y}': () => (Math.pow(2, z) - 1 - y).toString(),
    '{z}': () => z.toString(),
    '{zoom}': () => z.toString(),
    '{quadkey}': () => xyzToQuadKey([x, y, z])
  }
  return url.replace(
    /(\{x\}|\{y\}|\{z\}|\{zoom\}|\{-y\}|\{quadkey\})/gi,
    (matched: string) => mapCoordinates[matched]()
  )
}

export const tileUrl = (coordinates: number[], url: string): string => {
  // * See https://github.com/HumanitarianStuff/tilehuria/blob/c343afaf51b228a7fd83c2223cf6001a593acb09/tilehuria/utils.py
  url = setSwitch(url)
  url = setCoordinates(url, coordinates)
  return url
}
