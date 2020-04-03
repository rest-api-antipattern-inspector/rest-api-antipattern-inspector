import { isMisusingCookies } from '../src/lib/designAntipatternsDetectors'

test('Misusing Cookies: true, headers contain set-cookie', () => {
  expect(isMisusingCookies({ 'set-cookie': '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, headers contain set-cookie2', () => {
  expect(isMisusingCookies({ 'set-cookie2': '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, headers contain cookie', () => {
  expect(isMisusingCookies({ cookie: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, headers contain cookie2', () => {
  expect(isMisusingCookies({ cookie2: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, headers contain Set-Cookie', () => {
  expect(isMisusingCookies({ 'Set-Cookie': '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, headers contain Set-Cookie2', () => {
  expect(isMisusingCookies({ 'Set-Cookie2': '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, headers contain Cookie', () => {
  expect(isMisusingCookies({ Cookie: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: true, headers contain Cookie2', () => {
  expect(isMisusingCookies({ Cookie2: '🍪' })).toBeTruthy()
})

test('Misusing Cookies: false, headers does not contain cookie or set-cookie', () => {
  expect(isMisusingCookies({ Host: 'google.com' })).toBeFalsy()
})

test('Misusing Cookies: false, empty headers', () => {
  expect(isMisusingCookies({})).toBeFalsy()
})
