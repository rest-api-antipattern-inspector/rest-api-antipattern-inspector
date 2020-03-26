import {
  postLevel1,
  postLevel2,
  getLevel,
  deleteLevel1,
  deleteLevel2,
} from './endpoints'
import { storeResponseMeta } from '../../lib/storeMeta'
import Twit from 'twit'
import { GET } from '../../lib/constants'

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY || '',
  consumer_secret:
    process.env.TWITTER_CONSUMER_API_SECRET || '',
  access_token: process.env.TWITTER_ACCESS_TOKEN || '',
  access_token_secret:
    process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
})

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly params: object
}

export default async () => {
  const arr: Array<Array<Endpoint>> = [
    postLevel1,
    postLevel2,
    getLevel,
    deleteLevel1,
    deleteLevel2,
  ]

  for (const level of arr) {
    const result = await Promise.all(
      level.map(async (endpoint: Endpoint) => {
        try {
          const response =
            endpoint.method === GET
              ? await T.get(endpoint.url, endpoint.params)
              : await T.post(endpoint.url, endpoint.params)

          return response.resp.statusCode
        } catch (e) {
          console.log(endpoint.url)
          console.log(e)
        }
      })
    )
    console.log(result.length)
  }
}
