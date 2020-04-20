import { level1, level2 } from './endpoints'
import axios from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
const DISQUS_SECRET = process.env.DISQUS_SECRET
const DISQUS_ACCESS_TOKEN = process.env.DISQUS_ACCESS_TOKEN
const BASE_URL = 'https://disqus.com/api/3.0/'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly params?: string
  readonly data?: Object
}

export default async () => {
  for (const level of [level1, level2]) {
    const result = await Promise.all(
      level.map(async (endpoint: Endpoint) => {
        try {
          const res = await axios[endpoint.method](
            `${BASE_URL}${
              endpoint.url
            }?api_secret=${DISQUS_SECRET}&access_token=${DISQUS_ACCESS_TOKEN}${
              endpoint.params ? endpoint.params : ''
            }`,
            {
              method: endpoint.method,
              data:
                endpoint.data && endpoint.method !== 'get'
                  ? JSON.stringify(endpoint.data)
                  : undefined,
            }
          )

          const reqHeaderString = res.request._header
          const reqHeaders = extractRequestHeaders(reqHeaderString)

          storeResponseMeta({
            api: APIs.disqus,
            wholeURI: `${BASE_URL}${endpoint.url}`,
            endpoint: endpoint.url,
            status: {
              statusCode: res.status,
              statusText: res.statusText,
            },
            requestHeaders: reqHeaders,
            responseHeaders: res.headers,
            body: res.data,
            httpMethod: endpoint.method,
          })
        } catch (err) {
          console.log(err)
        }
      })
    )
    // TODO argument should now be an object, see: src/interfaces/IResponseParams.ts

    // result.map((res) =>
    //   storeResponseMeta(
    //     APIs.disqus,
    //     res.wholeURI,
    //     res.endpoint,
    //     res.statusCode,
    //     res.headers,
    //     res.body,
    //     res.httpMethod
    //   )
    // )
  }
}
