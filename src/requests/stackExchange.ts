import fetch from 'node-fetch'
import * as fs from 'fs'

export const doStackExchangeRequests = (): void => {
  soInfo()
}

async function soInfo(): Promise<void> {
  const uri =
    'https://api.stackexchange.com/2.2/info?site=stackoverflow'

  const res = await fetch(uri)

  const body = await res.text()
  console.log(body)
}
