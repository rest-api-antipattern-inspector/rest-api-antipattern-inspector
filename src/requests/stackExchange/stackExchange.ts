import fetch, { Response } from 'node-fetch'
import { storeResponseMeta } from '../../lib/storeMeta'
import IHeadersObject from '../../interfaces/IHeadersObject'
import {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
} from '../../lib/constants'

export const doStackExchangeRequests = (): void => {
  stackOverflowInfo()
  relatedQuestionsSO()
}

async function stackOverflowInfo() {
  const uri =
    'https://api.stackexchange.com/2.2/info?site=stackoverflow'

  const res = await fetch(uri)
  const headers = getHeaders(res)

  storeResponseMeta(
    uri,
    res.status,
    headers,
    await res.text(),
    GET
  )
}

/**
 * Related questions to these 3 questions:
 * https://stackoverflow.com/questions/60075228/exchange-different-arrays-elements-in-ruby
 * https://stackoverflow.com/questions/60075237/best-way-to-handle-an-account-linking-verification-system
 * https://stackoverflow.com/questions/57496313/execution-failed-for-task-appmergedebugresources-com-android-builder-interna
 */
async function relatedQuestionsSO() {
  const uri =
    'https://api.stackexchange.com/2.2/questions/60075228;60075237;57496313/related?order=desc&sort=activity&site=stackoverflow'

  const res = await fetch(uri)
  const headers = getHeaders(res)

  storeResponseMeta(
    uri,
    res.status,
    headers,
    await res.text(),
    GET
  )
}

function getHeaders(res: Response): IHeadersObject {
  const headers: IHeadersObject = {}
  const rawHeaders = res.headers.raw()
  const headerKeys = Object.keys(rawHeaders)
  const headerValues = Object.values(rawHeaders)

  for (let i = 0; i < headerKeys.length; i++) {
    headers[headerKeys[i]] = headerValues[i][0]
  }

  return headers
}
