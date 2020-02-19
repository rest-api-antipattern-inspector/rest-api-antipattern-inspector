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

  if (httpMethod.toUpperCase() === 'GET') {
    encouragedHeaders.push('Last-Modified')
  }

  if (
    httpMethod.toUpperCase() === 'POST' ||
    httpMethod.toUpperCase() === 'PUT' ||
    httpMethod.toUpperCase() === 'PATCH'
  ) {
    encouragedHeaders.push('Location')
  }

  for (const header of encouragedHeaders) {
    if (!res.headers.has(header)) return true
  }

  return false
}

// TODO this doesn't work yet
export const isForgettingHypermedia = (
  res: IResponse,
  body: object,
  httpMethod: string
): boolean => {
  // TODO also check location if post

  let hasLinkKeyFlag = false
  searchKeys(body, hasLinkKeyFlag)
  return hasLinkKeyFlag
}

/**
 * Inspired by method described here:
 * https://stackoverflow.com/a/11922384/9374593
 * @param obj
 */
function searchKeys(
  obj: any,
  hasLinkKeyFlag: boolean
): void {
  const keys = []

  for (const key in obj) {
    const value = obj[key]

    typeof value === 'object'
      ? keys.push(searchKeys(value, hasLinkKeyFlag))
      : setLinkKeyFlag(key, hasLinkKeyFlag)
  }
}

function setLinkKeyFlag(
  key: string,
  hasLinkKeyFlag: boolean
) {
  if (isLinkKey(key)) {
    hasLinkKeyFlag === true
  }
  // console.log(key + ' ' + hasLinkKeyFlag)
}

function isLinkKey(key: string) {
  console.log(key)
  console.log(
    key === 'link' || key === 'links' || key === 'href'
  )
  return key === 'link' || key === 'links' || key === 'href'
}

// TODO function that finds citation, all letters until next citation

export const isIgnoringCaching = (
  res: IResponse,
  httpMethod: string
): boolean => {
  const cacheControlElements = res.headers
    .get('Cache-Control')
    ?.split(', ')

  return (
    httpMethod.toUpperCase() !== 'GET' || // Only checks for ignoring caching antipattern in GET requests
    !res.headers.has('Etag') ||
    !res.headers.has('Cache-Control') ||
    (cacheControlElements !== undefined &&
      cacheControlElements?.includes('no-cache')) ||
    (cacheControlElements !== undefined &&
      cacheControlElements?.includes('no-store'))
  )
}

export const isIgnoringMIMEType = (res: IResponse) => {
  return !MIMETypes.some((type) =>
    res.headers.get('content-type')?.includes(type)
  )
}

export const isIgnoringStatusCode = (
  res: IResponse,
  httpMethod: string
) => {
  // TODO perhaps check this more thoroughly, check for acceptable status code for various http methods
  return (
    httpMethod.toUpperCase() !== 'GET' && res.status === 200
  )
}

export const isMisusingCookies = (res: IResponse) => {
  return (
    res.headers.has('set-cookie') ||
    res.headers.has('cookie')
  )
}
