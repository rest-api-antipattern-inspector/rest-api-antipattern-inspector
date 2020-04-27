import { isBreakingSelfDescriptiveness } from '../src/lib/designAntipatternDetectors'
import {
  getStandardRequestHeaders,
  getStandardResponseHeaders,
} from '../src/lib/StandardHTTPHeaders'

// standard req & res headers with example values
// https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Standard_request_fields

const exampleReqHeader = {
  host: 'api.google.com',
  accept: 'application/json',
  Connection: 'close',
}

test('Looping through standard response headers: false', () => {
  const resHeaders = {}

  for (let header of getStandardResponseHeaders()) {
    resHeaders[header] = 'example-value'
    expect(
      isBreakingSelfDescriptiveness(exampleReqHeader, resHeaders, [])
    ).toBeFalsy()
  }
})

test('Looping through standard response headers, lowercased: false', () => {
  const resHeaders = {}

  for (let header of getStandardResponseHeaders()) {
    resHeaders[header.toLowerCase()] = 'example-value'
    expect(
      isBreakingSelfDescriptiveness(exampleReqHeader, resHeaders, [])
    ).toBeFalsy()
  }
})

test('Looping through standard request headers: false', () => {
  const reqHeaders = {}

  for (let header of getStandardRequestHeaders()) {
    reqHeaders[header] = 'example-value'
    expect(
      isBreakingSelfDescriptiveness(
        reqHeaders,
        { 'content-type': 'application/msword' },
        []
      )
    ).toBeFalsy()
  }
})

test('Looping through standard request headers, lowercased: false', () => {
  const reqHeaders = {}

  for (let header of getStandardRequestHeaders()) {
    reqHeaders[header.toLowerCase()] = 'example-value'
    expect(
      isBreakingSelfDescriptiveness(
        reqHeaders,
        { 'content-type': 'application/msword' },
        []
      )
    ).toBeFalsy()
  }
})

// TODO same w req

test('Some standard and some non-standard response headers: true', () => {
  expect(
    isBreakingSelfDescriptiveness(
      exampleReqHeader,
      {
        etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
        'cache-control': 'public',
        'x-custom-nonstandard-header': 'example-value',
      },
      []
    )
  )
})

test('Some standard and some non-standard request headers: true', () => {
  expect(
    isBreakingSelfDescriptiveness(
      {
        host: 'api.google.com',
        accept: 'application/json',
        Connection: 'close',
        'x-custom-nonstandard-request-header': 'example-value',
      },
      { 'content-type': 'application/msword' },
      []
    )
  )
})
