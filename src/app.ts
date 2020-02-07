import { doStackExchangeRequests } from './requests/stackExchange'
import { dbConnect } from './config/databaseConfig'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

const SESSION_ID = crypto.randomBytes(8).toString('hex')
process.env['SESSION_ID'] = SESSION_ID

console.log('Running rest-api-antipattern-inspector')
console.log('Session ID is:', SESSION_ID)
console.log('Use Control-C to exit\n')

dbConnect()
doStackExchangeRequests()
