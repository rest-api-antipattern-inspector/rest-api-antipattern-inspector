require('dotenv').config()
import Twit from 'twit'
import endpoints from './endpoints'

const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
})
endpoints.forEach((endpoint) => {
  try {
    twitterClient[endpoint.method](
      endpoint.url,
      endpoint.params,
      function(err, data, response) {
        console.log(data)
        //console.log(response)
      }
    )
  } catch (e) {
    console.log(e)
  }
})
