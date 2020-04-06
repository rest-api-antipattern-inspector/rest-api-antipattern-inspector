import { isIgnoringStatusCode } from '../src/lib/designAntipatternsDetectors'
import { GET, POST, PUT, PATCH, DELETE } from '../src/lib/constants'

// info about status codes: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

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
