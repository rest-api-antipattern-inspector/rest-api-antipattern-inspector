import { endpoints } from './endpoints'
import { storeResponseMeta } from '../../lib/storeMeta'
import fetch from 'node-fetch'
const ACCESS_TOKEN = process.env.BITLY_ACCESS_TOKEN
const BASE_URL = 'https://api-ssl.bitly.com/v4/'

interface Endpoint {
  readonly method: string
  readonly url: string
  readonly data?: object
}

export default async () => {
  const res = await Promise.all(
    endpoints.map((endpoint: Endpoint) => {
      return fetch(`${BASE_URL}${endpoint.url}`, {
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
    })
  )
  console.log(res.length)
  res.map(async (re) => {
    const text = await re.text()
    console.log(re.status)
    console.log(re.url)
  })
}
