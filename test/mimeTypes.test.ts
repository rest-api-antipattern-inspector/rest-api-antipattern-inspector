import { isIgnoringMIMETypes } from '../src/lib/designAntipatternDetectors'
import MIMETypes from '../src/lib/MIMETypes'

///

// FALSE

///

test('Ignoring MIME Type: false. Capitalized Content-Type header', () => {
  for (let mt of MIMETypes) {
    expect(
      isIgnoringMIMETypes({ Accept: mt }, { 'Content-Type': mt })
    ).toBeFalsy()
  }
})

test('Ignoring MIME Type: false. semi-Capitalized Content-type header', () => {
  for (let mt of MIMETypes) {
    expect(
      isIgnoringMIMETypes({ Accept: mt }, { 'Content-type': mt })
    ).toBeFalsy()
  }
})

test('Ignoring MIME Type: false. lowercase content-type header', () => {
  for (let mt of MIMETypes) {
    expect(
      isIgnoringMIMETypes({ accept: mt }, { 'content-type': mt })
    ).toBeFalsy()
  }
})

test('Ignoring MIME Type: false. accept: */*', () => {
  expect(
    isIgnoringMIMETypes(
      { accept: 'application/json, application/xml, */*' },
      { 'content-type': 'application/msword' }
    )
  ).toBeFalsy()
})

test('Ignoring MIME Type: false. accept both json & xml, array', () => {
  expect(
    isIgnoringMIMETypes(
      { accept: ['application/json', 'application/xml'] },
      { 'content-type': 'application/xml' }
    )
  ).toBeFalsy()
})

///

// TRUE

///

test('Ignoring MIME Type: true. Missing Content-Type header', () => {
  expect(
    isIgnoringMIMETypes(
      { accept: 'application/json' },
      { location: 'google.com' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Missing Content-Type header2', () => {
  expect(isIgnoringMIMETypes({}, { location: 'google.com' })).toBeTruthy()
})

test('Ignoring MIME Type: true. Invalid MIME type', () => {
  expect(
    isIgnoringMIMETypes(
      { accept: 'application/json, application/xml, */*' },
      { 'content-type': 'whatever' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Mime type not accepted', () => {
  expect(
    isIgnoringMIMETypes(
      { accept: 'application/json' },
      { 'content-type': 'application/msword' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Mime type not accepted2', () => {
  expect(
    isIgnoringMIMETypes(
      { accept: 'application/json, application/xml' },
      { 'content-type': 'application/msword' }
    )
  ).toBeTruthy()
})

test('Ignoring MIME Type: true. Array mime type not accepted', () => {
  expect(
    isIgnoringMIMETypes(
      { accept: ['application/json', 'application/xml'] },
      { 'content-type': 'application/msword' }
    )
  ).toBeTruthy()
})
