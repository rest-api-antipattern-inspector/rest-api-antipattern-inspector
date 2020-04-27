import { endpoints } from './endpoints'
import axios from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
const ACCESS_TOKEN = process.env.BITLY_ACCESS_TOKEN
const BASE_URL = 'https://api-ssl.bitly.com/v4/'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly data?: object
  readonly endpoint?: string
}

export default async () => {
  const result = await Promise.all(
    endpoints.map(async (endpoint: Endpoint) => {
      try {
        const res = await axios[endpoint.method](`${BASE_URL}${endpoint.url}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          data:
            endpoint.data && endpoint.method !== 'GET'
              ? JSON.stringify(endpoint.data)
              : undefined,
        })
        const reqHeaderString = res.request._header
        const reqHeaders = extractRequestHeaders(reqHeaderString)

        storeResponseMeta({
          api: APIs.bitly,
          wholeURI: `${BASE_URL}${endpoint.url}`,
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
