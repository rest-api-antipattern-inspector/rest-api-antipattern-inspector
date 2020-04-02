import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

import { doStackExchangeRequests } from './requests/stackExchange/stackExchange'
import doTwitterRequests from './requests/twitter'
import bitlyRequests from './requests/bitly'
import disqusRequests from './requests/disqus'

const APIs: any = {
  stackexchange: doStackExchangeRequests,
  twitter: doTwitterRequests,
  bitly: bitlyRequests,
  disqus: disqusRequests,
}

// TODO create text file for Java based on responses.json

console.log('Running rest-api-antipattern-inspector')
console.log('Use Control-C to exit')

fs.writeFileSync('responses.json', '[]')

const appArguments = process.argv.slice(2)

if (appArguments[0] === 'all') {
  Object.keys(APIs).forEach((api: string) => APIs[api]())
} else if (appArguments.length === 0) {
  console.log('Specify which APIs to run or all as console argument')
} else {
  appArguments.forEach((api: string) => APIs[api]())
}
