import Twit from 'twit'
import endpoints from './endpoints'
import { storeResponseMeta } from '../../lib/storeMeta'
import IResponse from '../../interfaces/IResponse'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly params: object
  readonly statusCode: number
}

export const doTwitterRequests = () => {
  const twitterClient = new Twit({
    consumer_key:
      process.env.TWITTER_CONSUMER_API_KEY || '',
    consumer_secret:
      process.env.TWITTER_CONSUMER_API_SECRET || '',
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:
      process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  endpoints.forEach((endpoint: Endpoint) => {
    try {
      twitterClient.get(
        endpoint.url,
        endpoint.params,

        function(err: any, data: any, response: any) {
          // TODO
          // response variable is not compatible
          // could be solved by fetching with node-fetch or
          // by using the IResponse interface from '../../interfaces/IResponse
          // to make response compatible
          storeResponseMeta(
            endpoint.url,
            response,
            endpoint.method
          )
        }
      )
    } catch (e) {
      console.log(e)
    }
  })
}
