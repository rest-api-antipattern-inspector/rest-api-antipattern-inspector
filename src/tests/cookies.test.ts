import FakeResponse from './FakeResponse'
import { isMisusingCookies } from '../lib/designAntipatternsDetectors'

test('Misusing Cookies: true, headers contain set-cookie', () => {
  const responseStub = new FakeResponse(200, '', [
    'set-cookie',
  ]).responseStub

  expect(isMisusingCookies(responseStub)).toBeTruthy()
})
