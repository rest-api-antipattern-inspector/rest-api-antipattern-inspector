import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()
import { doStackExchangeRequests } from './requests/stackExchange/stackExchange'
import doTwitterRequests from './requests/twitter'

const APIs: any = {
  stackexchange: doStackExchangeRequests,
  twitter: doTwitterRequests,
}

console.log('Running rest-api-antipattern-inspector')
console.log('Use Control-C to exit')

fs.writeFileSync('responses.json', '[]')

const appArguments = process.argv.slice(2)

if (
  appArguments[0] === 'all' ||
  appArguments.length === 0
) {
  Object.keys(APIs).forEach((api: string) => APIs[api]())
} else {
  appArguments.forEach((api: string) => APIs[api]())
}
