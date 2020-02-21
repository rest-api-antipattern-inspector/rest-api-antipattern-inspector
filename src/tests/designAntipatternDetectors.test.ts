import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../lib/designAntipatternsDetectors'
import FakeResponse from './FakeResponse'

const responseStub = new FakeResponse(0, '', [])
  .responseStub
