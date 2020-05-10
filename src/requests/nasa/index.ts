import axios from 'axios'
import endpoints from './endpoints'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
const NASA_API_KEY = process.env.NASA_API_KEY
const BASE_URL = 'https://ssd-api.jpl.nasa.gov/'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly params?: string
  readonly data?: Object
  readonly noAuth?: boolean
  readonly apibase?: string
  readonly endpoint?: string
}

export default async () => {
  console.log(endpoints.length)
  const result = await Promise.all(
    endpoints.map(async (endpoint: Endpoint) => {
      try {
        const res = ['get', 'delete'].includes(endpoint.method)
          ? await axios[endpoint.method](
              `${endpoint.apibase ? endpoint.apibase : BASE_URL}${
                endpoint.url
              }?${endpoint.noAuth ? '' : `api_key=${NASA_API_KEY}`}${
                endpoint.params ? endpoint.params : ''
              }`,
              {
                method: endpoint.method,
              }
            )
          : await axios[endpoint.method](
              `${endpoint.apibase ? endpoint.apibase : BASE_URL}${
                endpoint.url
              }?${endpoint.noAuth ? '' : `api_key=${NASA_API_KEY}`}${
                endpoint.params ? endpoint.params : ''
              }`,
              endpoint.data ? JSON.stringify(endpoint.data) : undefined,
              {
                method: endpoint.method,
              }
            )

        const reqHeaderString = res.request._header
        const reqHeaders = extractRequestHeaders(reqHeaderString)

        storeResponseMeta({
          api: APIs.disqus,
          wholeURI: `${endpoint.apibase ? endpoint.apibase : BASE_URL}${
            endpoint.url
          }`,
          endpoint: endpoint.endpoint ? endpoint.endpoint : endpoint.url,
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
}
