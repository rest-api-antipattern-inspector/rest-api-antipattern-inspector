import { isIgnoringMIMEType } from '../src/lib/designAntipatternsDetectors'
import MIMETypes from '../src/lib/MIMETypes'

test('Ignoring Caching: false. Capitalized Content-Type header', () => {
  for (let mt of MIMETypes) {
    expect(isIgnoringMIMEType({ 'Content-Type': mt })).toBeFalsy()
  }
})

test('Ignoring Caching: false. lowercase content-type header', () => {
  for (let mt of MIMETypes) {
    expect(isIgnoringMIMEType({ 'content-type': mt })).toBeFalsy()
  }
})

test('Ignoring Caching: true. Missing Content-Type header', () => {
  expect(isIgnoringMIMEType({ location: 'google.com' })).toBeTruthy()
})

test('Ignoring Caching: true. Invalid MIME type', () => {
  expect(isIgnoringMIMEType({ 'content-type': 'whatever' })).toBeTruthy()
})
