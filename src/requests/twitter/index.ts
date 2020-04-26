import {
  postLevel1,
  postLevel2,
  getLevel,
  deleteLevel1,
  deleteLevel2,
  tweeting,
  preTweet,
} from './endpoints'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import Twit from 'twit'
import { GET } from '../../utils/HTTPMethods'

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY || '',
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET || '',
  access_token: process.env.TWITTER_ACCESS_TOKEN || '',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
})

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly params: object
}

export default async () => {
  // Tweeting
  try {
    const preRes: any = await T.post(preTweet[0].url, preTweet[0].params)
    const id_str = preRes.data.id_str

    // TODO argument should now be an object, see: src/interfaces/IResponseParams.ts

    const pretweetData = await preRes.resp
    const pretweetReqHeaders = JSON.parse(JSON.stringify(pretweetData)).request
      .headers

    storeResponseMeta({
      api: APIs.twitter,
      wholeURI: `https://api.twitter.com/1.1/${preTweet[0].url}`,
      endpoint: preTweet[0].url,
      status: {
        statusCode: pretweetData.statusCode,
        statusText: pretweetData.statusMessage,
      },
      requestHeaders: pretweetReqHeaders,
      responseHeaders: pretweetData.headers,
      body: pretweetData.data,
      httpMethod: preTweet[0].method,
    })

    for (const tweet of tweeting) {
      try {
        const res =
          tweet.method === GET
            ? await T.get(tweet.url, {
                ...tweet.params,
                id: id_str,
              })
            : await T.post(tweet.url, {
                ...tweet.params,
                id: id_str,
              })
        const data = await res.resp
        const reqHeaders = JSON.parse(JSON.stringify(data)).request.headers

        storeResponseMeta({
          api: APIs.twitter,
          wholeURI: `https://api.twitter.com/1.1/${tweet.url}`,
          endpoint: tweet.url,
          status: {
            statusCode: data.statusCode,
            statusText: data.statusMessage,
          },
          requestHeaders: reqHeaders,
          responseHeaders: data.headers,
          body: res.data,
          httpMethod: tweet.method,
        })
      } catch (e) {
        console.log(tweet.url)
      }
    }
  } catch (err) {
    console.log(err.twitterReply.errors)
  }
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
          const data = await response.resp
          const reqHeaders = JSON.parse(JSON.stringify(data)).request.headers

          storeResponseMeta({
            api: APIs.twitter,
            wholeURI: `https://api.twitter.com/1.1/${endpoint.url}`,
            endpoint: endpoint.url,
            status: {
              statusCode: data.statusCode,
              statusText: data.statusMessage,
            },
            requestHeaders: reqHeaders,
            responseHeaders: data.headers,
            body: response.data,
            httpMethod: endpoint.method,
          })
          return response
        } catch (e) {
          console.log(endpoint.url)
          console.log(e)
        }
      })
    )
  }
}
