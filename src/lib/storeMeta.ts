import { Response } from 'node-fetch'
import ResponseMeta from '../models/ResponseMeta'

export const storeResponseMeta = (
  uri: string,
  res: Response
) => {
  // TODO: store more types of info
  const responseMeta = new ResponseMeta({
    sessionID: process.env.SESSION_ID,
    uri,
    status: res.status,
  })

  const cacheInfo = isIgnoringCaching(res)
    ? 'Ignoring Caching'
    : 'NOT Ignoring Caching'

  console.log(cacheInfo)

  /*
  responseMeta.save(() => {
    console.log(
      `Stored info for ${uri} with session ID ${process.env.SESSION_ID}`
    )
  })
  */
}

// TODO unit test this

function isIgnoringCaching(res: Response) {
  const cacheControlElements = res.headers
    .get('Cache-Control')
    ?.split(', ')

  return (
    !res.headers.has('Etag') ||
    !res.headers.has('Cache-Control') ||
    cacheControlElements?.includes('no-cache') ||
    cacheControlElements?.includes('no-store')
  )
}
