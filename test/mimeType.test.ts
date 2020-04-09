import { isIgnoringMIMEType } from '../src/lib/designAntipatternDetectors'
import MIMETypes from '../src/lib/MIMETypes'

test('Ignoring MIME Type: false. Capitalized Content-Type header', () => {
  for (let mt of MIMETypes) {
    expect(isIgnoringMIMEType({ 'Content-Type': mt })).toBeFalsy()
  }
})

test('Ignoring MIME Type: false. lowercase content-type header', () => {
  for (let mt of MIMETypes) {
    expect(isIgnoringMIMEType({ 'content-type': mt })).toBeFalsy()
  }
})

test('Ignoring MIME Type: true. Missing Content-Type header', () => {
  expect(isIgnoringMIMEType({ location: 'google.com' })).toBeTruthy()
})

test('Ignoring MIME Type: true. Invalid MIME type', () => {
  expect(isIgnoringMIMEType({ 'content-type': 'whatever' })).toBeTruthy()
})
