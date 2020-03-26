import MIMETypes from './MIMETypes'
import IHeadersObject from '../interfaces/IHeadersObject'
import { types } from '@babel/core'

// TODO unit test all of this

export const isBreakingSelfDescriptiveness = (
  headers: IHeadersObject,
  httpMethod: String
) => {
  // TODO: ignore Etag here, covered in ignoring caching check
  // for now based on this: https://www.oreilly.com/library/view/rest-api-design/9781449317904/ch04.html

  const encouragedHeaders = [
    'Content-Type',
    'Content-Length',
  ]

  if (httpMethod === 'GET') {
    encouragedHeaders.push('Last-Modified')
  }

  if (
    httpMethod === 'POST' ||
    httpMethod === 'PUT' ||
    httpMethod === 'PATCH'
  ) {
    encouragedHeaders.push('Location')
  }

  // if they use any headers except these then it's an antipattern
  // they don't need to use all headers

  // store metadata

  for (const header of encouragedHeaders) {
    if (!Object.keys(headers).includes(header)) return true
  }

  return false
}

export const isForgettingHypermedia = (
  headers: IHeadersObject,
  body: string,
  httpMethod: string
) => {
  // TODO
  // if post but no location automatically antipattern
  if (
    httpMethod === 'POST' &&
    Object.keys(headers).includes('Location')
  ) {
    return false
  }
  // console.log(body)
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
  return (
    part === 'link' || part === 'links' || part === 'href'
  )
}

export const isIgnoringCaching = (
  httpMethod: string,
  headers: IHeadersObject
): boolean => {
  if (httpMethod !== 'GET') return false

  // antipattern if Etag or Cache-Control headers are missing
  if (!headers['Etag'] || headers['Cache-Control']) {
    return true
  }

  const cacheControlElements = headers[
    'Cache-Control'
  ].split(', ')

  return (
    cacheControlElements.includes('no-cache') ||
    cacheControlElements.includes('no-store')
  )
}

export const isIgnoringMIMEType = (
  headers: IHeadersObject
) => {
  // antipattern if content-type doesn't include
  // a standard mime type
  return !MIMETypes.some((type) =>
    headers['content-type'].includes(type)
  )
}

export const isIgnoringStatusCode = (
  httpMethod: string,
  statusCode: number
) => {
  // TODO perhaps check this more thoroughly, check for acceptable status code for various http methods
  return httpMethod !== 'GET' && statusCode === 200
}

export const isMisusingCookies = (
  headers: IHeadersObject
) => {
  // antipattern if there is a cookie or set-cookie header
  return headers['cookie'] || headers['set-cookie']
}
