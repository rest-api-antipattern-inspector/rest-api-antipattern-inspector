import FakeResponse from './FakeResponse'
import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../lib/designAntipatternsDetectors'

describe('Tests of Design Antipattern Detections', () => {
  describe('Tests of Ignoring Status Code Detection', () => {
    // TODO add more elaborate tests here

    it('HTTP Post with status code 200 should detect antipattern', () => {
      const responseStub = new FakeResponse(200, '', [])
        .responseStub

      expect(
        isIgnoringStatusCode(responseStub, 'post')
      ).toBeTruthy()
    })
  })
})
