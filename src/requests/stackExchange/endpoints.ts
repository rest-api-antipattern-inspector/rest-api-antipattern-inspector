import ISEEndpoint from './ISEEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

// These are done without keys, some will result in errors
// TODO write in .md that stackexchange can be run w.o. keys

const oneQuestionID = '60075228'
const questionIDs = '60075228;60075237;57496313'

const oneAnswerID = '52326666'
const answerIDs = '52326666;123212'

const endpoints: ISEEndpoint[] = [
  {
    endpoint: 'answers?order=desc&sort=activity&site={site}',
    url: 'answers?order=desc&sort=activity&site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'answers/{ids}?order=desc&sort=activity&site={site}',
    url: `answers/${answerIDs}?order=desc&sort=activity&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'answers/{ids}/comments?order=desc&sort=creation&site={site}',
    url: `answers/${oneAnswerID}/comments?order=desc&sort=creation&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'answers/{id}/flags/options?site={site}',
    url: `answers/${oneAnswerID}/flags/options?site=stackoverflow`,
    method: HTTPMethods.GET,
  },

  // TODO badges, forget about badges ids

  // Done earlier
  {
    endpoint: 'info?site={site}',
    url: 'info?site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/{ids}/related?order=desc&sort=activity&site={site}',
    url: `questions/${questionIDs}/related?order=desc&sort=activity&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
]

export default endpoints
