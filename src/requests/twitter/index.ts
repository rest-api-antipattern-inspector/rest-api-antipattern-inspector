import {
  getEndpoints,
  postEndpoint1,
  postEndpoint2,
  deleteEndpoint1,
  deleteEndpoint2,
} from './endpoints'
import { storeResponseMeta } from '../../lib/storeMeta'
import Twit from 'twit'
import { GET, POST } from '../../lib/constants'

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
  const postRequests1 = await Promise.all(
    postEndpoint1.map(async (endpoint: Endpoint) => {
      const response =
        endpoint.method === GET
          ? await T.get(endpoint.url, endpoint.params)
          : await T.post(endpoint.url, endpoint.params)

      return response.resp.statusCode
    })
  )
  // TODO uncomment console.log(postRequests1)
  const postRequests2 = await Promise.all(
    postEndpoint2.map(async (endpoint: Endpoint) => {
      const response =
        endpoint.method === GET
          ? await T.get(endpoint.url, endpoint.params)
          : await T.post(endpoint.url, endpoint.params)

      return response.resp.statusCode
    })
  )
  // TODO uncomment console.log(postRequests2)
  const getRequests = await Promise.all(
    getEndpoints.map(async (endpoint: Endpoint) => {
      try {
        const response =
          endpoint.method === GET
            ? await T.get(endpoint.url, endpoint.params)
            : await T.post(endpoint.url, endpoint.params)

        return response.resp.statusCode
      } catch (err) {
        // TODO uncomment console.log(err)
        // TODO uncomment console.log(endpoint.url)
      }
    })
  )
  // TODO uncomment console.log(getRequests)
  const deleteRequests1 = await Promise.all(
    deleteEndpoint1.map(async (endpoint: Endpoint) => {
      try {
        const response =
          endpoint.method === GET
            ? await T.get(endpoint.url, endpoint.params)
            : await T.post(endpoint.url, endpoint.params)

        return response.resp.statusCode
      } catch (err) {
        // TODO uncomment console.log(err)
        // TODO uncomment console.log(endpoint.url)
      }
    })
  )
  // TODO uncomment console.log(deleteRequests1)
  const deleteRequests2 = await Promise.all(
    deleteEndpoint2.map(async (endpoint: Endpoint) => {
      try {
        const response =
          endpoint.method === GET
            ? await T.get(endpoint.url, endpoint.params)
            : await T.post(endpoint.url, endpoint.params)

        return response.resp.statusCode
      } catch (err) {
        // TODO uncomment console.log(err)
        // TODO uncomment console.log(endpoint.url)
      }
    })
  )
  // TODO uncomment console.log(deleteRequests2)
}
