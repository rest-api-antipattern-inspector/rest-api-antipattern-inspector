import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

// TODO fix stack exchange
// import { doStackExchangeRequests } from './requests/stackExchange/stackExchange'
import doTwitterRequests from './requests/twitter'
import bitlyRequests from './requests/bitly'
import disqusRequests from './requests/disqus'
import imgurRequests from './requests/imgur'
import vimeoRequests from './requests/vimeo'
import nasaRequests from './requests/nasa'
import writeURIToFile from './utils/writeURIToFile'

const APIs: any = {
  // stackexchange: doStackExchangeRequests,
  twitter: doTwitterRequests,
  bitly: bitlyRequests,
  disqus: disqusRequests,
  imgur: imgurRequests,
  vimeo: vimeoRequests,
  nasa: nasaRequests,
}

// TODO 1 table per api first

// TODO add instagram & facebook to have 10 APIs

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
