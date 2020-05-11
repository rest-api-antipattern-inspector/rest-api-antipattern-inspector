import ISEEndpoint from './ISEEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

const oneQuestionID = '52326174'
const questionIDs = '60075228;60075237;57496313'

const oneAnswerID = '52326666'
const answerIDs = '52326666;123212'

const userID = process.env.STACKEXCHANGE_USER_ID
const usersQuestionsTag = process.env.STACKEXCHANGE_USER_TAG

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
  {
    endpoint: 'users/{ids}',
    url: `users/${userID}`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/answers',
    url: `users/${userID}/answers`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/badges',
    url: `users/${userID}/badges`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{id}/privileges',
    url: `users/${userID}/privileges`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/questions',
    url: `users/${userID}/questions`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/reputation',
    url: `users/${userID}/reputation`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/reputation-history',
    url: `users/${userID}/reputation-history?site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/tags',
    url: `users/${userID}/tags`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{id}/tags/{tags}/top-questions',
    url: `users/${userID}/tags/${usersQuestionsTag}/top-questions`,
    method: HTTPMethods.GET,
  },
]

export default endpoints
