import MIMETypes from './MIMETypes'
import IHeadersObject from '../interfaces/IHeadersObject'
import { GET, POST, PUT, PATCH, DELETE } from './constants'
import HttpHeaders from './HttpHeaders'

// TODO unit test all of this

/**
 *
 * @param httpMethod
 * @param headers
 */
export const isBreakingSelfDescriptiveness = (headers: IHeadersObject): boolean => {
  const responseHeaderKeys = Object.keys(headers)

  for (const headerKey of responseHeaderKeys) {
  }
}

/**
 *
 * @param body
 * @param httpMethod
 * @param headers
 */
export const isForgettingHypermedia = (body: string, httpMethod: string, headers: IHeadersObject): boolean => {
  // TODO
  // if post but no location automatically antipattern
  if (httpMethod === POST && Object.keys(headers).includes('Location')) {
    return false
  }

  const parts = body.split('"')

  return !hasLinkTerm(parts)
}

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
  if (!headers['Etag'] || headers['Cache-Control']) {
    return true
  }

  const cacheControlElements = headers['Cache-Control'].split(', ')

  return cacheControlElements.includes('no-cache') || cacheControlElements.includes('no-store')
}

export const isIgnoringMIMEType = (headers: IHeadersObject): boolean => {
  // antipattern if content-type doesn't include
  // a standard mime type
  return !MIMETypes.some((type): boolean => headers['content-type'].includes(type))
}

export const isIgnoringStatusCode = (httpMethod: string, statusCode: number): boolean => {
  // TODO perhaps check this more thoroughly, check for acceptable status code for various http methods
  return httpMethod !== GET && statusCode === 200
}

export const isMisusingCookies = (headers: IHeadersObject): boolean => {
  // antipattern if there is a cookie or set-cookie header
  return headers['cookie'] !== undefined || headers['set-cookie'] !== undefined
}
