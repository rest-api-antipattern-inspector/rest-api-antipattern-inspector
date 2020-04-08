import { isIgnoringCaching } from '../src/lib/designAntipatternsDetectors'
import { GET, POST, PUT, PATCH, DELETE } from '../src/lib/constants'

// TODO more tests here

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

test('Ignoring Caching: false, Capitalized headers', () => {
  expect(
    isIgnoringCaching(GET, {
      Etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
      'Cache-Control': 'public',
    })
  ).toBeFalsy()
})

///

// TRUE

///
