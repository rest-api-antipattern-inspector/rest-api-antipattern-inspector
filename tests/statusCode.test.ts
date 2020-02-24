import FakeResponse from './FakeResponse'
import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../src/lib/designAntipatternsDetectors'

// TODO add more elaborate tests for status code

test('Ignoring Status Code: true, HTTP Post with status code 200', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'pOst')
  ).toBeTruthy()
})

test('Ignoring Status Code: false, HTTP Post with status code 201', () => {
  const responseStub = new FakeResponse(201, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'pOst')
  ).toBeFalsy()
})

test('Ignoring Status Code: false, HTTP GET with status code 200', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'gEt')
  ).toBeFalsy()
})

test('Ignoring Status Code: true, HTTP GET with status code 201', () => {
  const responseStub = new FakeResponse(201, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'gEt')
  ).toBeTruthy()
})
