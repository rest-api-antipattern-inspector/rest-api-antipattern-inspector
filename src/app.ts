import dotenv from 'dotenv'
import fs from 'fs'
import { doStackExchangeRequests } from './requests/stackExchange/stackExchange'
import doTwitterRequests from './requests/twitter'

dotenv.config()

console.log('Running rest-api-antipattern-inspector')
console.log('Use Control-C to exit')

fs.writeFileSync('responses.json', '[]')

doStackExchangeRequests()
doTwitterRequests()
