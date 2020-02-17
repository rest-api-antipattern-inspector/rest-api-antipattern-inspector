import dotenv from 'dotenv'
import crypto from 'crypto'
import fs from 'fs'
import { dbConnect } from './config/databaseConfig'
import { doStackExchangeRequests } from './requests/stackExchange/stackExchange'
import { doTwitterRequests } from './requests/twitter/index'

dotenv.config()

const SESSION_ID = crypto.randomBytes(8).toString('hex')
process.env['SESSION_ID'] = SESSION_ID

console.log('Running rest-api-antipattern-inspector')
console.log('Session ID is:', SESSION_ID)
console.log('Use Control-C to exit')

// dbConnect()

// TODO overwrite file w. array,
// add to that array in storeMeta

fs.writeFileSync('info.json', '[]')

doStackExchangeRequests()
// doTwitterRequests()
