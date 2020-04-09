import { isIgnoringStatusCode } from '../src/lib/designAntipatternDetectors'
import { GET, POST, PUT, PATCH, DELETE } from '../src/utils/HTTPMethods'

///

// TRUE

///

test('Ignoring Status Code: true, GET 201', () => {
  expect(isIgnoringStatusCode(GET, 201)).toBeTruthy()
})

test('Ignoring Status Code: true, POST 200', () => {
  expect(isIgnoringStatusCode(POST, 200)).toBeTruthy()
})

test('Ignoring Status Code: true, DELETE 201', () => {
  expect(isIgnoringStatusCode(DELETE, 201)).toBeTruthy()
})

///

// FALSE

///

test('Ignoring Status Code: false, GET 200', () => {
  expect(isIgnoringStatusCode(GET, 200)).toBeFalsy()
})

test('Ignoring Status Code: false, POST 201', () => {
  expect(isIgnoringStatusCode(POST, 201)).toBeFalsy()
})

test('Ignoring Status Code: false, PUT 201', () => {
  expect(isIgnoringStatusCode(PUT, 201)).toBeFalsy()
})

test('Ignoring Status Code: false, PUT 200', () => {
  expect(isIgnoringStatusCode(PUT, 200)).toBeFalsy()
})

test('Ignoring Status Code: false, PATCH 201', () => {
  expect(isIgnoringStatusCode(PATCH, 201)).toBeFalsy()
})

test('Ignoring Status Code: false, PATCH 200', () => {
  expect(isIgnoringStatusCode(PATCH, 200)).toBeFalsy()
})

test('Ignoring Status Code: false, DELETE 200', () => {
  expect(isIgnoringStatusCode(DELETE, 200)).toBeFalsy()
})

test('Ignoring Status Code: false, OPTIONS 200', () => {
  expect(isIgnoringStatusCode('OPTIONS', 200)).toBeFalsy()
})
