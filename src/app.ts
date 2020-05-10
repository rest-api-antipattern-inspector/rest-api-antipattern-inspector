import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

import stackExchangeRequests from './requests/stackExchange'
import doTwitterRequests from './requests/twitter'
import bitlyRequests from './requests/bitly'
import disqusRequests from './requests/disqus'
import imgurRequests from './requests/imgur'
import nasaRequests from './requests/nasa'
import writeURIToFile from './utils/writeURIToFile'

const APIs: any = {
  stackexchange: stackExchangeRequests,
  twitter: doTwitterRequests,
  bitly: bitlyRequests,
  disqus: disqusRequests,
  imgur: imgurRequests,
  nasa: nasaRequests,
}

// TODO add responses.json as appendix
// extra important since it can't be replicated
// without needed keys

const appArguments = process.argv.slice(2)

if (appArguments[0] === 'uris') {
  writeURIToFile()
} else {
  fs.writeFileSync('responses.json', '[]')
  if (appArguments[0] === 'all') {
    Object.keys(APIs).forEach((api: string) => APIs[api]())
  } else if (appArguments.length === 0) {
    console.log('Specify which APIs to run or all as console argument')
  } else {
    appArguments.forEach((api: string) => APIs[api]())
  }
}
