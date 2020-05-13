import ISEEndpoint from './ISEEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

const oneQuestionID = '52326174'
const questionIDs = '60075228;60075237;57496313'

const oneAnswerID = '52326666'
const answerIDs = '52326666;123212'

const userID = process.env.STACKEXCHANGE_USER_ID
const usersQuestionsTag = process.env.STACKEXCHANGE_USER_TAG

// TODO can add more stack exchange endpoints

const endpoints: ISEEndpoint[] = [
  // TODO uncomment, these works
  // {
  //   endpoint: 'answers?order=desc&sort=activity&site={site}',
  //   url: 'answers?order=desc&sort=activity&site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'answers/{ids}?order=desc&sort=activity&site={site}',
  //   url: `answers/${answerIDs}?order=desc&sort=activity&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'answers/{ids}/comments?order=desc&sort=creation&site={site}',
  //   url: `answers/${oneAnswerID}/comments?order=desc&sort=creation&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'badges',
  //   url: 'badges?order=desc&sort=rank&site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'badges/name',
  //   url: 'badges/name?order=desc&sort=rank&site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'badges/recipients',
  //   url: 'badges/recipients?site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'badges/tags',
  //   url: 'badges/tags?order=desc&sort=rank&site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'info',
  //   url: 'info?site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'privileges',
  //   url: 'privileges?site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'questions/{ids}/related?order=desc&sort=activity&site={site}',
  //   url: `questions/${oneQuestionID}/related?order=desc&sort=activity&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'questions/featured?order=desc&sort=activity&site={site}',
  //   url: `questions/featured?order=desc&sort=activity&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'questions/no-answers',
  //   url: `questions/no-answers?order=desc&sort=activity&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'suggested-edits',
  //   url: `suggested-edits?order=desc&sort=creation&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'tags',
  //   url: `tags?order=desc&sort=popular&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'tags/moderator-only',
  //   url: 'tags/moderator-only?order=desc&sort=popular&site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'tags/required',
  //   url: 'tags/required?order=desc&sort=popular&site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'tags/synonyms',
  //   url: 'tags/synonyms?order=desc&sort=creation&site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'tags/{tag}/top-answerers/{period}',
  //   url: 'tags/javascript/top-answerers/all_time?site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'tags/{tag}/top-askers/{period}',
  //   url: 'tags/javascript/top-askers/all_time?site=stackoverflow',
  //   method: HTTPMethods.GET,
  // },
  // {
  //   endpoint: 'users/{ids}',
  //   url: `users/${userID}?order=desc&sort=reputation&site=stackoverflow`,
  //   method: HTTPMethods.GET,
  // },
  {
    endpoint: 'users/{ids}/badges',
    url: `users/${userID}/badges?order=desc&sort=rank&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{id}/privileges',
    url: `users/${userID}/privileges?site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/questions',
    url: `users/${userID}/questions?order=desc&sort=activity&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/reputation',
    url: `users/${userID}/reputation?site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/reputation-history',
    url: `users/${userID}/reputation-history?site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/tags',
    url: `users/${userID}/tags?order=desc&sort=popular&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{id}/tags/{tags}/top-questions',
    url: `users/${userID}/tags/${usersQuestionsTag}/top-questions?order=desc&sort=activity&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{ids}/timeline',
    url: `users/${userID}/timeline?site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{id}/top-question-tags',
    url: `users/${userID}/top-question-tags?site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/{id}/top-tags',
    url: `users/${userID}/top-tags?site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/moderators',
    url: `users/moderators?order=desc&sort=reputation&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'users/moderators/elected',
    url: `users/moderators/elected?order=desc&sort=reputation&site=stackoverflow`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'errors',
    url: 'errors',
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'sites',
    url: 'sites',
    method: HTTPMethods.GET,
  },
]

export default endpoints
