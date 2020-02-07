import { Response } from 'node-fetch'
import ResponseMeta from '../models/ResponseMeta'

export const storeResponseMeta = (
  uri: string,
  res: Response
) => {
  // TODO: store more types of info
  const responseMeta = new ResponseMeta({
    uri,
    status: res.status,
  })

  responseMeta.save(() => {
    console.log(`Response meta info stored for: ${uri}`)
  })
}
