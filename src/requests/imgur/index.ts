import { endpoints } from './endpoints'
import axios from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
const ACCESS_TOKEN = process.env.IMGUR_ACCESS_TOKEN
const BASE_URL = 'https://api.imgur.com/3/'

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
        const res = ['get', 'delete'].includes(endpoint.method)
          ? await axios[endpoint.method](`${BASE_URL}${endpoint.url}`, {
              headers: {
                Accept: 'application/json',
                'Content-Type':
                  endpoint.method === 'put'
                    ? 'multipart/form-data'
                    : 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
            })
          : await axios[endpoint.method](
              `${BASE_URL}${endpoint.url}`,
              endpoint.data ? JSON.stringify(endpoint.data) : {},
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type':
                    endpoint.method === 'put'
                      ? 'multipart/form-data'
                      : 'application/json',
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
              }
            )
        const reqHeaderString = res.request._header
        const reqHeaders = extractRequestHeaders(reqHeaderString)

        storeResponseMeta({
          api: APIs.imgur,
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
