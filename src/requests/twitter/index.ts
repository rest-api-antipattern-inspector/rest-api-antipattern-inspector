import fetch from 'node-fetch'
import endpoints from './endpoints'
import { storeResponseMeta } from '../../lib/storeMeta'

const BASE_URL = 'https://api.twitter.com/1.1/'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly statusCode: number
}

export default () =>
  endpoints.forEach(async (endpoint: Endpoint) => {
    const response = await fetch(
      `${BASE_URL}${endpoint.url}`,
      {
        method: endpoint.method,
        headers: {
          Authorization:
            'Bearer ' + process.env.TWITTER_TOKEN,
          'User-Agent': 'My Twitter App v1.0.23',
          'Accept-Encoding': 'gzip',
        },
      }
    )
    storeResponseMeta(
      endpoint.url,
      response,
      endpoint.method
    )
  })
