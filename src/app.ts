import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import stackExchangeRequests from './requests/stackExchange'
import doTwitterRequests from './requests/twitter'
import bitlyRequests from './requests/bitly'
import disqusRequests from './requests/disqus'
import imgurRequests from './requests/imgur'
import vimeoRequests from './requests/vimeo'
import nasaRequests from './requests/nasa'
import githubRequests from './requests/github'
import spotifyRequests from './requests/spotify'
import writeURIToFile from './utils/writeURIToFile'

const APIs: any = {
  stackexchange: stackExchangeRequests,
  twitter: doTwitterRequests,
  bitly: bitlyRequests,
  disqus: disqusRequests,
  imgur: imgurRequests,
  vimeo: vimeoRequests,
  nasa: nasaRequests,
  github: githubRequests,
  spotify: spotifyRequests,
}

// TODO uml package diagram of folders

// TODO in readme, instructions for adding/changing apis/endpoints

// TODO add responses.json as appendix, extra important since it can't be replicated without needed keys

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
