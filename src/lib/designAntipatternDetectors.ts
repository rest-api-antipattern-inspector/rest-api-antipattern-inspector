import IHeadersObject from '../interfaces/IHeadersObject'
import { GET, POST, PUT, PATCH, DELETE } from '../utils/HTTPMethods'
import {
  GETStatuses,
  POSTStatuses,
  PUTStatuses,
  PATCHStatuses,
  DELETEStatuses,
} from './statusCodes'
import {
  isStandardHeader,
  getAllKeys,
  containsLinks,
  isStandardMIMEType,
  containsHeaderLowercasedOrCapitalized,
  getHeaderValue,
  containsCookieHeader,
} from './detectorHelpers'

// TODO change these

/**
 * @param requestHeaders request headers
 * @param responseHeaders response headers
 * @param nonstandardHeaders empty string[] for any detected nonstandard headers
 * @returns true if detects Breaking Self-Descriptiveness antipattern
 */
export const isBreakingSelfDescriptiveness = (
  requestHeaders: IHeadersObject,
  responseHeaders: IHeadersObject,
  nonstandardHeaders: string[]
): boolean => {
  const headerKeys: string[] = [].concat(
    Object.keys(requestHeaders),
    Object.keys(responseHeaders)
  )

  for (const headerKey of headerKeys) {
    if (!isStandardHeader(headerKey)) {
      nonstandardHeaders.push(headerKey)
    }
  }

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

  const headers = [].concat(requestHeaders, responseHeaders)

  if (
    !containsHeaderLowercasedOrCapitalized(headers, 'Etag') ||
    !containsHeaderLowercasedOrCapitalized(headers, 'Cache-Control')
  ) {
    return true
  }

  const caching = getHeaderValue(headers, 'Cache-Control')

  return caching === 'no-cache' || caching === 'no-store'
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
  // TODO remove console.log, just for debugging now
  console.log(acceptedMIMETypes)
  const contentType: string = getHeaderValue(responseHeaders, 'Content-Type')

  return (
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
export const isMisusingCookies = (headers: IHeadersObject): boolean =>
  containsCookieHeader(headers)
