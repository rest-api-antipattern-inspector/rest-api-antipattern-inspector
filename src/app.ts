import { doStackExchangeRequests } from './requests/stackExchange'
import { dbConnect } from './config/databaseConfig'

console.log('Running program\nUse Control-C to exit')

dbConnect()
doStackExchangeRequests()
