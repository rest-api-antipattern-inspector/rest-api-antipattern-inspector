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

  responseMeta.save(() => {
    console.log(
      `Stored info for ${uri} with session ID ${process.env.SESSION_ID}`
    )
  })
}
