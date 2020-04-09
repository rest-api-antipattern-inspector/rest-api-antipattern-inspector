import MIMETypes from './MIMETypes'
import IHeadersObject from '../interfaces/IHeadersObject'
import { GET, POST, PUT, PATCH, DELETE } from './constants'
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
  cookieHeaders,
  containsHeaderLowercasedOrCapitalized,
  getHeaderValue,
} from './detectorHelpers'

/**
 * @param headers response headers
 * @param nonstandardHeaders empty string[] for any detected nonstandard headers
 * @returns true if detects Breaking Self-Descriptiveness antipattern
 */
export const isBreakingSelfDescriptiveness = (
  headers: IHeadersObject,
  nonstandardHeaders: string[]
): boolean => {
  const responseHeaderKeys: string[] = Object.keys(headers)

  for (const headerKey of responseHeaderKeys) {
    if (!isStandardHeader(headerKey)) {
      nonstandardHeaders.push(headerKey)
    }
  }

  return nonstandardHeaders.length !== 0
}

/**
 * @param body response body
 * @param httpMethod request method
 * @param headers response headers
 * @returns true if detects Forgetting Hypermedia antipattern
 */
export const isForgettingHypermedia = (
  body: object,
  httpMethod: string,
  headers: IHeadersObject
): boolean => {
  const bodyKeys: string[] = getAllKeys(body)

  return (
    (httpMethod === GET && !containsLinks(bodyKeys)) ||
    (httpMethod === POST &&
      !containsHeaderLowercasedOrCapitalized(headers, 'Location') &&
      !containsLinks(bodyKeys))
  )
}

/**
 * @param httpMethod request method
 * @param headers response headers
 * @returns true if detects Ignoring Caching antipattern
 */
export const isIgnoringCaching = (
  httpMethod: string,
  headers: IHeadersObject
): boolean => {
  if (httpMethod !== GET) return false

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
 * @param headers response headers
 * @returns true if detects Ignoring MIME Type antipattern
 */
export const isIgnoringMIMEType = (headers: IHeadersObject): boolean => {
  const contentType = getHeaderValue(headers, 'Content-Type')

  // TODO break out & replace comment
  // antipattern if Content-Type/content-type header is missing or doesn't include a standard mime type
  return !contentType || !MIMETypes.some((type) => contentType.includes(type))
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
export const isMisusingCookies = (headers: IHeadersObject): boolean => {
  // TODO break out in to descriptive helper function
  for (let cookieHeader of cookieHeaders) {
    if (headers[cookieHeader] !== undefined) return true
  }

  return false
}
