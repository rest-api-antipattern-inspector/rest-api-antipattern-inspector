import fs from 'fs'
import IResponseMeta from '../interfaces/IResponseMeta'
import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../lib/designAntipatternsDetectors'
import IHeadersObject from '../interfaces/IHeadersObject'

export const storeResponseMeta = async (
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
    wholeURI,
    endpoint,
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

  console.log(`Stored info for ${httpMethod} ${wholeURI}`)
}

function writeToFile(responseMeta: IResponseMeta) {
  const responses = JSON.parse(fs.readFileSync('responses.json', 'utf8'))

  responses.push(responseMeta)

  fs.writeFileSync('responses.json', JSON.stringify(responses))
}
