import { level1, level2 } from './endpoints'
import { storeResponseMeta } from '../../lib/storeMeta'
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
        console.log(endpoint)
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

        console.log(res, 'fsvf')

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
    console.log(result, 'fsfgd')
    result.map((res) =>
      storeResponseMeta(
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
