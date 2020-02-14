import { Response } from 'node-fetch'
import ResponseMeta from '../models/ResponseMeta'

export const storeResponseMeta = (
  uri: string,
  res: Response,
  bodyText: string,
  httpMethod: string,
  usesExpectedHTTPMethod: boolean
) => {
  // TODO: store more types of info
  const responseMeta = new ResponseMeta({
    sessionID: process.env.SESSION_ID,
    uri,
    status: res.status,
  })

  const cacheInfo = isIgnoringCaching(res, httpMethod)
    ? 'Ignoring Caching'
    : 'NOT Ignoring Caching'

  console.log(cacheInfo)

  const hyperMediaInfo = isForgettingHypermedia(
    res,
    bodyText,
    httpMethod
  )
    ? 'Forgetting Hypermedia'
    : 'NOT Forgetting Hypermedia'

  console.log(hyperMediaInfo)

  const selfDescriptivenessInfo = isBreakingSelfDescriptiveness(
    res,
    httpMethod
  )
    ? 'Breaks Self Descriptiveness'
    : 'Does not break Self Descriptiveness'

  console.log(selfDescriptivenessInfo)

  /*
  responseMeta.save(() => {
    console.log(
      `Stored info for ${uri} with session ID ${process.env.SESSION_ID}`
    )
  })
  */
}

// TODO unit test all of this

function isBreakingSelfDescriptiveness(
  res: Response,
  httpMethod: String
) {
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

function isForgettingHypermedia(
  res: Response,
  bodyText: string,
  httpMethod: string
) {
  if (httpMethod.toUpperCase() === 'POST') {
    return !res.headers.has('Location')
  }

  const responseValues: string[] = []

  responseValues.push(
    ...getHeaderValues(res),
    ...bodyText.split('"')
  )

  for (const value of responseValues) {
    if (isValidURL(value)) return false
  }

  return true
}

function getHeaderValues(res: Response) {
  const headerValues: string[] = []

  res.headers.forEach((value) => {
    headerValues.push(...value.split(', '))
  })

  return headerValues
}

/**
 * Inspired by: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 */
function isValidURL(str: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  )

  return !!pattern.test(str)
}

function isIgnoringCaching(
  res: Response,
  httpMethod: string
) {
  // TODO only if get

  const cacheControlElements = res.headers
    .get('Cache-Control')
    ?.split(', ')

  return (
    httpMethod.toUpperCase() !== 'GET' || // Only checks for ignoring caching antipattern in GET requests
    !res.headers.has('Etag') ||
    !res.headers.has('Cache-Control') ||
    cacheControlElements?.includes('no-cache') ||
    cacheControlElements?.includes('no-store')
  )
}
