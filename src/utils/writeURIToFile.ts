import fs from 'fs'

import disqus from '../requests/disqus/endpoints'
import bitly from '../requests/bitly/endpoints'
import twitter from '../requests/twitter/endpoints'

const apis = [
  {
    name: 'Disqus',
    version: '3.0',
    endpoints: disqus,
  },
  {
    name: 'Bitly',
    version: 'v4',
    endpoints: bitly,
  },
  {
    name: 'Twitter',
    version: '1.1',
    endpoints: twitter,
  },
]

export default () => {
  apis.forEach((api) => {
    try {
      let str = ''
      api.endpoints.forEach((endpoint) => {
        str += `/${
          endpoint.endpoint
            ? endpoint.endpoint.replace(',', '')
            : endpoint.url.replace(',', '')
        }\n`
      })

      fs.writeFile(`./URIs/${api.name}/APIIndex.txt`, str, (err) => {
        if (err) {
          console.log(err)
        }
      })
      fs.writeFile(`./URIs/${api.name}/APITest.txt`, str, (err) => {
        if (err) {
          console.log(err)
        }
      })

      str = ''
      api.endpoints.forEach((endpoint) => {
        str += `${endpoint.method.toUpperCase()} >> /${
          endpoint.endpoint
            ? endpoint.endpoint.replace(',', '')
            : endpoint.url.replace(',', '')
        } >> null\n`
      })
      fs.writeFile(`./URIs/${api.name}/${api.name}.txt`, str, (err) => {
        if (err) {
          console.log(err)
        }
      })
    } catch (e) {
      console.log(e)
    }
  })
}
