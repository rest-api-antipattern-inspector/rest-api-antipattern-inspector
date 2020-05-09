import { endpoints } from './endpoints'
import axios from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
const ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN
const BASE_URL = 'https://api.dropboxapi.com/2/'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly data?: object
  readonly endpoint?: string
}

// TODO investigate why patch is not among
// methods used json

export default async () => {
  const result = await Promise.all(
    endpoints.map(async (endpoint: Endpoint) => {
      try {
        const res = ['get', 'delete'].includes(endpoint.method)
          ? await axios[endpoint.method](`${BASE_URL}${endpoint.url}`, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
            })
          : await axios[endpoint.method](
              `${BASE_URL}${endpoint.url}`,
              endpoint.data ? JSON.stringify(endpoint.data) : null,
              {
                headers: {
                  Accept: 'application/json; charset=utf-8',
                  'Content-Type': 'application/json; charset=utf-8',
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
              }
            )

        const reqHeaderString = res.request._header
        const reqHeaders = extractRequestHeaders(reqHeaderString)

        storeResponseMeta({
          api: APIs.dropbox,
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
