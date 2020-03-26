import fs from 'fs'
import IResponseMeta from '../interfaces/IResponseMeta'
import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from './designAntipatternsDetectors'
import IHeadersObject from '../interfaces/IHeadersObject'

export const storeResponseMeta = async (
  uri: string,
  statusCode: number,
  headers: IHeadersObject,
  body: string,
  httpMethod: string
) => {
  httpMethod = httpMethod.toUpperCase()

  const responseMeta: IResponseMeta = {
    uri,
    httpMethod: httpMethod,

    isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(
      res,
      httpMethod
    ),

    isForgettingHypermedia: isForgettingHypermedia(
      res,
      body,
      httpMethod
    ),

    isIgnoringCaching: isIgnoringCaching(res, httpMethod),

    isIgnoringMIMEType: isIgnoringMIMEType(res),

    isIgnoringStatusCode: isIgnoringStatusCode(
      res,
      httpMethod
    ),

    isMisusingCookies: isMisusingCookies(res),
  }

  writeToFile(responseMeta)

  console.log(`Stored info for ${httpMethod} ${uri}`)
}

function writeToFile(responseMeta: IResponseMeta) {
  const responses = JSON.parse(
    fs.readFileSync('responses.json', 'utf8')
  )

  responses.push(responseMeta)

  fs.writeFileSync(
    'responses.json',
    JSON.stringify(responses)
  )
}
