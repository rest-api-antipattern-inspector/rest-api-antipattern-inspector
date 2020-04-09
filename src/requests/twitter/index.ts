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
import Twit from 'twit'
import { GET } from '../../lib/constants'

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

    storeResponseMeta(
      preRes.resp.request.href,
      preTweet[0].url,
      preRes.resp.statusCode,
      preRes.resp.headers,
      preRes.data,
      preTweet[0].method
    )

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
        console.log(res)
        // storeResponseMeta(
        //   res.resp.request.href,
        //   tweet.url,
        //   res.resp.statusCode || 0,
        //   res.resp.headers,
        //   res.data,
        //   tweet.method
        // )
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

  // for (const level of arr) {
  //   const result = await Promise.all(
  //     level.map(async (endpoint: Endpoint) => {
  //       try {
  //         const response =
  //           endpoint.method === GET
  //             ? await T.get(endpoint.url, endpoint.params)
  //             : await T.post(endpoint.url, endpoint.params)

  //         return response.resp.statusCode
  //       } catch (e) {
  //         console.log(endpoint.url)
  //         console.log(e)
  //       }
  //     })
  //   )
  //   console.log(result.length)
  // }
}
