import { Response } from 'node-fetch'
import { Document } from 'mongoose'
import fs from 'fs'
import ResponseMeta from '../models/ResponseMeta'
import MIMETypes from './MIMETypes'

export const storeResponseMeta = async (
  uri: string,
  responsePromise: Promise<Response>,
  httpMethod: string
) => {
  const res = await responsePromise
  const body = await res.text()

  const responseMeta = new ResponseMeta({
    sessionID: process.env.SESSION_ID,
    uri,
    httpMethod: httpMethod,

    isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(
      res,
      httpMethod
    ),

    isIgnoringCaching: isIgnoringCaching(res, httpMethod),

    isIgnoringMIMEType: isIgnoringMIMEType(res),

    isIgnoringStatusCode: isIgnoringStatusCode(
      res,
      httpMethod
    ),

    isMisusingCookies: isMisusingCookies(res),
  })

  writeToFile(responseMeta)

  console.log(
    `Stored info for ${uri} with session ID ${process.env.SESSION_ID}`
  )
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
  httpMethod: string
) {
  // TODO perhaps check this more thoroughly, check for acceptable status code for various http methods
  return (
    httpMethod.toUpperCase() !== 'GET' && res.status === 200
  )
}

function isMisusingCookies(res: Response) {
  return (
    res.headers.has('set-cookie') ||
    res.headers.has('cookie')
  )
}

function writeToFile(responseMeta: Document) {
  const responses = JSON.parse(
    fs.readFileSync('responses.json', 'utf8')
  )

  responses.push(responseMeta)

  fs.writeFileSync(
    'responses.json',
    JSON.stringify(responses)
  )
}
