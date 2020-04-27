import { isIgnoringCaching } from '../src/lib/designAntipatternDetectors'
import { GET, POST, PUT, PATCH, DELETE } from '../src/utils/HTTPMethods'

// TODO mention full coverage of all branches, statements etc of detector functions in report
// with image

// TODO add some tests for req header

const exampleReqHeader = {
  host: 'api.google.com',
  accept: 'application/json',
  Connection: 'close',
}

///

// FALSE

///

test('Ignoring Caching: false, post request', () => {
  expect(isIgnoringCaching(POST, exampleReqHeader, {})).toBeFalsy()
})

test('Ignoring Caching: false, PUT request', () => {
  expect(isIgnoringCaching(PUT, exampleReqHeader, {})).toBeFalsy()
})

test('Ignoring Caching: false, PATCH request', () => {
  expect(isIgnoringCaching(PATCH, exampleReqHeader, {})).toBeFalsy()
})

test('Ignoring Caching: false, DELETE request', () => {
  expect(isIgnoringCaching(DELETE, exampleReqHeader, {})).toBeFalsy()
})

test('Ignoring Caching: false, Capitalized response headers', () => {
  expect(
    isIgnoringCaching(GET, exampleReqHeader, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'public',
    })
  ).toBeFalsy()
})

test('Ignoring Caching: false, lowecase etag', () => {
  expect(
    isIgnoringCaching(GET, exampleReqHeader, {
      etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'public',
    })
  ).toBeFalsy()
})

test('Ignoring Caching: false, lowecase cache-control', () => {
  expect(
    isIgnoringCaching(GET, exampleReqHeader, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'cache-control': 'public',
    })
  ).toBeFalsy()
})

test('Ignoring Caching: false, client side caching', () => {
  const reqHeader = {
    host: 'api.google.com',
    accept: 'application/json',
    Connection: 'close',
    'Cache-Control': 'public',
  }

  expect(
    isIgnoringCaching(GET, reqHeader, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
    })
  )
})

///

// TRUE

///

test('Ignoring Caching: true, missing Etag', () => {
  expect(
    isIgnoringCaching(GET, exampleReqHeader, {
      'Cache-Control': 'public',
    })
  ).toBeTruthy()
})

test('Ignoring Caching: true, missing Cache-Control', () => {
  expect(
    isIgnoringCaching(GET, exampleReqHeader, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
    })
  ).toBeTruthy()
})

test('Ignoring Caching: true, no-cache', () => {
  expect(
    isIgnoringCaching(GET, exampleReqHeader, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'no-cache',
    })
  ).toBeTruthy()
})

test('Ignoring Caching: true, no-store', () => {
  expect(
    isIgnoringCaching(GET, exampleReqHeader, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'no-store',
    })
  ).toBeTruthy()
})
