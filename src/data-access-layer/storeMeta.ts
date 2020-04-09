import fs from 'fs'
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

export const storeResponseMeta = async (
  api: string,
  wholeURI: string,
  endpoint: string,
  statusCode: number,
  headers: IHeadersObject,
  body: object,
  httpMethod: string
) => {
  httpMethod = httpMethod.toUpperCase()

  const nonstandardHeaders: string[] = []

  const responseMeta: IResponseMeta = {
    api,
    endpoint,

    wholeURI,

    httpMethod: httpMethod,
    statusCode: statusCode,

    isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(
      headers,
      nonstandardHeaders
    ),

    nonstandardHeaders: nonstandardHeaders,

    isForgettingHypermedia: isForgettingHypermedia(body, httpMethod, headers),

    isIgnoringCaching: isIgnoringCaching(httpMethod, headers),

    isIgnoringMIMEType: isIgnoringMIMEType(headers),

    isIgnoringStatusCode: isIgnoringStatusCode(httpMethod, statusCode),

    isMisusingCookies: isMisusingCookies(headers),
  }

  writeToFile(responseMeta)

  console.log(
    `Wrote meta info to responses.json for ${httpMethod} ${wholeURI} ${endpoint}`
  )
}

function writeToFile(responseMeta: IResponseMeta) {
  const responses = JSON.parse(fs.readFileSync('responses.json', 'utf8'))

  responses.push(responseMeta)

  fs.writeFileSync('responses.json', JSON.stringify(responses))
}
