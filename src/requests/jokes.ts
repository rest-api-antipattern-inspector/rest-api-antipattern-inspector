import fetch from 'node-fetch'
import * as fs from 'fs'

export const jokeRequest = async () => {
  const res = await fetch(
    'https://sv443.net/jokeapi/category/programming'
  )

  const body = await res.text()
  console.log(body)

  const info = {
    status: res.status,
    contentType: res.headers.get('content-type'),
    setCookie: res.headers.raw()['set-cookie'],
  }
  const json = JSON.stringify(info)

  fs.writeFileSync('info.json', json)
  console.log('meta data written to json file')
}
