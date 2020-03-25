import MIMETypes from './MIMETypes'
import IResponse from '../interfaces/IResponse'

// TODO unit test all of this

export const isBreakingSelfDescriptiveness = (
  res: IResponse,
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
    if (!res.headers.has(header)) return true
  }

  return false
}

export const isForgettingHypermedia = (
  res: IResponse,
  body: string,
  httpMethod: string
) => {
  // TODO
  // if post but no location automatically antipattern
  if (
    httpMethod === 'POST' &&
    res.headers.has('Location')
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
  res: IResponse,
  httpMethod: string
): boolean => {
  const cacheControlElements = res.headers
    .get('Cache-Control')
    ?.split(', ')

  return (
    httpMethod !== 'GET' || // Only checks for ignoring caching antipattern in GET requests
    // TODO: Etag not enough, etag and no no-cache/no-store
    !res.headers.has('Etag') ||
    !res.headers.has('Cache-Control') ||
    (cacheControlElements !== undefined &&
      cacheControlElements?.includes('no-cache')) ||
    (cacheControlElements !== undefined &&
      cacheControlElements?.includes('no-store'))
  )
}

export const isIgnoringMIMEType = (res: IResponse) => {
  // console.log(res.headers.get('content-type'))
  return !MIMETypes.some((type) =>
    res.headers.get('content-type')?.includes(type)
  )
}

export const isIgnoringStatusCode = (
  res: IResponse,
  httpMethod: string
) => {
  // TODO perhaps check this more thoroughly, check for acceptable status code for various http methods
  return httpMethod !== 'GET' && res.status === 200
}

export const isMisusingCookies = (res: IResponse) => {
  return (
    res.headers.has('set-cookie') ||
    res.headers.has('cookie')
  )
}
