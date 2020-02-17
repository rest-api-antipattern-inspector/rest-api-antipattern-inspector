import { Response } from 'node-fetch'
import ResponseMeta from '../models/ResponseMeta'
import MIMETypes from './MIMETypes'

export const storeResponseMeta = (
  uri: string,
  res: Response,
  httpMethod: string,
  usesExpectedHTTPMethod: boolean,
  is200ExpectedStatusCode: boolean
) => {
  const responseMeta = new ResponseMeta({
    sessionID: process.env.SESSION_ID,
    uri,

    isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(
      res,
      httpMethod
    ),

    isIgnoringCaching: isIgnoringCaching(res, httpMethod),

    isIgnoringMIMEType: isIgnoringMIMEType(res),

    isIgnoringStatusCode: isIgnoringStatusCode(
      res,
      is200ExpectedStatusCode
    ),

    isMisusingCookies: isMisusingCookies(res),

    httpMethod: httpMethod,
    isUsingWrongHTTPMethod: !usesExpectedHTTPMethod,
  })

  console.log(responseMeta)

  // TODO write to file instead of db
  responseMeta.save(() => {
    console.log(
      `Stored info for ${uri} with session ID ${process.env.SESSION_ID}`
    )
  })
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

function isIgnoringCaching(
  res: Response,
  httpMethod: string
) {
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

function isIgnoringMIMEType(res: Response) {
  return !MIMETypes.some((type) =>
    res.headers.get('content-type')?.includes(type)
  )
}

function isIgnoringStatusCode(
  res: Response,
  is200ExpectedStatusCode: boolean
) {
  return !is200ExpectedStatusCode && res.status !== 200
}

function isMisusingCookies(res: Response) {
  return (
    res.headers.has('set-cookie') ||
    res.headers.has('cookie')
  )
}
