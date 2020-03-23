import endpoints from './endpoints'
import { storeResponseMeta } from '../../lib/storeMeta'
import Twit from 'twit'

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

export default () =>
  endpoints.forEach(async (endpoint: Endpoint) => {
    const response = await T.get(
      endpoint.url,
      endpoint.params
    )

    console.log(response)
  })
