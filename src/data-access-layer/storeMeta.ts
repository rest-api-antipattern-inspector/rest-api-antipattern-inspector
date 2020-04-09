import fs from 'fs'
import url from 'url'
import IResponseMeta from '../interfaces/IResponseMeta'
import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../lib/designAntipatternDetectors'
import IHeadersObject from '../interfaces/IHeadersObject'
import { HTTPMethods } from '../enums/HTTPMethods'
import { APIs } from '../enums/APIs'

export const storeResponseMeta = async (
  api: APIs,
  wholeURI: string,
  endpoint: string,
  statusCode: number,
  headers: IHeadersObject,
  body: object,
  httpMethod: string
) => {
  const HTTPMethod = httpMethod.toUpperCase()

  if (!isValidHTTPMethod(HTTPMethod)) {
    console.error('Not valid HTTP Method')
    throw new Error()
  }

  if (!isValidURL(wholeURI)) {
    console.error('Not valid URL')
    throw new Error()
  }

  const nonstandardHeaders: string[] = []

  const responseMeta: IResponseMeta = {
    api,
    endpoint,

    wholeURI,

    httpMethod: HTTPMethod,
    statusCode: statusCode,

    isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(
      headers,
      nonstandardHeaders
    ),

    nonstandardHeaders: nonstandardHeaders,

    isForgettingHypermedia: isForgettingHypermedia(body, HTTPMethod, headers),

    isIgnoringCaching: isIgnoringCaching(HTTPMethod, headers),

    isIgnoringMIMEType: isIgnoringMIMEType(headers),

    isIgnoringStatusCode: isIgnoringStatusCode(HTTPMethod, statusCode),

    isMisusingCookies: isMisusingCookies(headers),
  }

  writeToFile(responseMeta)

  console.log(
    `Wrote meta info to responses.json for ${HTTPMethod} ${wholeURI} ${endpoint}`
  )
}

function writeToFile(responseMeta: IResponseMeta) {
  const responses = JSON.parse(fs.readFileSync('responses.json', 'utf8'))

  responses.push(responseMeta)

  fs.writeFileSync('responses.json', JSON.stringify(responses))
}

function isValidHTTPMethod(HTTPMethod: string): boolean {
  return (<any>Object).values(HTTPMethods).includes(HTTPMethod)
}

function isValidURL(string: string): boolean {
  const URL = url.URL

  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}
