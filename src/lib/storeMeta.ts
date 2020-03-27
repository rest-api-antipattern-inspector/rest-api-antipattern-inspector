import fs from 'fs'
import IResponseMeta from '../interfaces/IResponseMeta'
import { isBreakingSelfDescriptiveness, isForgettingHypermedia, isIgnoringCaching, isIgnoringMIMEType, isIgnoringStatusCode, isMisusingCookies } from './designAntipatternsDetectors'
import IHeadersObject from '../interfaces/IHeadersObject'

export const storeResponseMeta = async (uri: string, statusCode: number, headers: IHeadersObject, body: object, httpMethod: string) => {
  httpMethod = httpMethod.toUpperCase()

  const nonStandardHeaders: string[] = []

  const responseMeta: IResponseMeta = {
    uri,
    httpMethod: httpMethod,

    isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(headers, nonStandardHeaders),

    nonStandardHeaders: nonStandardHeaders,

    isForgettingHypermedia: isForgettingHypermedia(body, httpMethod, headers),

    isIgnoringCaching: isIgnoringCaching(httpMethod, headers),

    isIgnoringMIMEType: isIgnoringMIMEType(headers),

    isIgnoringStatusCode: isIgnoringStatusCode(httpMethod, statusCode),

    isMisusingCookies: isMisusingCookies(headers),
  }

  writeToFile(responseMeta)

  console.log(`Stored info for ${httpMethod} ${uri}`)
}

function writeToFile(responseMeta: IResponseMeta) {
  const responses = JSON.parse(fs.readFileSync('responses.json', 'utf8'))

  responses.push(responseMeta)

  fs.writeFileSync('responses.json', JSON.stringify(responses))
}
