import { isIgnoringMIMEType } from '../src/lib/designAntipatternsDetectors'
import MIMETypes from '../src/lib/MIMETypes'

// TODO again, check that it works for both
// Capitalized & lowercase versions of headers

test('Ignoring Caching: false. Capitalized Content-Type header', () => {
  for (let mt of MIMETypes) {
    expect(isIgnoringMIMEType({ 'Content-Type': mt })).toBeFalsy()
  }
})
