import IHeadersObject from '../interfaces/IHeadersObject'
import INonStandardHeader from '../interfaces/INonStandardHeader'
import { GET, POST, PUT, PATCH, DELETE } from '../utils/HTTPMethods'
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
  isStandardMIMEType,
  containsHeaderLowercasedOrCapitalized,
  getHeaderValue,
  containsCookieHeader,
} from './detectorHelpers'

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

  // TODO also change to check, includes here, simple enough
  // TODO hmm, server won't return */*...
  return (
    // TODO isAcceptedMIMEType(contentType, acceptedMIMETypes)
    !acceptedMIMETypes.includes(contentType) && !isStandardMIMEType(contentType)
  )
}

/**
 * @param httpMethod request method
 * @param statusCode
 * @returns true if detects Ignoring Status Code antipattern
 */
export const isIgnoringStatusCode = (
  httpMethod: string,
  statusCode: number
): boolean => {
  // TODO this function needs to be fixed still
  // ask for list of appropriate combinations of:
  // httpMethod, statusCode and statusText

  switch (httpMethod) {
    case GET:
      return !GETStatuses().includes(statusCode)
    case POST:
      return !POSTStatuses().includes(statusCode)
    case PUT:
      return !PUTStatuses().includes(statusCode)
    case PATCH:
      return !PATCHStatuses().includes(statusCode)
    case DELETE:
      return !DELETEStatuses().includes(statusCode)
    default:
      return false
  }
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
