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
) => {
  const result = getAllProperties(body)
  console.log(result)
}

/**
 * Inspired by method described here:
 * https://stackoverflow.com/a/11922384/9374593
 * @param obj
 */
function getAllProperties(obj: any): any | void {
  const properties = []

  for (const property in obj) {
    const value = obj[property]

    typeof value === 'object'
      ? properties.push(getAllProperties(value))
      : // TODO here, check if property is correct property
        // i.e. link/links/href, if so can set flag bool
        properties.push(property)
  }

  return properties
}

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
