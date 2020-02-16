require('dotenv').config()
import Twit from 'twit'
import endpoints from './endpoints'
import MIMETypes from '../lib/MIMETypes'

// TODO make this call storeMeta and call from app.ts,
// make it easy to comment out in app

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly params: object
  readonly statusCode: number
}

const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY || '',
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

      // TODO just call response meta from here and rm check here
      function(err: any, data: any, response: any) {
        const hasMIMEType = MIMETypes.some((type) =>
          response.headers['content-type'].includes(type)
        )
        const correctStatusCode =
          endpoint.statusCode === response.statusCode
        const noCookie =
          response.headers['set-cookie'] == null &&
          response.headers['cookie'] == null
        console.log(hasMIMEType)
        console.log(correctStatusCode)
        console.log(noCookie)
      }
    )
  } catch (e) {
    console.log(e)
  }
})
