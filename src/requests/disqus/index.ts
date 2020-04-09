import { level1, level2 } from './endpoints'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import fetch from 'node-fetch'
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
        const res = await fetch(
          `${BASE_URL}${
            endpoint.url
          }?api_secret=${DISQUS_SECRET}&access_token=${DISQUS_ACCESS_TOKEN}${
            endpoint.params ? endpoint.params : ''
          }`,
          {
            method: endpoint.method,
            body:
              endpoint.data && endpoint.method !== 'GET'
                ? JSON.stringify(endpoint.data)
                : undefined,
          }
        )

        const body = await res.text()
        const headers: any = {}
        res.headers.forEach((value, name) => (headers[name] = value))

        return {
          wholeURI: res.url,
          endpoint: endpoint.url,
          statusCode: res.status,
          headers,
          body: JSON.parse(body),
          httpMethod: endpoint.method,
        }
      })
    )
    result.map((res) =>
      storeResponseMeta(
        APIs.disqus,
        res.wholeURI,
        res.endpoint,
        res.statusCode,
        res.headers,
        res.body,
        res.httpMethod
      )
    )
  }
}
