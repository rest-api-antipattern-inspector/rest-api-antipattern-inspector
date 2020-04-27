import { isIgnoringMIMEType } from '../src/lib/designAntipatternDetectors'
import MIMETypes from '../src/lib/MIMETypes'

test('Ignoring MIME Type: false. Capitalized Content-Type header', () => {
  for (let mt of MIMETypes) {
    expect(
      isIgnoringMIMEType({ Accept: mt }, { 'Content-Type': mt })
    ).toBeFalsy()
  }
})

test('Ignoring MIME Type: false. lowercase content-type header', () => {
  for (let mt of MIMETypes) {
    expect(
      isIgnoringMIMEType({ accept: mt }, { 'content-type': mt })
    ).toBeFalsy()
  }
})

test('Ignoring MIME Type: false. accept: */*', () => {
  expect(
    isIgnoringMIMEType(
      { accept: 'application/json, application/xml, */*' },
      { 'content-type': 'application/msword' }
    )
  ).toBeFalsy()
})

test('Ignoring MIME Type: false. accept both json & xml, array', () => {
  expect(
    isIgnoringMIMEType(
      { accept: ['application/json', 'application/xml'] },
      { 'content-type': 'application/xml' }
    )
  ).toBeFalsy()
})

test('Ignoring MIME Type: true. Missing Content-Type header', () => {
  expect(
    isIgnoringMIMEType(
      { accept: 'application/json' },
      { location: 'google.com' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Missing Content-Type header2', () => {
  expect(isIgnoringMIMEType({}, { location: 'google.com' })).toBeTruthy()
})

test('Ignoring MIME Type: true. Invalid MIME type', () => {
  expect(
    isIgnoringMIMEType(
      { accept: 'application/json, application/xml, */*' },
      { 'content-type': 'whatever' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Mime type not accepted', () => {
  expect(
    isIgnoringMIMEType(
      { accept: 'application/json' },
      { 'content-type': 'application/msword' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Mime type not accepted2', () => {
  expect(
    isIgnoringMIMEType(
      { accept: 'application/json, application/xml' },
      { 'content-type': 'application/msword' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Array mime type not accepted', () => {
  expect(
    isIgnoringMIMEType(
      { accept: ['application/json', 'application/xml'] },
      { 'content-type': 'application/msword' }
    )
  ).toBeTruthy()
})
