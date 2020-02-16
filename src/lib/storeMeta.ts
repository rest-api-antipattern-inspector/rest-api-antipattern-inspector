import { Response } from 'node-fetch'
import ResponseMeta from '../models/ResponseMeta'
import MIMETypes from './MIMETypes'

export const storeResponseMeta = (
  uri: string,
  res: Response,
  httpMethod: string,
  // TODO: check this:
  usesExpectedHTTPMethod: boolean,
  expectedStatusCode: number
) => {
  // TODO: store more types of info
  const responseMeta = new ResponseMeta({
    sessionID: process.env.SESSION_ID,
    uri,
    status: res.status,
  })

  console.log(responseMeta)

  /*
  console.log(
    `\nUri: ${uri}\nSession ID: ${process.env.SESSION_ID}`
  )

  if (isIgnoringCaching(res, httpMethod)) {
    console.log('Ignoring caching detected')
  }

  if (isBreakingSelfDescriptiveness(res, httpMethod)) {
    console.log('Breaking Self Descriptiveness detected')
  }
  */

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
