import FakeResponse from './FakeResponse'
import { isMisusingCookies } from '../lib/designAntipatternsDetectors'

test('Misusing Cookies: true, headers contain set-cookie', () => {
  const responseStub = new FakeResponse(200, '', [
    'set-cookie',
  ]).responseStub

  expect(isMisusingCookies(responseStub)).toBeTruthy()
})

test('Misusing Cookies: true, headers contain cookie', () => {
  const responseStub = new FakeResponse(200, '', ['cookie'])
    .responseStub

  expect(isMisusingCookies(responseStub)).toBeTruthy()
})

test('Misusing Cookies: false, headers does not contain cookie or set-cookie', () => {
  const responseStub = new FakeResponse(200, '', [
    'Content-Length',
  ]).responseStub

  expect(isMisusingCookies(responseStub)).toBeFalsy()
})

test('Misusing Cookies: false, empty headers', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(isMisusingCookies(responseStub)).toBeFalsy()
})
