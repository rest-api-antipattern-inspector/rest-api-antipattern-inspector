import { endpoints } from './endpoints'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import fetch from 'node-fetch'
const ACCESS_TOKEN = process.env.BITLY_ACCESS_TOKEN
const BASE_URL = 'https://api-ssl.bitly.com/v4/'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly data?: object
}

export default async () => {
  const result = await Promise.all(
    endpoints.map(async (endpoint: Endpoint) => {
      const res = await fetch(`${BASE_URL}${endpoint.url}`, {
        method: endpoint.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body:
          endpoint.data && endpoint.method !== 'GET'
            ? JSON.stringify(endpoint.data)
            : undefined,
      })
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
      res.wholeURI,
      res.endpoint,
      res.statusCode,
      res.headers,
      res.body,
      res.httpMethod
    )
  )
}
