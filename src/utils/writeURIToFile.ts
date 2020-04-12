import fs from 'fs'

import disqus from '../requests/disqus/endpoints'
import bitly from '../requests/bitly/endpoints'
import twitter from '../requests/twitter/endpoints'

const apis = [
  {
    name: 'Disqus',
    endpoints: disqus,
  },
  {
    name: 'Bitly',
    endpoints: bitly,
  },
  {
    name: 'Twitter',
    endpoints: twitter,
  },
]

export default () => {
  apis.forEach((api) => {
    try {
      let str = ''
      api.endpoints.forEach((endpoint) => {
        str += '/' + endpoint.url.replace(',', '') + '\n'
      })

      fs.writeFile(`./URIs/${api.name}.txt`, str, (err) => {
        if (err) {
          console.log(err)
        }
      })
    } catch (e) {
      console.log(e)
    }
  })
}
