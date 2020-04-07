import { isBreakingSelfDescriptiveness } from '../src/lib/designAntipatternsDetectors'
import standardHeaders from '../src/lib/StandardHTTPHeaders'

// TODO loop through all standard headers, make sure they all work
// also do them to lowercase, should still work

// add some own headers, should break

test('Looping through standard headers: false', () => {
  const headersObject = {}

  for (let header of standardHeaders) {
    headersObject[header] = 'example-value'
    expect(isBreakingSelfDescriptiveness(headersObject, [])).toBeFalsy()
  }
})

test('Looping through standard headers, lowercased: false', () => {
  const headersObject = {}

  for (let header of standardHeaders) {
    headersObject[header.toLowerCase()] = 'example-value'
    expect(isBreakingSelfDescriptiveness(headersObject, [])).toBeFalsy()
  }
})

test('Some standard and some non-standard: true', () => {
  expect(
    isBreakingSelfDescriptiveness(
      {
        etag: '33a64df551425fcc55e4d42a148795d9f25f89d4',
        'cache-control': 'public',
        'x-custom-nonstandard-header': 'example-value',
      },
      []
    )
  )
})
