import ISEEndpoint from './ISEEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

// These are done without keys, some will result in errors
// TODO write in .md that stackexchange can be run w.o. keys

const oneQuestionID = '60075228'
const questionIDs = '60075228;60075237;57496313'

const oneAnswerID = '123212'
const answerIDs = '52326666;123212'

const endpoints: ISEEndpoint[] = [
  {
    method: HTTPMethods.GET,
    url: 'answers?order=desc&sort=activity&site=stackoverflow',
    endpoint: 'answers?order=desc&sort=activity&site={site}',
  },
  {
    method: HTTPMethods.GET,
    // made up IDs
    url: 'answers/123;456;789?order=desc&sort=activity&site=stackoverflow',
    endpoint: 'answers/{ids}?order=desc&sort=activity&site={site}',
  },
  // next, real ids but err because no key
  {
    method: HTTPMethods.GET,
    url: 'info?site=stackoverflow',
    endpoint: 'info?site={site}',
  },
  {
    method: HTTPMethods.GET,
    /**
     * Related questions to these 3 questions:
     * https://stackoverflow.com/questions/60075228/exchange-different-arrays-elements-in-ruby
     * https://stackoverflow.com/questions/60075237/best-way-to-handle-an-account-linking-verification-system
     * https://stackoverflow.com/questions/57496313/execution-failed-for-task-appmergedebugresources-com-android-builder-interna
     */
    url: `questions/${questionIDs}/related?order=desc&sort=activity&site=stackoverflow`,
    endpoint: 'questions/{ids}/related?order=desc&sort=activity&site={site}',
  },
]

export default endpoints
