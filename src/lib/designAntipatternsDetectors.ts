import MIMETypes from './MIMETypes'
import IHeadersObject from '../interfaces/IHeadersObject'
import { GET, POST, PUT, PATCH, DELETE } from './constants'
import HttpHeaders from './StandardHTTPHeaders'

// TODO unit test all of this

// TODO do put low-level things into functions, extract etc
// make functions small and readable, only antipattern stuff should remain

/**
 * @function isBreakingSelfDescriptiveness
 * @param headers response headers
 * @param nonStandardHeaders empty string[] for any none detected standard headers
 * @returns true if detects Breaking Self-Descriptiveness antipattern
 */
export const isBreakingSelfDescriptiveness = (
  headers: IHeadersObject,
  nonStandardHeaders: string[]
): boolean => {
  const responseHeaderKeys: string[] = Object.keys(headers)

  for (const headerKey of responseHeaderKeys) {
    if (!isStandardHeader(headerKey)) {
      nonStandardHeaders.push(headerKey)
    }
  }

  return nonStandardHeaders.length !== 0
}

/**
 * @function isForgettingHypermedia
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
      !Object.keys(headers).includes('Location') &&
      !containsLinks(bodyKeys))
  )
}

/**
 * @function isIgnoringCaching
 * @param httpMethod request method
 * @param headers response headers
 * @returns true if detects Ignoring Caching antipattern
 */
export const isIgnoringCaching = (
  httpMethod: string,
  headers: IHeadersObject
): boolean => {
  if (httpMethod !== GET) return false

  // antipattern if Etag or Cache-Control headers are missing
  if (!headers['Etag'] || headers['Cache-Control']) return true

  const caching = headers['Cache-Control'].toLowerCase()

  return caching === 'no-cache' || caching === 'no-store'
}

export const isIgnoringMIMEType = (headers: IHeadersObject): boolean => {
  // antipattern if content-type doesn't include a standard mime type
  return !MIMETypes.some((type) => headers['content-type'].includes(type))
}

export const isIgnoringStatusCode = (
  httpMethod: string,
  statusCode: number
): boolean => {
  // TODO perhaps check this more thoroughly, check for acceptable status code for various http methods
  return httpMethod !== GET && statusCode === 200
}

export const isMisusingCookies = (headers: IHeadersObject): boolean => {
  // antipattern if there is a cookie or set-cookie header
  return headers['cookie'] !== undefined || headers['set-cookie'] !== undefined
}

// TODO move these helper functions elsewhere

function isStandardHeader(headerKey: string): boolean {
  return HttpHeaders.includes(headerKey)
}

function getAllKeys(obj: object): string[] {
  const keys: string[] = []

  /**
   * This inner function is inspired by this demo:
   * https://stackoverflow.com/a/25370536/9374593
   */
  function collectKeys(obj: any, properties: string[]): any | void {
    const result = []

    for (const key in obj) {
      const value = obj[key]

      properties.push(key)

      if (typeof value === 'object') {
        result.push(collectKeys(value, properties))
      } else {
        result.push(value)
      }
    }

    return result
  }

  collectKeys(obj, keys)
  return keys
}

function containsLinks(parts: string[]): boolean {
  for (const part of parts) {
    if (isLinkTerm(part)) return true
  }

  return false
}

function isLinkTerm(part: string): boolean {
  return part === 'link' || part === 'links' || part === 'href'
}
