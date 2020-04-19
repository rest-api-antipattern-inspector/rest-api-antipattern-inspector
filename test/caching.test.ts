import { isIgnoringCaching } from '../src/lib/designAntipatternDetectors'
import { GET, POST, PUT, PATCH, DELETE } from '../src/utils/HTTPMethods'

// TODO mention full coverage of all branches, statements etc of detector functions in report
// with image

// TODO 2, most tests are slightly broken now, many require both req & res headers

///

// FALSE

///

test('Ignoring Caching: false, post request', () => {
  expect(isIgnoringCaching(POST, {})).toBeFalsy()
})

test('Ignoring Caching: false, PUT request', () => {
  expect(isIgnoringCaching(PUT, {})).toBeFalsy()
})

test('Ignoring Caching: false, PATCH request', () => {
  expect(isIgnoringCaching(PATCH, {})).toBeFalsy()
})

test('Ignoring Caching: false, DELETE request', () => {
  expect(isIgnoringCaching(DELETE, {})).toBeFalsy()
})

test('Ignoring Caching: false, Capitalized headers', () => {
  expect(
    isIgnoringCaching(GET, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'public',
    })
  ).toBeFalsy()
})

test('Ignoring Caching: false, lowecase etag', () => {
  expect(
    isIgnoringCaching(GET, {
      etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'public',
    })
  ).toBeFalsy()
})

test('Ignoring Caching: false, lowecase cache-control', () => {
  expect(
    isIgnoringCaching(GET, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'cache-control': 'public',
    })
  ).toBeFalsy()
})

///

// TRUE

///

test('Ignoring Caching: true, missing Etag', () => {
  expect(
    isIgnoringCaching(GET, {
      'Cache-Control': 'public',
    })
  ).toBeTruthy()
})

test('Ignoring Caching: true, missing Cache-Control', () => {
  expect(
    isIgnoringCaching(GET, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
    })
  ).toBeTruthy()
})

test('Ignoring Caching: true, no-cache', () => {
  expect(
    isIgnoringCaching(GET, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'no-cache',
    })
  ).toBeTruthy()
})

test('Ignoring Caching: true, no-store', () => {
  expect(
    isIgnoringCaching(GET, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'no-store',
    })
  ).toBeTruthy()
})
