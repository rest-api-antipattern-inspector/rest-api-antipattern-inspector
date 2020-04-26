import IHeadersObject from '../interfaces/IHeadersObject'
import INonStandardHeader from '../interfaces/INonStandardHeader'
import { GET, POST, PUT, PATCH, DELETE } from '../utils/HTTPMethods'
import { HTTPMethods } from '../enums/HTTPMethods'
import {
  GETStatuses,
  POSTStatuses,
  PUTStatuses,
  PATCHStatuses,
  DELETEStatuses,
} from './statusCodes'
import {
  getStandardRequestHeaders,
  getStandardResponseHeaders,
} from './StandardHTTPHeaders'
import {
  registerHeader,
  getAllKeys,
  containsLinks,
  isAcceptedMIMEType,
  isStandardMIMEType,
  containsHeaderLowercasedOrCapitalized,
  getHeaderValue,
  containsCookieHeader,
} from './detectorHelpers'
import IStatusCombo from '../interfaces/IStatusCombo'

/**
 * @param requestHeaders request headers
 * @param responseHeaders response headers
 * @param nonstandardHeaders empty INonStandardHeader[] for any detected nonstandard headers
 * @returns true if detects Breaking Self-Descriptiveness antipattern
 */
export const isBreakingSelfDescriptiveness = (
  requestHeaders: IHeadersObject,
  responseHeaders: IHeadersObject,
  nonstandardHeaders: INonStandardHeader[]
): boolean => {
  const requestHeaderKeys = Object.keys(requestHeaders)
  const responseHeaderKeys = Object.keys(responseHeaders)

  for (const headerKey of requestHeaderKeys)
    if (!getStandardRequestHeaders().includes(headerKey))
      registerHeader(nonstandardHeaders, 'Request Header', headerKey)

  for (const headerKey of responseHeaderKeys)
    if (!getStandardResponseHeaders().includes(headerKey))
      registerHeader(nonstandardHeaders, 'Response Header', headerKey)

  return nonstandardHeaders.length !== 0
}

/**
 * @param body response body
 * @param httpMethod request method
 * @param responseHeaders response headers
 * @returns true if detects Forgetting Hypermedia antipattern
 */
export const isForgettingHypermedia = (
  body: object,
  httpMethod: string,
  responseHeaders: IHeadersObject
): boolean => {
  const bodyKeys: string[] = getAllKeys(body)

  return (
    (httpMethod === GET && !containsLinks(bodyKeys)) ||
    (httpMethod === POST &&
      !containsHeaderLowercasedOrCapitalized(responseHeaders, 'Location') &&
      !containsLinks(bodyKeys))
  )
}

/**
 * @param httpMethod request method
 * @param requestHeaders request headers
 * @param responseHeaders response headers
 * @returns true if detects Ignoring Caching antipattern
 */
export const isIgnoringCaching = (
  httpMethod: string,
  requestHeaders: IHeadersObject,
  responseHeaders: IHeadersObject
): boolean => {
  if (httpMethod !== GET) return false

  if (
    !containsHeaderLowercasedOrCapitalized(responseHeaders, 'Etag') ||
    !containsHeaderLowercasedOrCapitalized(responseHeaders, 'Cache-Control')
  )
    return true

  const clientCaching = getHeaderValue(requestHeaders, 'Cache-Control')
  const serverCaching = getHeaderValue(responseHeaders, 'Cache-Control')

  return (
    clientCaching === 'no-cache' ||
    clientCaching === 'no-store' ||
    serverCaching === 'no-cache' ||
    serverCaching === 'no-store'
  )
}

/**
 * @param requestHeaders request headers
 * @param responseHeaders response headers
 * @returns true if detects Ignoring MIME Type antipattern
 */
export const isIgnoringMIMEType = (
  requestHeaders: IHeadersObject,
  responseHeaders: IHeadersObject
): boolean => {
  const acceptedMIMETypes: string[] = getHeaderValue(requestHeaders, 'Accept')
  const contentType: string = getHeaderValue(responseHeaders, 'Content-Type')

  return (
    !isAcceptedMIMEType(contentType, acceptedMIMETypes) &&
    !isStandardMIMEType(contentType)
  )
}

// TODO add js docs
export const isIgnoringStatusCode = (
  httpMethod: HTTPMethods,
  statusCode: number,
  statusText: string,
  standardStatusCombos: IStatusCombo[]
): boolean => {
  // TODO wrong, doesn't work properly

  // console.log(httpMethod)
  // console.log(statusCode)
  // console.log(statusText)
  // console.log(standardStatusCombos)

  // TODO put this in helper func
  const statusCombo: IStatusCombo | undefined = standardStatusCombos.filter(
    (combo) => combo.code[0] === statusCode.toString()
  )[0]

  // console.log(!statusCombo)
  // console.log(statusText.toUpperCase() !== statusCombo.description[0])
  // console.log(!statusCombo.method.includes(httpMethod))

  // TODO abstract this
  return (
    !statusCombo ||
    statusText.toUpperCase() !== statusCombo.description[0] ||
    !statusCombo.method.includes(httpMethod)
  )
}

/**
 * @param headers response headers
 * @returns true if detects Misusing Cookies antipattern
 */
export const isMisusingCookies = (
  requestHeaders: IHeadersObject,
  responseHeaders: IHeadersObject
): boolean =>
  containsCookieHeader(requestHeaders) || containsCookieHeader(responseHeaders)
