import ISEEndpoint from './ISEEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

// These are done without keys, some will result in errors
// TODO write in .md that stackexchange can be run w.o. keys

const oneQuestionID = '52326174'
const questionIDs = '60075228;60075237;57496313'

const oneAnswerID = '52326666'
const answerIDs = '52326666;123212'

// TODO try badges, maybe need to add site

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
  {
    endpoint: 'comments/{ids}',
    url: `comments/52326174`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'info',
    url: 'info?site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'privileges',
    url: 'privileges?site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/{ids}/related?order=desc&sort=activity&site={site}',
    url: `questions/${questionIDs}/related?order=desc&sort=activity&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/{ids}/answers',
    url: `questions/${oneQuestionID}/answers`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/{ids}/comments',
    url: `questions/${oneQuestionID}/comments`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/{ids}/related',
    url: `questions/${questionIDs}/related`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/{ids}/timeline',
    url: `questions/${questionIDs}/timeline`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/featured?order=desc&sort=activity&site={site}',
    url: `questions/featured?order=desc&sort=activity&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/no-answers',
    url: `questions/no-answers?order=desc&sort=activity&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'questions/unanswered',
    url: `questions/unanswered`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'suggested-edits',
    url: `suggested-edits?order=desc&sort=creation&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags',
    url: `tags?order=desc&sort=popular&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags/{tags}/info',
    url: 'tags/javascript/info',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags/moderator-only',
    url: 'tags/moderator-only?order=desc&sort=popular&site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags/required',
    url: 'tags/required?order=desc&sort=popular&site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags/synonyms',
    url: 'tags/synonyms?order=desc&sort=creation&site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags/{tag}/top-answerers/{period}',
    url: 'tags/javascript/top-answerers/all_time?site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags/{tag}/top-askers/{period}',
    url: 'tags/javascript/top-askers/all_time?site=stackoverflow',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'tags/{tags}/wikis',
    url: 'tags/javascript/wikis',
    method: HTTPMethods.GET,
  },
]

export default endpoints
