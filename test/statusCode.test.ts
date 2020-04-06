import { isIgnoringStatusCode } from '../src/lib/designAntipatternsDetectors'
import { GET, POST, PUT, PATCH, DELETE } from '../src/lib/constants'

test('Ignoring Status Code: true, GET 201', () => {
  expect(isIgnoringStatusCode(GET, 201))
})
