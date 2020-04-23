import fs from 'fs'
import url from 'url'
import IResponseMeta from '../interfaces/IResponseMeta'
import INonStandardHeader from '../interfaces/INonStandardHeader'
import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../lib/designAntipatternDetectors'
import { HTTPMethods } from '../enums/HTTPMethods'
import IResonseParams from '../interfaces/IResponseParams'

export const storeResponseMeta = async (resParamsObj: IResonseParams) => {
  const HTTPMethod = resParamsObj.httpMethod.toUpperCase()

  if (!isValidHTTPMethod(HTTPMethod)) {
    console.error('Not valid HTTP Method')
    throw new Error()
  }

  if (!isValidURL(resParamsObj.wholeURI)) {
    console.error('Not valid URL')
    throw new Error()
  }

  const nonstandardHeaders: INonStandardHeader[] = []

  const responseMeta: IResponseMeta = {
    api: resParamsObj.api,
    endpoint: resParamsObj.endpoint,

    wholeURI: resParamsObj.wholeURI,

    httpMethod: HTTPMethod,
    statusCode: resParamsObj.status.statusCode,

    nonstandardHeaders: nonstandardHeaders,

    designAntipatterns: {
      isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(
        resParamsObj.requestHeaders,
        resParamsObj.responseHeaders,
        nonstandardHeaders
      ),

      isForgettingHypermedia: isForgettingHypermedia(
        resParamsObj.body,
        HTTPMethod,
        resParamsObj.responseHeaders
      ),

      isIgnoringCaching: isIgnoringCaching(
        HTTPMethod,
        resParamsObj.requestHeaders,
        resParamsObj.responseHeaders
      ),

      isIgnoringMIMEType: isIgnoringMIMEType(
        resParamsObj.requestHeaders,
        resParamsObj.responseHeaders
      ),

      isIgnoringStatusCode: isIgnoringStatusCode(
        HTTPMethod,
        resParamsObj.status.statusCode
      ),

      isMisusingCookies: isMisusingCookies(
        resParamsObj.requestHeaders,
        resParamsObj.responseHeaders
      ),
    },
  }

  writeToFile(responseMeta)

  console.log(
    `Wrote meta info to responses.json for ${HTTPMethod} ${resParamsObj.wholeURI} ${resParamsObj.endpoint}`
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
