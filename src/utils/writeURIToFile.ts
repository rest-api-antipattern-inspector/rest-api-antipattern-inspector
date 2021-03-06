import fs from 'fs'
import { APIs } from '../enums/APIs'

import disqus from '../requests/disqus/endpoints'
import bitly from '../requests/bitly/endpoints'
import twitter from '../requests/twitter/endpoints'
import imgur from '../requests/imgur/endpoints'
import vimeo from '../requests/vimeo/endpoints'
import nasa from '../requests/nasa/endpoints'
import github from '../requests/github/endpoints'
import spotify from '../requests/spotify/endpoints'
import stackexchange from '../requests/stackExchange/endpoints'
import facebook from '../requests/facebook/endpoints'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly data?: object
  readonly endpoint?: string
}

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
  {
    name: 'Imgur',
    version: 3,
    endpoints: imgur,
  },
  {
    name: 'Vimeo',
    version: 3,
    endpoints: vimeo,
  },
  {
    name: 'Nasa',
    endpoints: nasa,
  },
  {
    name: 'Github',
    endpoints: github,
  },
  {
    name: 'Spotify',
    endpoints: spotify,
    version: 1,
  },
  {
    name: Capitalize(APIs.stackExchange),
    version: '2.2',
    endpoints: stackexchange,
    acronyms: ['desc ->descending'],
  },
  {
    name: Capitalize(APIs.facebook),
    version: '7.0',
    endpoints: facebook,
  },
]

export default () => {
  !fs.existsSync('./URIs') && fs.mkdirSync('./URIs')

  apis.forEach((api) => {
    try {
      let str = ''
      api.endpoints.forEach((endpoint: Endpoint) => {
        str += `/${
          endpoint.endpoint
            ? endpoint.endpoint.replace(',', '')
            : endpoint.url.replace(',', '')
        }\n`
      })

      !fs.existsSync(`./URIs/${api.name}`) && fs.mkdirSync(`./URIs/${api.name}`)

      writeAcronymsIfExists(api.name, api.acronyms)

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
      api.endpoints.forEach((endpoint: Endpoint) => {
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

function Capitalize(apiName: APIs): string {
  return apiName.charAt(0).toUpperCase() + apiName.slice(1)
}

function writeAcronymsIfExists(
  apiName: string,
  acronyms: string[] | undefined
) {
  if (!acronyms) return

  const dir = `./URIs/${apiName}/acronym`
  const filePath = `${dir}/${apiName}.txt`
  const txt = acronyms.join('\n')

  !fs.existsSync(dir) && fs.mkdirSync(dir)
  fs.writeFileSync(filePath, txt)
}
