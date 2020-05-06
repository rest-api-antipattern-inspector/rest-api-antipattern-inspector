import IHeadersObject from '../interfaces/IHeadersObject'
import INonStandardHeader from '../interfaces/INonStandardHeader'
import { GET, POST } from '../utils/HTTPMethods'
import { HTTPMethods } from '../enums/HTTPMethods'
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
  containsHeader,
  getHeaderValue,
  getHeaderValues,
  containsCookieHeader,
  isValidStatusCombo,
  isNoCacheOrNoStore,
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
    if (!getStandardRequestHeaders().includes(headerKey.toLowerCase()))
      registerHeader(nonstandardHeaders, 'Request Header', headerKey)

  for (const headerKey of responseHeaderKeys)
    if (!getStandardResponseHeaders().includes(headerKey.toLowerCase()))
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
      !containsHeader(responseHeaders, 'Location') &&
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

  const clientCaching = getHeaderValue(requestHeaders, 'Cache-Control')
  const serverCaching = getHeaderValue(responseHeaders, 'Cache-Control')

  return (
    (!containsHeader(responseHeaders, 'Cache-Control') ||
      isNoCacheOrNoStore(clientCaching) ||
      isNoCacheOrNoStore(serverCaching)) &&
    !containsHeader(responseHeaders, 'Etag')
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
  const acceptedMIMETypes = getHeaderValues(requestHeaders, 'Accept')
  const contentType = getHeaderValue(responseHeaders, 'Content-Type')

  return (
    !contentType ||
    !isStandardMIMEType(contentType) ||
    !isAcceptedMIMEType(contentType, acceptedMIMETypes)
  )
}

/**
 *
 * @param httpMethod request method
 * @param statusCode
 * @param statusText
 * @param standardStatusCombos standard combinations of httpMethod, statusCode & statusText
 */
export const isIgnoringStatusCode = (
  httpMethod: HTTPMethods,
  statusCode: number,
  statusText: string,
  standardStatusCombos: IStatusCombo[]
): boolean =>
  // TODO breaks for patch, patch not included in xml, fix this
  // ignore check if patch in function
  !isValidStatusCombo(httpMethod, statusCode, statusText, standardStatusCombos)

/**
 * @param headers response headers
 * @returns true if detects Misusing Cookies antipattern
 */
export const isMisusingCookies = (
  requestHeaders: IHeadersObject,
  responseHeaders: IHeadersObject
): boolean =>
  containsCookieHeader(requestHeaders) || containsCookieHeader(responseHeaders)
