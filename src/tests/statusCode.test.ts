import FakeResponse from './FakeResponse'
import { isIgnoringStatusCode } from '../lib/designAntipatternsDetectors'

// TODO add more elaborate tests for status code

test('Ignoring Status Code: true, HTTP Post with status code 200', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'POST')
  ).toBeTruthy()
})

test('Ignoring Status Code: false, HTTP Post with status code 201', () => {
  const responseStub = new FakeResponse(201, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'POST')
  ).toBeFalsy()
})

test('Ignoring Status Code: false, HTTP GET with status code 200', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'GET')
  ).toBeFalsy()
})

test('Ignoring Status Code: true, HTTP GET with status code 201', () => {
  const responseStub = new FakeResponse(201, '', [])
    .responseStub

  expect(
    isIgnoringStatusCode(responseStub, 'GET')
  ).toBeTruthy()
})
