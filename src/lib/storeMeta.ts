import { Response } from 'node-fetch'
import ResponseMeta from '../models/ResponseMeta'

export const storeResponseMeta = (
  uri: string,
  res: Response,
  bodyText: string,
  httpMethod: String,
  usesExpectedHTTPMethod: boolean
) => {
  // TODO: store more types of info
  const responseMeta = new ResponseMeta({
    sessionID: process.env.SESSION_ID,
    uri,
    status: res.status,
  })

  const responseValues: string[] = []

  responseValues.push(
    ...getHeaderValues(res),
    ...bodyText.split('"')
  )

  console.log(responseValues)

  const cacheInfo = isIgnoringCaching(res, httpMethod)
    ? 'Ignoring Caching'
    : 'NOT Ignoring Caching'

  console.log(cacheInfo)

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

function getHeaderValues(res: Response) {
  const headerValues: string[] = []

  res.headers.forEach((value) => {
    headerValues.push(...value.split(', '))
  })

  return headerValues
}

// TODO unit test this

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
  httpMethod: String
) {
  // TODO only if get

  const cacheControlElements = res.headers
    .get('Cache-Control')
    ?.split(', ')

  // TODO also get request headers, or maybe not...

  return (
    httpMethod.toUpperCase() !== 'GET' || // Only checks for ignoring caching antipattern in GET requests
    !res.headers.has('Etag') ||
    !res.headers.has('Cache-Control') ||
    cacheControlElements?.includes('no-cache') ||
    cacheControlElements?.includes('no-store')
  )
}
