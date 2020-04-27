import { isMisusingCookies } from '../src/lib/designAntipatternDetectors'

const exampleReqHeader = {
  host: 'api.google.com',
  accept: 'application/json',
  Connection: 'close',
}

test('Misusing Cookies: true, response headers contain set-cookie', () => {
  expect(
    isMisusingCookies(exampleReqHeader, { 'set-cookie': '🍪' })
  ).toBeTruthy()
})

test('Misusing Cookies: true, response headers contain set-cookie2', () => {
  expect(
    isMisusingCookies(exampleReqHeader, { 'set-cookie2': '🍪' })
  ).toBeTruthy()
})

test('Misusing Cookies: true, request headers contain set-cookie2', () => {
  const setCookie2reqHeader = {
    host: 'api.google.com',
    accept: 'application/json',
    Connection: 'close',
    'set-cookie2': '🍪',
  }

  expect(
    isMisusingCookies(setCookie2reqHeader, { Host: 'google.com' })
  ).toBeTruthy()
})

test('Misusing Cookies: true, response headers contain cookie', () => {
  expect(isMisusingCookies(exampleReqHeader, { cookie: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, response headers contain cookie2', () => {
  expect(isMisusingCookies(exampleReqHeader, { cookie2: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, response headers contain Set-Cookie', () => {
  expect(
    isMisusingCookies(exampleReqHeader, { 'Set-Cookie': '🍪' })
  ).toBeTruthy()
})

test('Misusing Cookies: true, response headers contain Set-Cookie2', () => {
  expect(
    isMisusingCookies(exampleReqHeader, { 'Set-Cookie2': '🍪' })
  ).toBeTruthy()
})

test('Misusing Cookies: true, response headers contain Cookie', () => {
  expect(isMisusingCookies(exampleReqHeader, { Cookie: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, request headers contain Cookie', () => {
  const CookieReqHeader = {
    host: 'api.google.com',
    accept: 'application/json',
    Connection: 'close',
    Cookie: '🍪',
  }

  expect(
    isMisusingCookies(CookieReqHeader, { Host: 'google.com' })
  ).toBeTruthy()
})

test('Misusing Cookies: true, response headers contain Cookie2', () => {
  expect(isMisusingCookies(exampleReqHeader, { Cookie2: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: false, response headers does not contain cookie or set-cookie', () => {
  expect(
    isMisusingCookies(exampleReqHeader, { Host: 'google.com' })
  ).toBeFalsy()
})

test('Misusing Cookies: false, empty response headers', () => {
  expect(isMisusingCookies(exampleReqHeader, {})).toBeFalsy()
})
