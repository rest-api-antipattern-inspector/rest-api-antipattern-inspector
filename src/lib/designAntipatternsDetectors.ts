import MIMETypes from './MIMETypes'
import IHeadersObject from '../interfaces/IHeadersObject'
import { GET, POST, PUT, PATCH, DELETE } from './constants'
import HttpHeaders from './StandardHTTPHeaders'

// TODO unit test all of this

// TODO do put low-level things into functions, extract etc
// make functions small and readable, only antipattern stuff should remain

/**
 * @param headers response headers
 * @returns true if detects Breaking Self-Descriptiveness antipattern
 */
export const isBreakingSelfDescriptiveness = (headers: IHeadersObject): boolean => {
  const responseHeaderKeys: string[] = Object.keys(headers)

  for (const headerKey of responseHeaderKeys) {
    if (!isStandardHeader(headerKey)) {
      console.log('Non standard header:', headerKey)
      return true
    }
  }

  return false
}

function isStandardHeader(headerKey: string): boolean {
  return HttpHeaders.includes(headerKey)
}

/**
 * @param body response body
 * @param httpMethod request method
 * @param headers response headers
 * @returns true if detects Forgetting Hypermedia antipattern
 */
export const isForgettingHypermedia = (body: string, httpMethod: string, headers: IHeadersObject): boolean => {
  // TODO
  // if post but no location automatically antipattern
  if (httpMethod === POST && Object.keys(headers).includes('Location')) {
    return false
  }

  const parts = body.split('"')

  // antipattern if body does not contains any keys called "link", "links" or "href"
  return !hasLinkTerm(parts)
}

// TODO perhaps put all of this in just the one function
function hasLinkTerm(parts: string[]) {
  for (const part of parts) {
    if (isLinkTerm(part)) return true
  }

  return false
}

function isLinkTerm(part: string): boolean {
  return part === 'link' || part === 'links' || part === 'href'
}

export const isIgnoringCaching = (httpMethod: string, headers: IHeadersObject): boolean => {
  if (httpMethod !== GET) return false

  // antipattern if Etag or Cache-Control headers are missing
  if (!headers['Etag'] || headers['Cache-Control']) return true

  const cacheControlElements = headers['Cache-Control'].split(', ')

  return cacheControlElements.includes('no-cache') || cacheControlElements.includes('no-store')
}

export const isIgnoringMIMEType = (headers: IHeadersObject): boolean => {
  // antipattern if content-type doesn't include a standard mime type
  return !MIMETypes.some((type) => headers['content-type'].includes(type))
}

export const isIgnoringStatusCode = (httpMethod: string, statusCode: number): boolean => {
  // TODO perhaps check this more thoroughly, check for acceptable status code for various http methods
  return httpMethod !== GET && statusCode === 200
}

export const isMisusingCookies = (headers: IHeadersObject): boolean => {
  // antipattern if there is a cookie or set-cookie header
  return headers['cookie'] !== undefined || headers['set-cookie'] !== undefined
}
